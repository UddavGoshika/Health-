import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FileText,
  Download,
  Search,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  ChevronRight,
  X,
} from 'lucide-react';
import styles from './DownloadLabReports.module.css';

// Mock data — replace with real API data later
const mockReports = [
  {
    id: 'REP-001',
    testName: 'Complete Blood Count (CBC)',
    date: '2025-02-05',
    status: 'ready',
    fileUrl: '/reports/rep-001.pdf',
    labName: 'Apollo Diagnostics',
  },
  {
    id: 'REP-002',
    testName: 'Thyroid Profile (T3, T4, TSH)',
    date: '2025-01-28',
    status: 'ready',
    fileUrl: '/reports/rep-002.pdf',
    labName: 'Dr. Lal PathLabs',
  },
  {
    id: 'REP-003',
    testName: 'Fasting Blood Sugar',
    date: '2025-02-10',
    status: 'processing',
    fileUrl: null,
    labName: 'Metropolis Healthcare',
  },
  {
    id: 'REP-004',
    testName: 'Lipid Profile',
    date: '2025-01-15',
    status: 'ready',
    fileUrl: '/reports/rep-004.pdf',
    labName: 'SRL Diagnostics',
  },
];

type Report = (typeof mockReports)[number];

const DownloadLabReports: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const filteredReports = mockReports.filter(
    (report) =>
      report.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.labName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = (report: Report) => {
    if (!report.fileUrl || report.status !== 'ready') {
      alert('Report is not available for download yet.');
      return;
    }

    // Simulate download (in real app → use signed URL or backend endpoint)
    const link = document.createElement('a');
    link.href = report.fileUrl;
    link.download = `${report.id} - ${report.testName}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    alert(`Started downloading ${report.id} — ${report.testName}`);
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.header}>
        <h1 className={styles.title}>Download Lab Reports</h1>
        <p className={styles.subtitle}>Access and download your recent lab test reports</p>
      </div>

      <div className={styles.contentWrapper}>
        {/* Search */}
        <div className={styles.searchContainer}>
          <div className={styles.searchInputWrapper}>
            <Search size={20} className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by test name, report ID or lab..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
            />
          </div>
        </div>

        {/* Reports */}
        {filteredReports.length === 0 ? (
          <div className={styles.noReports}>
            <FileText size={64} className={styles.noReportsIcon} />
            <h3>No reports found</h3>
            <p>No lab reports match your search.</p>
            <button className={styles.backBtn} onClick={() => navigate(-1)}>
              Go Back
            </button>
          </div>
        ) : (
          <div className={styles.reportsGrid}>
            {filteredReports.map((report) => (
              <div key={report.id} className={styles.reportCard}>
                <div className={styles.reportHeader}>
                  <div className={styles.reportIcon}>
                    <FileText size={28} />
                  </div>
                  <div className={styles.reportInfo}>
                    <h3 className={styles.reportTitle}>{report.testName}</h3>
                    <p className={styles.reportLab}>{report.labName}</p>
                    <div className={styles.reportDate}>
                      <Calendar size={14} /> {report.date}
                    </div>
                  </div>
                </div>

                <div className={styles.reportStatus}>
                  {report.status === 'ready' && (
                    <span className={`${styles.statusBadge} ${styles.ready}`}>
                      <CheckCircle2 size={16} /> Ready
                    </span>
                  )}
                  {report.status === 'processing' && (
                    <span className={`${styles.statusBadge} ${styles.processing}`}>
                      <Clock size={16} /> Processing
                    </span>
                  )}
                </div>

                <div className={styles.reportActions}>
                  <button
                    className={`${styles.downloadBtn} ${report.status !== 'ready' ? styles.disabled : ''}`}
                    onClick={() => handleDownload(report)}
                    disabled={report.status !== 'ready'}
                  >
                    <Download size={18} />
                    Download Report
                  </button>

                  <button
                    className={styles.viewDetailsBtn}
                    onClick={() => setSelectedReport(report)}
                  >
                    View Details <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Report Details Modal */}
      {selectedReport && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <div className={styles.modalHeader}>
              <h2 className={styles.modalTitle}>Report Details</h2>
              <button className={styles.modalClose} onClick={() => setSelectedReport(null)}>
                <X size={24} />
              </button>
            </div>

            <div className={styles.modalBody}>
              <div className={styles.modalRow}>
                <strong>Report ID:</strong>
                <span>{selectedReport.id}</span>
              </div>
              <div className={styles.modalRow}>
                <strong>Test:</strong>
                <span>{selectedReport.testName}</span>
              </div>
              <div className={styles.modalRow}>
                <strong>Lab:</strong>
                <span>{selectedReport.labName}</span>
              </div>
              <div className={styles.modalRow}>
                <strong>Date:</strong>
                <span>{selectedReport.date}</span>
              </div>
              <div className={styles.modalRow}>
                <strong>Status:</strong>
                <span>
                  {selectedReport.status === 'ready' ? 'Ready to download' : 'Processing'}
                </span>
              </div>

              {selectedReport.status === 'ready' && (
                <button
                  className={styles.modalDownloadBtn}
                  onClick={() => {
                    handleDownload(selectedReport);
                    setSelectedReport(null);
                  }}
                >
                  <Download size={18} /> Download Report
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DownloadLabReports;