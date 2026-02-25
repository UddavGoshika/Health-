import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FlaskConical,
  Dna,
  Microscope,
  Layers,
  Pipette,
  TestTube,
  Atom,
  ChevronRight,
  Upload,
  ClipboardList,
  ShieldCheck,
  HeartPulse,
  Clock
} from "lucide-react";
import styles from "./Laboratory.module.css";

/* Safe custom droplet icon */
function Droplet({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z" />
    </svg>
  );
}

/* DATA */

const DOCTOR_CHECKS = [
  "Full Body Checkup","Diabetes","Women's Health","Thyroid","Vitamin",
  "Blood Studies","Heart","Kidney","Liver","Hairfall","Fever","Senior Citizen"
];

const CATEGORIES = [
  { icon: <FlaskConical size={20} />, label: "Allergic Panel" },
  { icon: <ShieldCheck size={20} />, label: "Immunology" },
  { icon: <Atom size={20} />, label: "Microbiology" },
  { icon: <Microscope size={20} />, label: "Biopsies" },
  { icon: <Dna size={20} />, label: "Genetic Testing" },
  { icon: <Layers size={20} />, label: "Histopathology" },
  { icon: <Atom size={20} />, label: "Molecular Biology" },
  { icon: <FlaskConical size={20} />, label: "Flow Cytometry" },
  { icon: <TestTube size={20} />, label: "Hormone Assay" },
  { icon: <Pipette size={20} />, label: "Toxicology" },
  { icon: <Droplet size={20} />, label: "Serology" },
  { icon: <Microscope size={20} />, label: "Cytology" }
];

const TOP_TESTS = [
  { id: 1, name: "Urine Routine & Microscopy", tests: 12, price: 199 },
  { id: 2, name: "S. Creatinine", tests: 1, price: 180 },
  { id: 3, name: "CRP Test", tests: 1, price: 399 }
];

const PACKAGES = [
  { id: 1, label: "PLATINUM", name: "Full Labs Screening", tests: "82 Tests", price: 3499, reports: "24 hours" },
  { id: 2, label: "SPECIALTY", name: "Allergy Panel", tests: "120+ Allergens", price: 5999, reports: "48 hours" }
];

const VITAL_ORGANS = [
  { label: "Heart", icon: <HeartPulse size={24} /> },
  { label: "Lungs", icon: <Microscope size={24} /> },
  { label: "Liver", icon: <FlaskConical size={24} /> },
  { label: "Kidney", icon: <TestTube size={24} /> },
  { label: "Brain", icon: <Dna size={24} /> },
  { label: "Thyroid", icon: <Atom size={24} /> },
  { label: "Blood", icon: <Droplet size={24} /> },
  { label: "Digestive", icon: <Layers size={24} /> }
];

const POPULAR_CATEGORIES: string[] = [
  "Pregnancy","Hospital Health Check","Blood Studies","Allergy","Tax Saver","Bone and Joint",
  "Men's Health","Fever and Infection","Vitamin","Fever","Senior Citizen","Covid 19",
  "Hepatitis Screening","Reproductive & Fertility","Full Body Checkup","Women's Health",
  "Diabetes","Kidney","Heart","Hormone Screening","Joint Pain","PCOD Screening",
  "Weight Management","Cancer Screening","Thyroid","Liver","Iron Studies","Stress",
  "Lungs","Sexual Wellness","Immunity","Corporates","Hairfall","All Lab Tests"
];

const WOMEN_CARE = [
  { title: "PCOD Screening", desc: "Hormonal imbalance & cycle issues" },
  { title: "Pregnancy Health Check", desc: "Mother & baby wellness tests" },
  { title: "Thyroid Care", desc: "Hormonal & metabolism health" },
  { title: "Fertility Screening", desc: "Reproductive health assessment" },
  { title: "Anemia Panel", desc: "Iron deficiency & blood health" }
];

const WOMEN_WELLNESS: { title: string; desc: string }[] = [
  { title: "HB (Hemoglobin) Test", desc: "Check hemoglobin levels" },
  { title: "TSH Test", desc: "Thyroid function screening" },
  { title: "LDH Test", desc: "Lactate dehydrogenase levels" },
  { title: "HbA1c Test", desc: "Long-term glucose check" },
  { title: "Blood Group Test", desc: "ABO & Rh group" },
  { title: "Beta HCG Test", desc: "Pregnancy hormone test" },
  { title: "Women Wellness Package", desc: "Comprehensive female panel" },
  { title: "FSH Test", desc: "Female hormone check" },
  { title: "LH Test", desc: "Luteinizing hormone" },
  { title: "Iron Studies", desc: "Iron & TIBC panel" },
  { title: "Vitamin D Test", desc: "Vitamin D level check" },
  { title: "Lipid Profile", desc: "Cholesterol & lipids" }
];



export default function Laboratory() {
  const navigate = useNavigate();
  const [viewAll, setViewAll] = useState(false);

  const visible: string[] = viewAll
    ? POPULAR_CATEGORIES
    : POPULAR_CATEGORIES.slice(0, 6);

  const [womenViewAll, setWomenViewAll] = useState(false);

  const visibleWomen = womenViewAll
  ? WOMEN_CARE
  : WOMEN_CARE.slice(0, 3);

  const [womenWellnessViewAll, setWomenWellnessViewAll] = useState(false);

  const visibleWomenWellness = womenWellnessViewAll
  ? WOMEN_WELLNESS
  : WOMEN_WELLNESS.slice(0, 6);



  return (
    <div className={styles.pageRoot}>
      <div className={styles.container}>

        {/* Doctor Checks */}
        <h2 className={styles.sectionTitle}>Doctor Created Health Checks</h2>
        <div className={styles.iconGrid}>
          {DOCTOR_CHECKS.map((item, idx) => (
            <div key={idx} className={styles.iconCard}>
              <div className={styles.iconBox}><ShieldCheck size={20} /></div>
              <span className={styles.iconLabel}>{item}</span>
            </div>
          ))}
        </div>

        {/* Categories */}
        <h2 className={styles.sectionTitle}>Precision Laboratory Departments</h2>
        <div className={styles.iconGrid}>
          {CATEGORIES.map((cat, idx) => (
            <div key={idx} className={styles.iconCard}>
              <div className={styles.iconBox}>{cat.icon}</div>
              <span className={styles.iconLabel}>{cat.label}</span>
            </div>
          ))}
        </div>

        {/* Tests */}
        <h2 className={styles.sectionTitle}>Frequently Ordered Lab Tests</h2>
        <div className={styles.scroller}>
          {TOP_TESTS.map(test => (
            <div key={test.id} className={styles.testCard}>
              <h4>{test.name}</h4>
              <p>{test.tests} Parameters</p>
              <span className={styles.currentPrice}>₹{test.price}</span>
              <button className={styles.addBtn}>Add</button>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className={styles.actionBanners}>
          <div className={styles.actionCard}>
            <Upload />
            <span>Submit Prescription</span>
          </div>
          <div className={styles.actionCard}>
            <ClipboardList />
            <span>Download Lab Reports</span>
          </div>
        </div>

        {/* Packages */}
        <h2 className={styles.sectionTitle}>Comprehensive Lab Packages</h2>
        <div className={styles.scroller}>
          {PACKAGES.map(pkg => (
            <div key={pkg.id} className={styles.packageCard}>
              <h4>{pkg.name}</h4>
              <p>{pkg.tests}</p>
              <span className={styles.currentPrice}>₹{pkg.price}</span>
              <div><Clock size={12}/> {pkg.reports}</div>
            </div>
          ))}
        </div>

        {/* Vital Organs */}
        <h2 className={styles.sectionTitle}>Lab Tests by Vital Organs</h2>
        <div className={styles.vitalGrid}>
          {VITAL_ORGANS.map((organ, idx) => (
            <div key={idx} className={styles.vitalCard}>
              <div className={styles.vitalIcon}>{organ.icon}</div>
              <span className={styles.vitalLabel}>{organ.label}</span>
            </div>
          ))}
        </div>

        {/* Popular Categories */}
        <div className={styles.popularHeader}>
          <h2 className={styles.sectionTitle}>Popular Categories ({POPULAR_CATEGORIES.length})</h2>
          <button className={styles.viewBtn} onClick={() => setViewAll(!viewAll)}>
            {viewAll ? "View Less" : "View All"}
          </button>
        </div>

        <div className={styles.popularGrid}>
          {visible.map((cat, i) => (
            <div
              key={i}
              className={styles.popularCard}
              onClick={() =>
                navigate(`/laboratory/${cat.toLowerCase().replace(/\s+/g, "-")}`)
              }
            >
              <div className={styles.popularIcon}>🧪</div>
              <span className={styles.popularLabel}>{cat}</span>
            </div>
          ))}
        </div>
        {/* ================= ACTIVE BANNER ================= */}
<div className={styles.activeBanner}>
  <div className={styles.bannerContent}>
    <h2>Smart Health Starts Here</h2>
    <p>Book lab tests, health packages and diagnostics with trusted labs.</p>
    <button className={styles.bannerBtn}>Explore Lab Tests</button>
  </div>
</div>

{/* ================= WOMEN CARE ================= */}
<div className={styles.popularHeader}>
  <h2 className={styles.sectionTitle}>Women Care (5)</h2>
  <button
    className={styles.viewBtn}
    onClick={() => setWomenViewAll(!womenViewAll)}
  >
    {womenViewAll ? "View Less" : "View All"}
  </button>
</div>

<div className={styles.womenGrid}>
  {visibleWomen.map((item, i) => (
    <div key={i} className={styles.womenCard}>
      <div className={styles.womenIcon}>👩‍⚕️</div>
      <h4>{item.title}</h4>
      <p>{item.desc}</p>
    </div>
  ))}
</div>

{/* ================= WOMEN WELLNESS ================= */}
<div className={styles.popularHeader}>
  <h2 className={styles.sectionTitle}>Women Wellness (12)</h2>
  <button
    className={styles.viewBtn}
    onClick={() => setWomenWellnessViewAll(!womenWellnessViewAll)}
  >
    {womenWellnessViewAll ? "View Less" : "View All"}
  </button>
</div>

<div className={styles.womenGrid}>
  {visibleWomenWellness.map((item, i) => (
    <div key={i} className={styles.womenCard}>
      <div className={styles.womenIcon}>🧪</div>
      <h4>{item.title}</h4>
      <p>{item.desc}</p>
    </div>
  ))}
</div>



      </div>
    </div>
  );
}
 