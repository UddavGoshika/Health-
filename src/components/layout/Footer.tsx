import React from "react";
import { Link } from "react-router-dom";
import styles from "./Footer.module.css";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
  FaXTwitter,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa6";

/* Apollo-style footer columns */
const footerColumns = [
  {
    title: "About Health+",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Contact Us", to: "/contact" },
      { label: "FAQs", to: "/faqs" },
      { label: "Health Queries", to: "/health-queries" },
      { label: "Terms & Conditions", to: "/terms" },
      { label: "Privacy Policy", to: "/privacy" },
      { label: "Refund Policy", to: "/refund" },
      { label: "Sitemap", to: "/site-map" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Online Doctor Consultation", to: "/consult" },
      { label: "Online Medicines", to: "/medicines" },
      { label: "Book Lab Tests", to: "/laboratory" },
      { label: "Doctors by Speciality", to: "/doctors" },
      { label: "Doctors by City", to: "/doctors-city" },
      { label: "Weight Management", to: "/weight" },
    ],
  },
  {
    title: "Top Specialities",
    links: [
      { label: "Consult Physicians", to: "/speciality/physician" },
      { label: "Consult Dermatologists", to: "/speciality/dermatology" },
      { label: "Consult Paediatricians", to: "/speciality/paediatrics" },
      { label: "Consult Gynaecologists", to: "/speciality/gynaecology" },
      { label: "Consult Cardiologists", to: "/speciality/cardiology" },
      { label: "Consult Dietitians", to: "/speciality/dietitian" },
    ],
  },
  {
    title: "Book Lab Tests",
    links: [
      { label: "RT PCR Test", to: "/lab/rt-pcr" },
      { label: "CBC Test", to: "/lab/cbc" },
      { label: "Thyroid Profile", to: "/lab/thyroid" },
      { label: "Lipid Profile", to: "/lab/lipid" },
      { label: "LFT Test", to: "/lab/lft" },
      { label: "Urine Test", to: "/lab/urine" },
    ],
  },
  {
    title: "Product Categories",
    links: [
      { label: "Health Care", to: "/products/health-care" },
      { label: "Personal Care", to: "/products/personal-care" },
      { label: "Baby Care", to: "/products/baby-care" },
      { label: "Nutrition", to: "/products/nutrition" },
      { label: "Healthcare Devices", to: "/products/devices" },
      { label: "Diabetes Care", to: "/products/diabetes" },
    ],
  },
  {
    title: "Momverse",
    links: [
      { label: "Preconception", to: "/mom/preconception" },
      { label: "Pregnancy", to: "/mom/pregnancy" },
      { label: "Newborn & Infant", to: "/mom/newborn" },
      { label: "First Trimester", to: "/mom/first-trimester" },
      { label: "Second Trimester", to: "/mom/second-trimester" },
      { label: "Third Trimester", to: "/mom/third-trimester" },
    ],
  },
];

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        {/* LINKS GRID */}
        <div className={styles.linksGrid}>
          {footerColumns.map((col, idx) => (
            <div key={idx} className={styles.column}>
              <h3>{col.title}</h3>
              <ul>
                {col.links.map((link, i) => (
                  <li key={i}>
                    <Link to={link.to}>{link.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* BRANDING */}
        <div className={styles.brandingGrid}>
          <div className={styles.brandBox}>
            <span>APPROVED BY</span>
            <img src="https://upload.wikimedia.org/wikipedia/en/9/95/Digital_India_logo.svg" />
          </div>
          <div className={styles.brandBox}>
            <span>PARTNERS</span>
            <img src="/assets/india_code.webp" />
          </div>
          <div className={styles.brandBox}>
            <span>SECURITY</span>
            <img src="/assets/nic.webp" />
          </div>
        </div>

        {/* APP + SOCIAL */}
        <div className={styles.topSection}>
          <div>
            <h3>Download Our App</h3>
            <div className={styles.storeButtons}>
              <img src="/assets/apple-store.jpg" />
              <img src="/assets/google-play.png" />
            </div>
          </div>

          <div>
            <h3>Connect With Us</h3>
            <div className={styles.socials}>
              <a href="https://instagram.com" target="_blank"><FaInstagram /></a>
              <a href="https://facebook.com" target="_blank"><FaFacebookF /></a>
              <a href="https://linkedin.com" target="_blank"><FaLinkedinIn /></a>
              <a href="https://youtube.com" target="_blank"><FaYoutube /></a>
              <a href="https://x.com" target="_blank"><FaXTwitter /></a>
              <a href="https://t.me" target="_blank"><FaTelegram /></a>
              <a href="https://wa.me/917000000000" target="_blank"><FaWhatsapp /></a>
            </div>
          </div>
        </div>

        <div className={styles.divider} />

        {/* BOTTOM */}
        <div className={styles.bottom}>
          <p>© 2026 Health+ Services. All Rights Reserved.</p>
          <p>Built with ❤ by ILN Technology Team</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;