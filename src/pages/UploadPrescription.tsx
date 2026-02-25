import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Image as ImageIcon, FileText, ArrowRight, X, User, MapPin } from 'lucide-react';
import styles from './UploadPrescription.module.css';

const UploadPrescription: React.FC = () => {
  const navigate = useNavigate();

  // ─── Prescription Upload ────────────────────────────────────────
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // ─── Patient & Address State ────────────────────────────────────
  const [patientName, setPatientName] = useState<string>('');
  const [address, setAddress] = useState<string>('');

  // Modals visibility
  const [showPatientModal, setShowPatientModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);

  // ─── File Handlers ──────────────────────────────────────────────
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleClear = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleSelectEPrescription = () => {
    alert('E-Prescription selection coming soon...');
  };

  // ─── Proceed ────────────────────────────────────────────────────
  const handleProceed = () => {
    if (!selectedFile) {
      alert('Please upload a prescription first');
      return;
    }
    if (!patientName.trim()) {
      alert('Please add patient name');
      return;
    }
    if (!address.trim()) {
      alert('Please add home visit address');
      return;
    }

    alert(
      `Booking proceeding!\n\n` +
      `Patient: ${patientName}\n` +
      `Address: ${address}\n` +
      `Prescription: ${selectedFile.name}`
    );

    // navigate('/booking-summary');
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Upload Prescription</h1>
        <p className={styles.subtitle}>Choose prescription to proceed with booking</p>
      </div>

      <div className={styles.contentWrapper}>
        {/* Upload Section */}
        <div className={styles.uploadSection}>
          <div className={styles.sectionTitle}>Choose From</div>

          <div className={styles.uploadOptions}>
            <label className={styles.uploadCard}>
              <input type="file" accept="image/*,.pdf" hidden onChange={handleFileChange} />
              <div className={styles.iconWrapper}>
                <ImageIcon size={32} />
              </div>
              <span className={styles.uploadLabel}>Choose from Gallery</span>
            </label>

            <div className={styles.uploadCard} onClick={handleSelectEPrescription}>
              <div className={styles.iconWrapper}>
                <FileText size={32} />
              </div>
              <span className={styles.uploadLabel}>Select from E-Prescription</span>
            </div>
          </div>

          <div className={styles.attachedSection}>
            <div className={styles.attachedHeader}>Attached Prescription</div>

            {previewUrl ? (
              <div className={styles.previewContainer}>
                {selectedFile?.type.startsWith('image/') ? (
                  <img src={previewUrl} alt="Prescription preview" className={styles.previewImage} />
                ) : (
                  <div className={styles.pdfPlaceholder}>
                    <FileText size={48} />
                    <p>{selectedFile?.name || 'Document'}</p>
                  </div>
                )}
                <button className={styles.clearBtn} onClick={handleClear}>
                  <X size={16} /> Remove
                </button>
              </div>
            ) : (
              <div className={styles.noPrescription}>
                <p>No prescriptions have been uploaded yet</p>
                <p className={styles.noPrescriptionSub}>No prescriptions now!</p>
                <button
                  className={styles.uploadNowBtn}
                  onClick={() => {
                    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
                    input?.click();
                  }}
                >
                  Upload Now!
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Booking Details */}
        <div className={styles.bookingDetails}>
          <div className={styles.detailsHeader}>Booking Details</div>

          <div className={styles.detailsList}>
            {/* Patient Row */}
            <div className={styles.detailItem}>
              <div className={styles.detailLabelWithIcon}>
                <User size={18} className={styles.detailIcon} />
                <span>{patientName || 'Add Patient'}</span>
              </div>
              <button
                className={styles.actionLink}
                onClick={() => setShowPatientModal(true)}
              >
                {patientName ? 'CHANGE' : 'ADD'}
              </button>
            </div>

            {/* Address Row */}
            <div className={styles.detailItem}>
              <div className={styles.detailLabelWithIcon}>
                <MapPin size={18} className={styles.detailIcon} />
                <span>{address || 'Home Visit Address'}</span>
              </div>
              <button
                className={styles.actionLink}
                onClick={() => setShowAddressModal(true)}
              >
                {address ? 'CHANGE' : 'ADD'}
              </button>
            </div>
          </div>

          <button
            className={`${styles.proceedBtn} ${!selectedFile || !patientName.trim() || !address.trim() ? styles.disabled : ''}`}
            onClick={handleProceed}
            disabled={!selectedFile || !patientName.trim() || !address.trim()}
          >
            Proceed
            <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* ─── Patient Modal ──────────────────────────────────────────────── */}
      {showPatientModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>Add / Change Patient</h2>
            <input
              type="text"
              className={styles.modalInput}
              placeholder="Enter patient name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
            />
            <div className={styles.modalButtons}>
              <button
                className={styles.modalCancel}
                onClick={() => setShowPatientModal(false)}
              >
                Cancel
              </button>
              <button
                className={styles.modalSave}
                onClick={() => setShowPatientModal(false)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─── Address Modal ──────────────────────────────────────────────── */}
      {showAddressModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2 className={styles.modalTitle}>Add / Change Address</h2>
            <textarea
              className={styles.modalInput}
              placeholder="Enter full home visit address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              rows={4}
            />
            <div className={styles.modalButtons}>
              <button
                className={styles.modalCancel}
                onClick={() => setShowAddressModal(false)}
              >
                Cancel
              </button>
              <button
                className={styles.modalSave}
                onClick={() => setShowAddressModal(false)}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadPrescription;