"use client";

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, Target, Cpu, TrendingUp, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import styles from './case.module.css';

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { ease: [0.16, 1, 0.3, 1], duration: 0.8 } }
};

export default function CaseDetailView({ caseData }) {
  if (!caseData) {
    return (
      <div className={styles.notFound}>
        <h1>Кейс не знайдено</h1>
        <Link href="/" className="btn-primary">Повернутись на головну</Link>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <Header />
      
      <main className="container section">
        <div className={styles.backLinkWrapper}>
          <Link href="/#cases" className={styles.backLink}>
            <ArrowLeft size={18} />
            <span>Всі кейси</span>
          </Link>
        </div>

        <motion.article 
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className={styles.article}
        >
          {/* Hero Section */}
          <motion.div variants={fadeUp} className={styles.heroSection}>
            <div className={styles.heroGlow}></div>
            <div className={styles.heroContent}>
              <span className={styles.industry}>{caseData.industry}</span>
              <h1 className={styles.heroTitle}>{caseData.title}</h1>
              <div className={styles.resultBanner}>
                <span className={styles.resultLabel}>Результат:</span>
                <span className={styles.resultValue}>{caseData.result}</span>
              </div>
            </div>
          </motion.div>

          {/* Bento Grid */}
          <div className={styles.bentoGrid}>
            
            {/* Main Content - Left Side */}
            <motion.div variants={fadeUp} className={`${styles.bentoMain} ${styles.glassCard}`}>
              <h2 className={styles.sectionTitle}>
                <Target className={styles.sectionIcon} />
                Контекст проєкту
              </h2>
              <p className={styles.textBlock} style={{ marginBottom: '2rem' }}>
                {caseData.description}
              </p>
              
              <h2 className={styles.sectionTitle} style={{ marginTop: '2rem' }}>
                <AlertCircle className={styles.sectionIcon} style={{ color: '#ef4444' }} />
                Проблема (Challenge)
              </h2>
              {Array.isArray(caseData.challenge) ? (
                <ul className={styles.challengeList}>
                  {caseData.challenge.map((c, i) => (
                    <li key={i} className={styles.challengeItem}>
                      <span className={styles.challengeIcon}>•</span>
                      {c}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className={styles.textBlock}>{caseData.challenge}</p>
              )}
            </motion.div>

            {/* Sidebar - Right Side */}
            <motion.div variants={fadeUp} className={`${styles.bentoSide} ${styles.glassCard}`}>
              <h2 className={styles.sectionTitle}>
                <Cpu className={styles.sectionIcon} />
                Технології
              </h2>
              <div className={styles.tags}>
                {caseData.tech.map((t, idx) => (
                  <span key={idx} className={styles.tag}>{t}</span>
                ))}
              </div>

              {caseData.metrics && caseData.metrics.length > 0 && (
                <>
                  <h2 className={styles.sectionTitle} style={{ marginTop: '3rem' }}>
                    <TrendingUp className={styles.sectionIcon} />
                    Метрики
                  </h2>
                  <div className={styles.metricsGrid}>
                    {caseData.metrics.map((m, idx) => (
                      <div key={idx} className={styles.metricCard}>
                        <span className={styles.metricValue}>{m.value}</span>
                        <span className={styles.metricLabel}>{m.label}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>

            {/* Solution & Process - Full Width */}
            <motion.div variants={fadeUp} className={`${styles.bentoFull} ${styles.glassCard}`}>
              <h2 className={styles.sectionTitle}>Рішення</h2>
              <p className={styles.textBlock} style={{ marginBottom: '3rem' }}>
                {caseData.solution}
              </p>

              {caseData.process && caseData.process.length > 0 && (
                <>
                  <h3 className="heading-2" style={{ marginBottom: '2rem' }}>Покроковий процес</h3>
                  <div className={styles.processTimeline}>
                    {caseData.process.map((step, idx) => (
                      <motion.div 
                        key={idx} 
                        className={styles.processStep}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.1, duration: 0.5 }}
                      >
                        <div className={styles.stepDot}>{idx + 1}</div>
                        <div className={styles.stepContent}>
                          <h4 className={styles.stepTitle}>{step.title}</h4>
                          <p className={styles.stepDesc}>{step.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </>
              )}
            </motion.div>

          </div>
        </motion.article>

        <div className={styles.ctaWrapper}>
          <h3 className="heading-2">Потрібна подібна автоматизація?</h3>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=salyuk.roman@gmail.com" target="_blank" rel="noopener noreferrer" className="btn-primary">Обговорити проєкт</a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
