import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FlaskConical,
  ShieldCheck,
  Search,
  Clock,
  Upload,
  ClipboardList,
  ChevronRight,
  Brain,
  Heart,
  Bone,
  Droplet,
  Baby,
  Activity,
} from "lucide-react";
import styles from "./Laboratory.module.css";

/* Doctor created health checks */
const DOCTOR_CHECKS = [
  "Full Body Checkup",
  "Diabetes",
  "Women's Health",
  "Thyroid",
  "Vitamin",
  "Blood Studies",
  "Heart",
  "Kidney",
  "Liver",
  "Hairfall",
  "Fever",
  "Senior Citizen",
];

/* Top Tests */
const TOP_TESTS = [
  { id: 1, name: "Urine Routine & Microscopy", tests: 12, price: 199, oldPrice: 450, discount: "55% off" },
  { id: 2, name: "S. Creatinine", tests: 1, price: 180, oldPrice: 400, discount: "55% off" },
  { id: 3, name: "CRP Test", tests: 1, price: 399, oldPrice: 850, discount: "53% off" },
];

/* Packages */
const PACKAGES = [
  { id: 1, label: "PLATINUM", name: "Full Labs Screening", tests: "82 Tests", price: 3499, oldPrice: 7999, discount: "56% off", reports: "24 hours" },
  { id: 2, label: "SPECIALTY", name: "Allergy Panel", tests: "120+ Allergens", price: 5999, oldPrice: 12000, discount: "50% off", reports: "48 hours" },
];

/* Vital Organs */
const VITAL_ORGANS = [
  { name: "Thyroid", icon: Brain },
  { name: "Heart", icon: Heart },
  { name: "Joint Pain", icon: Bone },
  { name: "Kidney", icon: Droplet },
];

/* Women Care (from latest screenshot) */
const WOMEN_CARE = [
  { name: "PCOD Screening", icon: Baby },
  { name: "Blood Studies", icon: Activity },
  { name: "Pregnancy", icon: Heart },
];

export default function Laboratory() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filteredChecks = DOCTOR_CHECKS.filter((item) =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.pageRoot}>
      <div className={styles.container}>
        {/* === Scrolling Banner at Top === */}
        <div className={styles.bannerSlider}>
          <div className={styles.bannerTrack}>
            <div className={styles.bannerItem}>
              <div className={styles.bannerContent}>
                <h2>X-RAYS & SCANS: NOW IN YOUR CITY!</h2>
                <p>
                  Make online booking for X-Ray | CT Scan | Ultrasound and more
                  <br />
                  Get prioritised slots and quicker test reports
                </p>
                <button className={styles.bannerButton}>BOOK NOW</button>
                <p className={styles.bannerContact}>
                  You can also call <strong>080-4885-1067</strong> to book instantly
                </p>
              </div>
              <div className={styles.bannerImage}>
                <div className={styles.imagePlaceholder}>X-Ray Scan</div>
              </div>
            </div>

            {/* Duplicate for smooth loop */}
            <div className={styles.bannerItem}>
              <div className={styles.bannerContent}>
                <h2>X-RAYS & SCANS: NOW IN YOUR CITY!</h2>
                <p>
                  Make online booking for X-Ray | CT Scan | Ultrasound and more
                  <br />
                  Get prioritised slots and quicker test reports
                </p>
                <button className={styles.bannerButton}>BOOK NOW</button>
                <p className={styles.bannerContact}>
                  You can also call <strong>080-4885-1067</strong> to book instantly
                </p>
              </div>
              <div className={styles.bannerImage}>
                <div className={styles.imagePlaceholder}>X-Ray Scan</div>
              </div>
            </div>
          </div>
        </div>

        {/* === Original Doctor Created Health Checks === */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Doctor Created Health Checks</h2>
        </div>

        {/* Search Bar - Right side */}
        <div className={styles.searchBarContainer}>
          <div className={styles.searchBar}>
            <Search size={18} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search health check..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        <div className={styles.iconGrid}>
          {filteredChecks.map((item, idx) => (
            <div
              key={idx}
              className={styles.iconCard}
              onClick={() => navigate(`/labs/${item.toLowerCase().replace(/\s+/g, "-")}`)}
            >
              <div className={styles.iconBox}>
                <ShieldCheck size={20} />
              </div>
              <span className={styles.iconLabel}>{item}</span>
            </div>
          ))}
        </div>

        {/* Top Tests */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Frequently Ordered Lab Tests</h2>
        </div>
        <div className={styles.scroller}>
          {TOP_TESTS.map((test) => (
            <div key={test.id} className={styles.testCard}>
              <FlaskConical className={styles.testIcon} />
              <div className={styles.testContent}>
                <h4>{test.name}</h4>
                <p className={styles.testMeta}>{test.tests} Parameters</p>
                <div className={styles.priceRow}>
                  <div className={styles.priceInfo}>
                    <span className={styles.currentPrice}>₹{test.price}</span>
                    <span className={styles.oldPrice}>
                      ₹{test.oldPrice}
                      <span className={styles.discount}> {test.discount}</span>
                    </span>
                  </div>
                  <button className={styles.addBtn} onClick={() => alert("Added to cart")}>
                    Add
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Action Banners */}
        <div className={styles.actionBanners}>
          <div
            className={styles.actionCard}
            onClick={() => navigate("/labs/upload-prescription")}
          >
            <div className={styles.actionLeft}>
              <Upload className={styles.actionIcon} />
              <div className={styles.actionText}>
                <h3>Upload and Order</h3>
              </div>
            </div>
            <ChevronRight />
          </div>

          <div
            className={styles.actionCard}
            onClick={() => navigate("/labs/download-reports")}
          >
            <div className={styles.actionLeft}>
              <ClipboardList className={styles.actionIcon} />
              <div className={styles.actionText}>
                <h3>Download Lab Reports</h3>
              </div>
            </div>
            <ChevronRight />
          </div>
        </div>

        {/* Comprehensive Lab Packages */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Comprehensive Lab Packages</h2>
        </div>
        <div className={styles.scroller}>
          {PACKAGES.map((pkg) => (
            <div key={pkg.id} className={styles.packageCard}>
              <div className={styles.packageTop}>
                <span className={styles.packageBadge}>{pkg.label}</span>
                <h4>{pkg.name}</h4>
                <p className={styles.testList}>{pkg.tests}</p>
                <span className={styles.currentPrice}>₹{pkg.price}</span>
              </div>
              <div className={styles.packageBottom}>
                <div>
                  <Clock size={12} /> {pkg.reports}
                </div>
                <button className={styles.addBtn}>Add</button>
              </div>
            </div>
          ))}
        </div>

        {/* === Vital Organs === */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Vital Organs (8)</h2>
          <button className={styles.viewAllBtn}>View All</button>
        </div>

        <div className={styles.vitalGrid}>
          {VITAL_ORGANS.map((organ, idx) => (
            <div key={idx} className={styles.vitalCard}>
              <organ.icon size={40} />
              <span>{organ.name}</span>
            </div>
          ))}
        </div>

        {/* === New Section: How to book in 3 simple steps === */}
        <div className={styles.bookingStepsSection}>
          <h3 className={styles.stepsTitle}>How to book a Lab test in 3 simple steps</h3>

          <div className={styles.stepsContainer}>
            <div className={styles.step}>
              <div className={styles.stepNumber}>STEP 1</div>
              <div className={styles.stepIcon}>📱</div>
              <p className={styles.stepText}>Book Appointment</p>
              <small>Select a Test/Package and book an appointment on Apollo 24|7</small>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>STEP 2</div>
              <div className={styles.stepIcon}>🏠</div>
              <p className={styles.stepText}>Home Sample Collection</p>
              <small>A certified Apollo agent visits you for sample collection at your selected time slot</small>
            </div>

            <div className={styles.step}>
              <div className={styles.stepNumber}>STEP 3</div>
              <div className={styles.stepIcon}>✅</div>
              <p className={styles.stepText}>Fast & Accurate Results</p>
              <small>Get reports in 12-24 hrs. View and download from the app anytime</small>
            </div>
          </div>
        </div>

        {/* === New Section: Women Care (as per latest image) === */}
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Women Care (5)</h2>
          <button className={styles.viewAllBtn}>View All</button>
        </div>

        <div className={styles.womenCareContainer}>
          <div className={styles.womenCareGrid}>
            {WOMEN_CARE.map((item, idx) => (
              <div key={idx} className={styles.womenCareCard}>
                <item.icon size={40} />
                <span>{item.name}</span>
              </div>
            ))}
          </div>

          {/* Circle Upgrade Banner (as shown in image) */}
          <div className={styles.circleBanner}>
            <div className={styles.circleContent}>
              <div className={styles.circleBadge}>
                <span>Upgrade to Circle and get 20% savings! *TCA</span>
              </div>
              <div className={styles.circlePrice}>
                ₹4408 <span>(₹11021) 60% off</span>
              </div>
              <button className={styles.viewDetailsBtn}>
                View Details <ChevronRight size={16} />
              </button>
            </div>
            <div className={styles.circleActions}>
              <button className={styles.upgradeBtn}>Upgrade To Circle</button>
              <button className={styles.cartBtn}>Go To Cart</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}