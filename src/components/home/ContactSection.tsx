import React from 'react';
import styles from './ContactSection.module.css';
import {
    Phone,
    Mail,
    MapPin,
    ArrowRight,
    Check
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const ContactSection: React.FC = () => {
    const { openAuthModal } = useAuth();

    return (
        <section id="contact" className={styles.section}>
            <div className={styles.container}>
                {/* Left Column */}
                <div className={styles.leftColumn}>
                    <div className={styles.intro}>
                        <span className={styles.subtitle}>CONTACT HEALTH+ SERVICES</span>
                        <h2 className={styles.title}>
                            Let's Start a <span className={styles.highlight}>Meaningful</span> Conversation
                        </h2>
                        <p className={styles.description}>
                        Whether you’re exploring our healthcare services, seeking trusted medical partnerships, or interested in Health Plus franchise opportunities, our team is here to support you with care, clarity, and commitment.                        </p>
                    </div>

                    <div className={styles.contactGrid}>
                        <div className={styles.infoCard}>
                            <Phone className={styles.infoIcon} size={20} />
                            <div className={styles.infoContent}>
                                <h3>Phone</h3>
                                <p>+91 70937 04706</p>
                            </div>
                        </div>
                        <div className={styles.infoCard}>
                            <Mail className={styles.infoIcon} size={20} />
                            <div className={styles.infoContent}>
                                <h3>Email</h3>
                                <p>tatitoprojects@gmail.com</p>
                                <p>support@tatitoprojects.com</p>
                            </div>
                        </div>
                        <div className={styles.infoCard}>
                            <MapPin className={styles.infoIcon} size={20} />
                            <div className={styles.infoContent}>
                                <h3>Location</h3>
                                <p>Tirupati, Andhra Pradesh</p>
                                <p>517501, India</p>
                            </div>
                        </div>
                        <div className={styles.downloadSection}>
                            <h3>Download Our App</h3>
                            <div className={styles.appButtons}>
                                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="App Store" className={styles.appBtn} />
                                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Google Play" className={styles.appBtn} />
                            </div>
                        </div>
                    </div>

                    <div className={styles.regCard}>
                        <h3>Join Health Plus — Free Registration</h3>
                        <p>        Create your free Health Plus profile and connect with trusted doctors,
        diagnostics, and healthcare services through a secure, technology-driven platform.</p>
                        <div className={styles.bulletList}>
                            <div className={styles.bulletItem}>
                                <Check className={styles.checkIcon} size={16} />
                                <span>Free patient or doctor profile registration</span>
                            </div>
                            <div className={styles.bulletItem}>
                                <Check className={styles.checkIcon} size={16} />
                                <span>Access to verified doctors and healthcare specialists</span>
                            </div>
                            <div className={styles.bulletItem}>
                                <Check className={styles.checkIcon} size={16} />
                                <span>Book consultations and receive medical guidance</span>
                            </div>
                            <div className={styles.bulletItem}>
                                <Check className={styles.checkIcon} size={16} />
                                <span>Secure health records and appointment tracking</span>
                            </div>
                        </div>
                        <button className={styles.regBtn} onClick={() => openAuthModal('register')}>
                            Register For Free <ArrowRight size={18} />
                        </button>
                    </div>

                </div>

                {/* Right Column */}
                <div className={styles.rightColumn}>
                    <div className={styles.formHeader}>
                        <h2>Send Us a Message</h2>
                        <p>We typically respond within 24 hours.</p>
                    </div>

                    <form className={styles.formArea}>
                        <div className={styles.formRow}>
                            {/* <input type="text" placeholder="Last Name" required /> */}
                        </div>
                        <input type="text" placeholder="FUll Name" required />
                        <input type="tel" placeholder="Phone Number" required />
                        <input type="email" placeholder="Email Address" required />
                        <textarea placeholder="Tell us how we can help you..." rows={6} required></textarea>
                        <button type="submit" className={styles.submitBtn}>
                            Send Message
                        </button>
                    </form>

                    <div className={styles.officeHeader}>
                        <h3>Office Address</h3>
                        <div className={styles.mapContainer}>
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3877.54492212308!2d79.43331991115305!3d13.624583000169977!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a4d4b085e6780cf%3A0x32b866f5776709de!2sTATITO%20PROJECTS!5e0!3m2!1sen!2sin!4v1769098927355!5m2!1sen!2sin"
                                allowFullScreen
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
