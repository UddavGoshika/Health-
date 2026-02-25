import React, { useState, useEffect } from 'react';
import styles from './SearchSection.module.css';
import {
    ChevronDown,
    MapPin,
    Loader2,
    Handshake,
    Star,
    Bookmark,
    MessageCircle,
    Shield,
    Coins,
    CheckCircle,
    Search,
    Stethoscope,
    Briefcase
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { doctorService } from '../../services/api';
import { interactionService } from '../../services/interactionService';
import type { Doctor } from '../../types';
import ConfirmationModal from '../layout/ConfirmationModal';
import { motion, AnimatePresence } from 'framer-motion';
import { LOCATION_DATA_RAW } from '../layout/statesdis';

const LANGUAGES = [
    'English', 'Hindi', 'Telugu', 'Assamese', 'Awadhi', 'Bagheli', 'Banjara', 'Bhojpuri', 'Bodo', 'Bundeli',
    'Chhattisgarhi', 'Coorgi', 'Dakhini', 'Dogri', 'Garhwali', 'Gujarati', 'Haryanvi', 'Kannada', 'Kashmiri',
    'Konkani', 'Malayalam', 'Manipuri', 'Marathi', 'Punjabi', 'Rajasthani', 'Sanskrit', 'Tamil', 'Tulu', 'Urdu'
];

const EXPERIENCES = ['0–5 Years', '5–10 Years', '10–15 Years', '15–20 Years', '20+ Years'];
const MODES = ['Online', 'Offline', 'Hybrid'];
const FEE_RANGES = ['₹0-500', '₹500-1000', '₹1000-2000', '₹2000-5000', '₹5000+'];

// Development fallback sample doctors
const SAMPLE_DOCTORS: Doctor[] = [
    {
        id: '1',
        _id: '1',
        unique_id: 'DOC-101',
        name: 'Dr. Raj Kumar',
        profilePicPath: '',
        hospital: 'City General Hospital',
        clinic: 'Raj Clinic',
        location: 'Hyderabad, Telangana',
        department: 'general_medicine',
        specialization: 'General Medicine',
        experience: '5 Years',
        consultationFee: 499,
        qualification: 'MBBS, MD'
    },
    {
        id: '2',
        _id: '2',
        unique_id: 'DOC-102',
        name: 'Dr. Vijay Malhotra',
        profilePicPath: '',
        hospital: 'Central Medical Centre',
        clinic: 'Malhotra Clinic',
        location: 'New Delhi, Delhi',
        department: 'cardiology',
        specialization: 'Cardiology',
        experience: '10 Years',
        consultationFee: 799,
        qualification: 'MBBS, MD, DM'
    },
    {
        id: '3',
        _id: '3',
        unique_id: 'DOC-103',
        name: 'Dr. Priya Sharma',
        profilePicPath: '',
        hospital: 'Metro Hospital',
        clinic: '',
        location: 'Delhi, Delhi',
        department: 'dermatology',
        specialization: 'Dermatology',
        experience: '5 Years',
        consultationFee: 599,
        qualification: 'MBBS, MD'
    },
    {
        id: '4',
        _id: '4',
        unique_id: 'DOC-104',
        name: 'Dr. Vikram Reddy',
        profilePicPath: '',
        hospital: 'Apollo Hospitals',
        clinic: '',
        location: 'Bangalore, Karnataka',
        department: 'orthopedics',
        specialization: 'Orthopedics',
        experience: '12 Years',
        consultationFee: 899,
        qualification: 'MBBS, MS, MCh'
    },
    {
        id: '5',
        _id: '5',
        unique_id: 'DOC-105',
        name: 'Dr. Anjali Singh',
        profilePicPath: '',
        hospital: 'Fortis Hospital',
        clinic: 'Singh Clinic',
        location: 'Mumbai, Maharashtra',
        department: 'gynecology',
        specialization: 'Gynecology',
        experience: '8 Years',
        consultationFee: 699,
        qualification: 'MBBS, MS'
    },
    {
        id: '6',
        _id: '6',
        unique_id: 'DOC-106',
        name: 'Dr. Rohit Verma',
        profilePicPath: '',
        hospital: 'Medanta Hospital',
        clinic: 'Verma Clinic',
        location: 'Chennai, Tamil Nadu',
        department: 'neurology',
        specialization: 'Neurology',
        experience: '15 Years',
        consultationFee: 999,
        qualification: 'MBBS, MD, DM'
    }
];

// Doctor departments and specializations
const DOCTOR_DEPARTMENT_DATA: Record<string, {
    label: string;
    specializations: { value: string; label: string }[]
}> = {
    cardiology: {
        label: 'Cardiology',
        specializations: [
            { value: 'interventional_cardiology', label: 'Interventional Cardiology' },
            { value: 'electrophysiology', label: 'Electrophysiology' },
            { value: 'cardiac_rehab', label: 'Cardiac Rehabilitation' }
        ]
    },
    neurology: {
        label: 'Neurology',
        specializations: [
            { value: 'stroke', label: 'Stroke' },
            { value: 'epilepsy', label: 'Epilepsy' },
            { value: 'movement_disorders', label: 'Movement Disorders' }
        ]
    },
    orthopedics: {
        label: 'Orthopedics',
        specializations: [
            { value: 'joint_replacement', label: 'Joint Replacement' },
            { value: 'spine_surgery', label: 'Spine Surgery' },
            { value: 'sports_medicine', label: 'Sports Medicine' }
        ]
    },
    pediatrics: {
        label: 'Pediatrics',
        specializations: [
            { value: 'neonatology', label: 'Neonatology' },
            { value: 'pediatric_cardiology', label: 'Pediatric Cardiology' },
            { value: 'pediatric_neurology', label: 'Pediatric Neurology' }
        ]
    },
    dermatology: {
        label: 'Dermatology',
        specializations: [
            { value: 'cosmetic_dermatology', label: 'Cosmetic Dermatology' },
            { value: 'dermatopathology', label: 'Dermatopathology' }
        ]
    },
    gynecology: {
        label: 'Gynecology & Obstetrics',
        specializations: [
            { value: 'maternal_fetal', label: 'Maternal-Fetal Medicine' },
            { value: 'reproductive_endocrinology', label: 'Reproductive Endocrinology' }
        ]
    },
    psychiatry: {
        label: 'Psychiatry',
        specializations: [
            { value: 'child_psychiatry', label: 'Child Psychiatry' },
            { value: 'addiction_psychiatry', label: 'Addiction Psychiatry' }
        ]
    },
    ophthalmology: {
        label: 'Ophthalmology',
        specializations: [
            { value: 'retina', label: 'Retina' },
            { value: 'cornea', label: 'Cornea' }
        ]
    },
    ent: {
        label: 'ENT',
        specializations: [
            { value: 'otology', label: 'Otology' },
            { value: 'rhinology', label: 'Rhinology' }
        ]
    },
    gastroenterology: {
        label: 'Gastroenterology',
        specializations: [
            { value: 'hepatology', label: 'Hepatology' },
            { value: 'pancreatology', label: 'Pancreatology' }
        ]
    },
    pulmonology: {
        label: 'Pulmonology',
        specializations: [
            { value: 'critical_care', label: 'Critical Care' },
            { value: 'sleep_medicine', label: 'Sleep Medicine' }
        ]
    },
    urology: {
        label: 'Urology',
        specializations: [
            { value: 'endourology', label: 'Endourology' },
            { value: 'uro_oncology', label: 'Uro-Oncology' }
        ]
    },
    oncology: {
        label: 'Oncology',
        specializations: [
            { value: 'medical_oncology', label: 'Medical Oncology' },
            { value: 'radiation_oncology', label: 'Radiation Oncology' }
        ]
    },
    general_medicine: {
        label: 'General Medicine',
        specializations: [
            { value: 'diabetology', label: 'Diabetology' },
            { value: 'hypertension', label: 'Hypertension' }
        ]
    },
    dental: {
        label: 'Dentistry',
        specializations: [
            { value: 'orthodontics', label: 'Orthodontics' },
            { value: 'oral_surgery', label: 'Oral Surgery' }
        ]
    }
};

const SearchSection: React.FC = () => {
    const { user, isLoggedIn, openAuthModal } = useAuth();
    const [results, setResults] = useState<Doctor[]>([]);
    const [loading, setLoading] = useState(false);
    const [filters, setFilters] = useState({
        language: '',
        department: '',
        specialization: '',
        experience: '',
        consultationFee: '',
        state: '',
        district: '',
        city: '',
        consultationMode: ''
    });
    const [searchId, setSearchId] = useState('');
    const navigate = useNavigate();

    // Modal & Notification State
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [pendingAction, setPendingAction] = useState<{ targetId?: string | number } | null>(null);
    const [notification, setNotification] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

    // Linked Logic
    const availableDistricts = filters.state ? Object.keys(LOCATION_DATA_RAW[filters.state] || {}) : [];
    const availableCities = (filters.state && filters.district) ? (LOCATION_DATA_RAW[filters.state]?.[filters.district] || []) : [];
    const availableSpecializations = filters.department ? (DOCTOR_DEPARTMENT_DATA[filters.department]?.specializations || []) : [];

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const params: any = {};

            // Map filters to API parameters
            if (filters.language && filters.language !== 'Select Languages') params.language = filters.language;
            if (filters.department && filters.department !== 'Select Department') {
                const deptLabel = DOCTOR_DEPARTMENT_DATA[filters.department]?.label || filters.department;
                params.department = deptLabel;
            }
            if (filters.specialization && filters.specialization !== 'Select Specialization') {
                const specLabel = availableSpecializations.find(s => s.value === filters.specialization)?.label || filters.specialization;
                params.specialization = specLabel;
            }
            if (filters.experience && filters.experience !== 'Select Experience') params.experience = filters.experience;
            if (filters.consultationFee && filters.consultationFee !== 'Select Fee Range') params.consultationFee = filters.consultationFee;
            if (filters.state && filters.state !== 'Select States') params.state = filters.state;
            if (filters.district && filters.district !== 'Select Districts') params.district = filters.district;
            if (filters.city && filters.city !== 'Select Cities') params.city = filters.city;
            if (filters.consultationMode && filters.consultationMode !== 'Consultation Mode') params.consultationMode = filters.consultationMode;

            // Try to fetch from API
            try {
                const doctorRes = await doctorService.getDoctors(params);
                if (doctorRes.data && doctorRes.data.success) {
                    setResults(doctorRes.data.doctors || []);
                } else {
                    // Fallback to sample data for development
                    setResults(SAMPLE_DOCTORS);
                }
            } catch (apiError) {
                console.log('API not available, using sample data');
                // Fallback to sample data for development
                setResults(SAMPLE_DOCTORS);
            }
        } catch (err) {
            console.error('Error fetching doctors:', err);
            // Fallback to sample data for development
            setResults(SAMPLE_DOCTORS);
        } finally {
            setLoading(false);
        }
    };

    const handleIdSearch = () => {
        if (searchId) {
            const normalizedId = searchId.trim().toUpperCase();
            if (/^DOC-\d+$/i.test(normalizedId)) {
                navigate(`/profile/${normalizedId}`);
                return;
            }
            // If not a valid ID format, search by name
            fetchData();
        }
    };

    const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prev => {
            const newState = { ...prev, [name]: value };
            // Reset children if parent changes
            if (name === 'state') {
                newState.district = '';
                newState.city = '';
            }
            if (name === 'district') {
                newState.city = '';
            }
            if (name === 'department') {
                newState.specialization = '';
            }
            return newState;
        });
    };

    const handleAction = async (targetId?: string | number, action?: string) => {
        if (!targetId || !action) return;
        if (!isLoggedIn) {
            openAuthModal('login');
            return;
        }

        if (action === 'chat') {
            setPendingAction({ targetId });
            setIsConfirmOpen(true);
            return;
        }

        try {
            const userId = String(user?.id);
            const res = await interactionService.recordActivity('doctor', String(targetId), action, userId);

            if (res.success) {
                showNotification(`${action.charAt(0).toUpperCase() + action.slice(1)} sent successfully!`, 'info');
            }
        } catch (err: any) {
            showNotification(err.response?.data?.error || 'Action failed', 'info');
        }
    };

    const confirmChat = async () => {
        if (!pendingAction) return;
        setIsConfirmOpen(false);

        try {
            const userId = String(user?.id);
            const res = await interactionService.recordActivity('doctor', String(pendingAction.targetId), 'chat', userId);

            if (res.success) {
                showNotification('Chat initiated! 2 coins deducted.', 'success');
                // Open chat interface logic here
            }
        } catch (err: any) {
            showNotification(err.response?.data?.error || 'Failed to initiate chat', 'info');
        }
    };

    const showNotification = (message: string, type: 'success' | 'info') => {
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 4000);
    };

    const maskId = (id?: string | number | null) => {
        if (id === null || id === undefined) return "********";
        const s = String(id);
        if (s.length <= 2) return s;
        return s.substring(0, 2) + '*'.repeat(s.length - 2);
    };

    const maskName = (name?: string) => {
        if (!name) return "Dr. *****";
        const parts = name.trim().split(/\s+/);
        return parts.map(part => {
            if (part.length <= 2) return part;
            if (part.toLowerCase() === 'dr.') return part;
            return part.substring(0, 2) + "*".repeat(part.length - 2);
        }).join(" ");
    };

    return (
        <section id="search" className={styles.searchSection}>
            <div className={styles.container}>
                {/* Notification Toast */}
                <AnimatePresence>
                    {notification && (
                        <motion.div
                            className={`${styles.notification} ${styles[notification.type]}`}
                            initial={{ opacity: 0, y: -100, x: '-50%', scale: 0.5 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -100, scale: 0.5 }}
                            transition={{
                                type: "spring",
                                stiffness: 500,
                                damping: 40,
                                mass: 1
                            }}
                        >
                            <div className={styles.notifIcon}>
                                <CheckCircle size={24} />
                            </div>
                            <div className={styles.notifText}>
                                <span>{notification.message}</span>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <div className={styles.header}>
                    <h2 className={styles.title} style={{ color: '#a40707ff', zIndex: 99999 }}>Browse Doctor Profiles</h2>
                    <p className={styles.subtitle}>Search, filter, and connect with top-rated healthcare professionals.</p>
                </div>

                <div className={styles.card}>
                    <div className={styles.cardHeader}>
                        <div className={styles.titleSection}>
                            <Stethoscope size={28} className={styles.titleIcon} />
                            <h3 className={styles.cardTitle}>Find the Right Doctor</h3>
                        </div>

                        <div className={styles.idSearch}>
                            <Search size={18} className={styles.searchIcon} />
                            <input
                                type="text"
                                placeholder="Search by Doctor ID (e.g., DOC-123)"
                                className={styles.idInput}
                                value={searchId}
                                onChange={(e) => setSearchId(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleIdSearch()}
                            />
                            <button className={styles.idSearchBtn} onClick={handleIdSearch}>Search</button>
                        </div>
                    </div>

                    <div className={styles.filterBar}>
                        {/* Languages */}
                        <div className={styles.selectWrapper}>
                            <select name="language" value={filters.language} onChange={handleFilterChange}>
                                <option>Select Languages</option>
                                {LANGUAGES.map(lang => <option key={lang}>{lang}</option>)}
                            </select>
                            <ChevronDown className={styles.chevron} size={18} />
                        </div>

                        {/* Departments */}
                        <div className={styles.selectWrapper}>
                            <select name="department" value={filters.department} onChange={handleFilterChange}>
                                <option>Select Department</option>
                                {Object.entries(DOCTOR_DEPARTMENT_DATA).map(([key, d]) => (
                                    <option key={key} value={key}>{d.label}</option>
                                ))}
                            </select>
                            <ChevronDown className={styles.chevron} size={18} />
                        </div>

                        {/* Specializations */}
                        <div className={styles.selectWrapper}>
                            <select
                                name="specialization"
                                value={filters.specialization}
                                onChange={handleFilterChange}
                                disabled={!filters.department}
                            >
                                <option>Select Specialization</option>
                                {availableSpecializations.map(s =>
                                    <option key={s.value} value={s.value}>{s.label}</option>
                                )}
                            </select>
                            <ChevronDown className={styles.chevron} size={18} />
                        </div>

                        {/* Experience */}
                        <div className={styles.selectWrapper}>
                            <select
                                name="experience"
                                value={filters.experience}
                                onChange={handleFilterChange}
                            >
                                <option>Select Experience</option>
                                {EXPERIENCES.map(exp => <option key={exp}>{exp}</option>)}
                            </select>
                            <ChevronDown className={styles.chevron} size={18} />
                        </div>

                        {/* Consultation Fee */}
                        <div className={styles.selectWrapper}>
                            <select
                                name="consultationFee"
                                value={filters.consultationFee}
                                onChange={handleFilterChange}
                            >
                                <option>Select Fee Range</option>
                                {FEE_RANGES.map(fee => <option key={fee}>{fee}</option>)}
                            </select>
                            <ChevronDown className={styles.chevron} size={18} />
                        </div>

                        {/* States */}
                        <div className={styles.selectWrapper}>
                            <select name="state" value={filters.state} onChange={handleFilterChange}>
                                <option>Select States</option>
                                {Object.keys(LOCATION_DATA_RAW).map(s => <option key={s}>{s}</option>)}
                            </select>
                            <ChevronDown className={styles.chevron} size={18} />
                        </div>

                        {/* Districts */}
                        <div className={styles.selectWrapper}>
                            <select
                                name="district"
                                value={filters.district}
                                onChange={handleFilterChange}
                                disabled={!filters.state}
                            >
                                <option>Select Districts</option>
                                {availableDistricts.map(d => <option key={d}>{d}</option>)}
                            </select>
                            <ChevronDown className={styles.chevron} size={18} />
                        </div>

                        {/* Cities */}
                        <div className={styles.selectWrapper}>
                            <select
                                name="city"
                                value={filters.city}
                                onChange={handleFilterChange}
                                disabled={!filters.district}
                            >
                                <option>Select Cities</option>
                                {availableCities.map(c => <option key={c}>{c}</option>)}
                            </select>
                            <ChevronDown className={styles.chevron} size={18} />
                        </div>

                        {/* Consultation Mode */}
                        <div className={styles.selectWrapper}>
                            <select
                                name="consultationMode"
                                value={filters.consultationMode}
                                onChange={handleFilterChange}
                            >
                                <option>Consultation Mode</option>
                                {MODES.map(m => <option key={m}>{m}</option>)}
                            </select>
                            <ChevronDown className={styles.chevron} size={18} />
                        </div>

                        {/* Action Buttons */}
                        <div className={styles.filterActions}>
                            <button className={styles.applyBtn} onClick={fetchData} disabled={loading}>
                                {loading ? <Loader2 className="animate-spin" size={20} /> : 'Apply Filters'}
                            </button>
                            {/* <button className={styles.clearBtn} onClick={clearFilters}>
                                Clear All
                            </button> */}
                        </div>
                    </div>
                </div>

                {loading ? (
                    <div className={styles.loadingContainer}>
                        <Loader2 className={styles.spinner} size={40} />
                        <p>Loading doctors...</p>
                    </div>
                ) : (
                    <div className={styles.resultsGrid}>
                        {results.length > 0 ? (
                            results.map((doctor: Doctor) => {
                                const name = doctor.name ||
                                    (doctor.firstName + ' ' + doctor.lastName) ||
                                    'Dr. Unknown';
                                const initial = name.charAt(0).toUpperCase();

                                return (
                                    <div
                                        key={doctor.id || doctor._id}
                                        className={styles.profileCard}
                                        onClick={(e) => {
                                            // Don't navigate if clicking action buttons
                                            if ((e.target as HTMLElement).closest('button')) return;
                                            navigate(`/profile/${doctor.unique_id || doctor.id || doctor._id}`);
                                        }}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <div className={styles.cardHeaderSection}>
                                            <div className={styles.profileInfo}>
                                                <div className={styles.nameSection}>
                                                    <h3 className={styles.profileName}>{maskName(name)}</h3>
                                                    <div className={styles.locationInfo}>
                                                        <MapPin size={14} />
                                                        <span>{doctor.location || 'Unknown Location'}</span>
                                                    </div>
                                                </div>
                                                <div className={styles.experienceBadge}>
                                                    <Briefcase size={14} />
                                                    <span>{doctor.experience || 'N/A'}</span>
                                                </div>
                                            </div>
                                            <div className={styles.idBadge}>
                                                <Shield size={12} />
                                                <span>{maskId(doctor.unique_id)}</span>
                                            </div>
                                        </div>

                                        <div className={styles.practiceSection}>
                                            <div className={styles.practiceLabel}>PRACTICE:</div>
                                            <div className={styles.practiceValue}>
                                                {doctor.specialization || doctor.department || 'Medical Services'}
                                            </div>
                                        </div>

                                        <div className={styles.actionGrid}>
                                            <button
                                                className={`${styles.actionButton} ${styles.interest}`}
                                                onClick={() => handleAction(doctor._id || doctor.id, 'interest')}
                                            >
                                                <Handshake size={16} />
                                                <span>INTEREST</span>
                                            </button>
                                            <button
                                                className={`${styles.actionButton} ${styles.superInterest}`}
                                                onClick={() => handleAction(doctor._id || doctor.id, 'superInterest')}
                                            >
                                                <Star size={16} />
                                                <span>SUPER INTEREST</span>
                                            </button>
                                            <button
                                                className={`${styles.actionButton} ${styles.shortlist}`}
                                                onClick={() => handleAction(doctor._id || doctor.id, 'shortlist')}
                                            >
                                                <Bookmark size={16} />
                                                <span>SHORTLIST</span>
                                            </button>
                                            <button
                                                className={`${styles.actionButton} ${styles.chat}`}
                                                onClick={() => handleAction(doctor._id || doctor.id, 'chat')}
                                            >
                                                <MessageCircle size={16} />
                                                <span>CHAT</span>
                                            </button>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className={styles.noResults}>
                                <div className={styles.noResultsIcon}>
                                    <Stethoscope size={48} />
                                </div>
                                <h3>No Doctors Found</h3>
                                <p>Try adjusting your filters or search criteria</p>
                            </div>
                        )}
                    </div>
                )}
            </div>

            <ConfirmationModal
                isOpen={isConfirmOpen}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={confirmChat}
                title="Initiate Chat"
                message="You will be charged 2 coins to initiate this chat. Do you want to proceed?"
                confirmText="Yes, Proceed"
                icon={<Coins size={48} color="#ffd700" />}
            />
        </section>
    );
};

export default SearchSection;