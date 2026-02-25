import React, { useState } from 'react';
import styles from './FAQSection.module.css';
import { Plus, Minus, Search } from 'lucide-react';

const faqs = [
{
    question: "How do I find the right doctor for my health condition?",
    answer: "You can explore our 'Browse Doctors' section to filter specialists by department, experience, location, consultation mode, and availability. Health Plus also recommends suitable doctors based on your health needs."
},
{
    question: "Are the doctors on Health Plus verified?",
    answer: "Yes. Every doctor and healthcare provider listed on Health Plus goes through a strict verification process, including license validation and professional background checks, to ensure trusted care."
},
{
    question: "Is my medical data and communication secure?",
    answer: "Absolutely. All consultations, reports, and messages are protected using advanced encryption standards. Your medical data is stored securely and handled in compliance with healthcare data protection guidelines."
},
{
    question: "Can I book online and offline consultations?",
    answer: "Yes. Health Plus allows you to book online (video or chat) as well as in-person consultations, depending on the doctor’s availability and your preference."
},
{
    question: "How do I access my medical reports and prescriptions?",
    answer: "Your Health Plus dashboard gives you secure access to your medical reports, prescriptions, and consultation history anytime, all in one place."
},
{
    question: "Does Health Plus offer diagnostic and lab services?",
    answer: "Yes. Health Plus partners with trusted diagnostic centers, allowing you to book lab tests, view digital reports, and receive follow-up guidance from doctors seamlessly."
},
{
    question: "What payment methods are supported?",
    answer: "We support multiple secure payment options including UPI, credit/debit cards, and net banking. All transactions are encrypted to ensure safe and reliable payments."
},
{
    question: "Can I get follow-up consultations after my appointment?",
    answer: "Yes. Many doctors on Health Plus provide follow-up consultations, which can be booked easily through your dashboard to ensure continuity of care."
},
{
    question: "How do I reschedule or cancel an appointment?",
    answer: "Appointments can be rescheduled or canceled directly from your dashboard, subject to the doctor’s cancellation policy. Any applicable refunds are processed securely."
},
{
    question: "Is Health Plus suitable for long-term healthcare management?",
    answer: "Yes. Health Plus is designed to support both short-term consultations and long-term healthcare needs, helping you track appointments, medical records, and ongoing treatment plans in one platform."
}

];

const FAQSection: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredFaqs = faqs.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <section id="faq" className={styles.faqSection}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Frequently Asked Questions</h2>
                    <p className={styles.subtitle}>Find answers to common questions about using the E-Advocate platform.</p>
                </div>

                <div className={styles.searchWrapper}>
                    <div className={styles.searchBar}>
                        <Search className={styles.searchIcon} size={20} />
                        <input
                            type="text"
                            placeholder="Search help topics..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <div className={styles.accordion}>
                    {filteredFaqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`${styles.item} ${activeIndex === index ? styles.active : ''}`}
                        >
                            <button
                                className={styles.question}
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                            >
                                <span>{faq.question}</span>
                                {activeIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                            </button>
                            <div className={styles.answerWrapper}>
                                <div className={styles.answer}>
                                    <p>{faq.answer}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;
