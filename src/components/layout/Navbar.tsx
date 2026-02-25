import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useSettings } from "../../context/SettingsContext";
import health1 from "../../assets/health1.png";

import {
    Menu,
    X,
    LogIn,
    UserPlus,
    LogOut,
    Bell,
    User,
    Settings,
    LayoutDashboard,
    Search as SearchIcon
} from "lucide-react";
import styles from "./Navbar.module.css";

const placeholderTexts = [
    "Search Doctors Profiles...",
    "Search Diagnostics...",
    "Search Laboratory...",
    "Search Medicine Delivery...",
    "Search Blogs...",
    "Search About...",
    "Search Contact...",
    "Search Browse Profiles...",
];

const MEDICINE_DOMAINS = [
    {
        title: "CHRONIC CARE",
        items: [
            { name: "Diabetes Care", icon: "💙", path: "/medicine-delivery?cat=Diabetes+Care" },
            { name: "Cardiac Care", icon: "❤️", path: "/medicine-delivery?cat=Cardiac+Care" },
            { name: "Stomach Care", icon: "🤢", path: "/medicine-delivery?cat=Stomach+Care" },
            { name: "Liver Care", icon: "🍃", path: "/medicine-delivery?cat=Liver+Care" },
        ]
    },
    {
        title: "GENERAL HEALTH",
        items: [
            { name: "Pain Relief", icon: "😣", path: "/medicine-delivery?cat=Pain+Relief" },
            { name: "Respiratory", icon: "😮‍💨", path: "/medicine-delivery?cat=Respiratory" },
            { name: "Cold & Immunity", icon: "🤧", path: "/medicine-delivery?cat=Cold+%26+Immunity" },
            { name: "Eye Care", icon: "👁️", path: "/medicine-delivery?cat=Eye+Care" },
        ]
    },
    {
        title: "PERSONAL CARE",
        items: [
            { name: "Skin Care", icon: "✨", path: "/medicine-delivery?cat=Skin+Care" },
            { name: "Personal Care", icon: "🧴", path: "/medicine-delivery?cat=Personal+Care" },
            { name: "Oral Care", icon: "🦷", path: "/medicine-delivery?cat=Oral+Care" },
            { name: "Baby Care", icon: "👶", path: "/medicine-delivery?cat=Baby+Care" },
        ]
    }
];

function useTypingPlaceholder(speed = 100, pause = 1500) {
    const [placeholder, setPlaceholder] = useState("");
    const [textIndex, setTextIndex] = useState(0);
    const [charIndex, setCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        const currentText = placeholderTexts[textIndex];
        let timeout: ReturnType<typeof setTimeout>;

        if (!isDeleting && charIndex < currentText.length) {
            timeout = setTimeout(() => {
                setPlaceholder(currentText.slice(0, charIndex + 1));
                setCharIndex((prev) => prev + 1);
            }, speed);
        }
        else if (!isDeleting && charIndex === currentText.length) {
            timeout = setTimeout(() => setIsDeleting(true), pause);
        }
        else if (isDeleting && charIndex > 0) {
            timeout = setTimeout(() => {
                setPlaceholder(currentText.slice(0, charIndex - 1));
                setCharIndex((prev) => prev - 1);
            }, speed / 2);
        }
        else if (isDeleting && charIndex === 0) {
            setIsDeleting(false);
            setTextIndex((prev) => (prev + 1) % placeholderTexts.length);
        }

        return () => clearTimeout(timeout);
    }, [charIndex, isDeleting, textIndex, speed, pause]);

    return placeholder;
}

const Navbar: React.FC = () => {
    const { isLoggedIn, user, logout, openAuthModal, openFilterModal } = useAuth();
    const { settings } = useSettings();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [isMedicinesHovered, setIsMedicinesHovered] = useState(false);
    const navigate = useNavigate();
    const dynamicPlaceholder = useTypingPlaceholder();

    const [settingsTimestamp, setSettingsTimestamp] = useState<string | null>(null);
    useEffect(() => {
        setSettingsTimestamp(localStorage.getItem('settings_timestamp'));
        const handler = (e: StorageEvent) => {
            if (e.key === 'settings_timestamp') {
                setSettingsTimestamp(e.newValue);
            }
        };
        window.addEventListener('storage', handler);
        return () => window.removeEventListener('storage', handler);
    }, []);

    const withCache = (url?: string | null, fallback?: string) => {
        const base = url || fallback || '';
        if (!base) return '';
        return settingsTimestamp ? `${base}${base.includes('?') ? '&' : '?'}v=${settingsTimestamp}` : base;
    };

    const handleSearch = () => {
        const query = searchTerm.toLowerCase().trim();
        if (!query) return;
        navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
        setSearchTerm("");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter") handleSearch();
    };

    const handleLogout = () => {
        logout();
        navigate("/");
    };

    return (
        <header className={styles.navbar}>
            <div className={styles.centerStack}>

                {/* ROW 1: TOP BAR (Accessibility + Marquee) */}
                <div className={styles.topBar}>
                    <div className={styles.inner}>
                        <div className={styles.topBarContent}>
                            <span className={styles.marqueeText}>
                                {settings?.marquee_text || "• Expert Doctors & Labs • 24/7 Health Consultation • Secure Medical Platform"}
                            </span>
                        </div>
                        <div className={styles.accessibility}>
                            <button>A-</button>
                            <button>A</button>
                            <button>A+</button>
                            <select className={styles.langSelect}>
                                <option>EN</option>
                                <option>HI</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* ROW 2: MAIN NAVIGATION LINKS + SEARCH BOX */}
                <div className={styles.mainNav}>
                    <div className={styles.inner}>
                        <nav className={styles.navLinks}>
                            <button onClick={() => navigate("/")} className={styles.activeLink}>Home</button>
                            <button onClick={openFilterModal}>Browse Profiles</button>
                            <button onClick={() => navigate("/diagnostics")}>Diagnostics</button>
                            <button onClick={() => navigate("/laboratory")}>Laboratory</button>
                            <div
                                className={styles.navDropdownWrapper}
                                onMouseEnter={() => setIsMedicinesHovered(true)}
                                onMouseLeave={() => setIsMedicinesHovered(false)}
                            >
                                <button onClick={() => navigate("/medicine-delivery")}>Medicine Delivery</button>
                                {isMedicinesHovered && (
                                    <div className={styles.megaMenu}>
                                        <div className={styles.megaMenuContainer}>
                                            {MEDICINE_DOMAINS.map((domain, dIdx) => (
                                                <div key={dIdx} className={styles.megaColumn}>
                                                    <h4 className={styles.domainTitle}>{domain.title}</h4>
                                                    <div className={styles.megaItemList}>
                                                        {domain.items.map((item, iIdx) => (
                                                            <div
                                                                key={iIdx}
                                                                className={styles.megaMenuItem}
                                                                onClick={() => {
                                                                    navigate(item.path);
                                                                    setIsMedicinesHovered(false);
                                                                }}
                                                            >
                                                                <span className={styles.megaMenuIcon}>{item.icon}</span>
                                                                <span className={styles.megaMenuLabel}>{item.name}</span>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                            <button onClick={() => navigate("/membership")}>Membership</button>
                            <button onClick={() => navigate("/buy-insurance")}>Buy Insurance</button>
                            <button onClick={() => navigate("/blogs")}>Blogs</button>
                            <button onClick={() => navigate("/about")}>About</button>

                            {/* SEARCH BOX IS NOW HERE BESIDE ABOUT */}
                            <div className={styles.navSearchBox}>
                                <input
                                    type="text"
                                    placeholder={dynamicPlaceholder}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                />
                                <SearchIcon className={styles.navSearchIcon} size={16} />
                            </div>
                        </nav>
                        <button className={styles.mobileToggle} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                {/* ROW 3: ECOSYSTEM + AUTH */}
                <div className={styles.ecoBar}>
                    <div className={styles.inner}>
                        <div className={styles.ecoLinks}>
                            <a href="#"><img src="/assets/edverse.webp" alt="" /> Tatito Edverse ↗</a>
                            <a href="#"><img src="/assets/carrer.webp" alt="" /> Tatito Carrer Hub ↗</a>
                            <a href="#"><img src="/assets/nexus.webp" alt="" /> Tatito Nexus ↗</a>
                            <a href="#"><img src="/assets/civic.webp" alt="" /> Tatito Civic One ↗</a>
                            <a href="#"><img src="/assets/eadvocate.webp" alt="" /> Tatito Health + ↗</a>
                            <a href="#"><img src="/assets/fashion.webp" alt="" /> Tatito Fashions ↗</a>
                        </div>

                        <div className={styles.authActions}>
                            {isLoggedIn ? (
                                <div className={styles.userProfile}>
                                    <span className={styles.userName}>{user?.name}</span>
                                    <button onClick={handleLogout} className={styles.logoutBtn}>Logout</button>
                                </div>
                            ) : (
                                <>
                                    <button className={styles.loginBtn} onClick={() => openAuthModal("login")}>
                                        <LogIn size={16} /> Login
                                    </button>
                                    <button className={styles.registerBtn} onClick={() => openAuthModal("register")}>
                                        <UserPlus size={16} /> Register
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE LOGO AS REQUESTED */}
            <div className={styles.rightDock}>
                <div className={styles.rightLogo}>
                    <img
                        src={withCache(settings?.logo_url_right, health1)}
                        alt="Right Logo"
                        onClick={() => navigate("/")}
                    />
                </div>
            </div>

            {/* MOBILE MENU OVERLAY */}
            <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuOpen : ""}`}>
                <div className={styles.mobileContent}>
                    <button onClick={() => setIsMenuOpen(false)}>Close</button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
