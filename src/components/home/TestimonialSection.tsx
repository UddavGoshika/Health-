import React from 'react';
import styles from './TestimonialSection.module.css';
import { Quote, Star, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
   {
    id: 1,
    name: "Rajesh Kumar",
    role: "Cardiac Patient",
    content: "Health Plus helped me connect with the right cardiologist at the right time. The consultation process was smooth, transparent, and truly reassuring during a critical phase of my treatment.",
    rating: 5,
    image: "RK"
},
{
    id: 2,
    name: "Anjali Singh",
    role: "Working Professional",
    content: "From booking appointments to accessing my diagnostic reports, Health Plus made everything effortless. The doctors were attentive, and the follow-up care felt genuinely personal.",
    rating: 5,
    image: "AS"
},
{
    id: 3,
    name: "Vikram Malhotra",
    role: "Parent",
    content: "Health Plus gave us peace of mind during my child’s treatment. The pediatric specialist was excellent, and having all medical updates in one place made the journey stress-free.",
    rating: 4,
    image: "VM"
}

];

const TestimonialSection: React.FC = () => {
    return (
        <section className={styles.testimonialSection}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Real stories from our patients</h2>
                    <p className={styles.subtitle}>“A legacy of compassionate care, trusted and shared by patients through their healing journeys.”</p>
                </div>

                <div className={styles.grid}>
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={testimonial.id}
                            className={styles.card}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <div className={styles.quoteIcon}>
                                <Quote size={40} />
                            </div>
                            {/* <div className={styles.rating}>
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        size={16}
                                        fill={i < testimonial.rating ? "var(--primary-gold)" : "none"}
                                        stroke={i < testimonial.rating ? "var(--primary-gold)" : "#64748b"}
                                    />
                                ))}
                            </div> */}
                            <p className={styles.content}>"{testimonial.content}"</p>
                            <div className={styles.footer}>
                                <div className={styles.avatar}>{testimonial.image}</div>
                                <div className={styles.info}>
                                    <h3>{testimonial.name} <CheckCircle size={14} className={styles.verifyIcon} /></h3>
                                    <span>{testimonial.role}</span>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialSection;
