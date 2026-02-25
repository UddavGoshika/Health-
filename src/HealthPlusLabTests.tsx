import React from "react";
import "../styles/HealthPlusLabTests.css";

const HealthPlusLabTests: React.FC = () => {
  const addToCart = (testName: string) => {
    alert(`${testName} added to cart`);
  };

  return (
    <div className="lab-page">
      {/* Health Checks */}
      <section className="section">
        <h2>HealthPlus – Doctor Recommended Health Checks</h2>
        <div className="health-checks">
          <div className="check-chip">🧍 Full Body Checkup</div>
          <div className="check-chip">🩸 Diabetes</div>
          <div className="check-chip">👩 Women’s Health</div>
          <div className="check-chip">🦋 Thyroid</div>
          <div className="check-chip">💊 Vitamin</div>
          <div className="check-chip">🧪 Blood Studies</div>
          <div className="check-chip">❤️ Heart</div>
          <div className="check-chip">🧬 Kidney</div>
          <div className="check-chip">🧠 Liver</div>
          <div className="check-chip">🦴 Bone & Joint</div>
        </div>
      </section>

      {/* Top Tests */}
      <section className="section">
        <h2>Top Booked Laboratory Tests</h2>
        <div className="test-grid">
          <div className="test-card">
            <h4>CBC Test (Complete Blood Count)</h4>
            <p>30 Parameters Included</p>
            <div className="price-row">
              <span className="price">₹419</span>
              <span className="discount">(₹1047)</span>
              <span className="offer">60% off</span>
            </div>
            <button className="add-btn" onClick={() => addToCart("CBC Test")}>
              Add Test
            </button>
          </div>

          <div className="test-card">
            <h4>HbA1c (Diabetes Test)</h4>
            <p>3 Month Average Blood Sugar</p>
            <div className="price-row">
              <span className="price">₹649</span>
              <span className="discount">(₹1623)</span>
              <span className="offer">60% off</span>
            </div>
            <button className="add-btn" onClick={() => addToCart("HbA1c Test")}>
              Add Test
            </button>
          </div>

          <div className="test-card">
            <h4>Lipid Profile</h4>
            <p>Cholesterol & Cardiac Risk</p>
            <div className="price-row">
              <span className="price">₹829</span>
              <span className="discount">(₹2072)</span>
              <span className="offer">60% off</span>
            </div>
            <button className="add-btn" onClick={() => addToCart("Lipid Profile")}>
              Add Test
            </button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section features">
        <div className="feature-card">
          <h4>📄 Upload Prescription</h4>
          <p>Upload and book tests easily</p>
        </div>
        <div className="feature-card">
          <h4>📊 Digital Reports</h4>
          <p>View reports anytime in your account</p>
        </div>
        <div className="feature-card">
          <h4>🏠 Home Sample Collection</h4>
          <p>Free doorstep blood collection</p>
        </div>
      </section>

      {/* Packages */}
      <section className="section">
        <h2>Popular HealthPlus Checkup Packages</h2>
        <div className="packages">
          <div className="package-card">
            <h4>Full Body Checkup</h4>
            <p>68 Tests including CBC, Thyroid, Liver, Kidney</p>
            <p className="money-back">✔ 100% Money Back Guarantee</p>
          </div>

          <div className="package-card">
            <h4>Fever Panel Complete</h4>
            <p>Dengue, Malaria, Typhoid, CBC</p>
          </div>

          <div className="package-card">
            <h4>Heart Health Plan</h4>
            <p>Lipid Profile, ECG, Cardiac Risk Markers</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HealthPlusLabTests;
