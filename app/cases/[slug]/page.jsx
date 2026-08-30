import { getCaseById, casesData } from '@/data/cases';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import styles from './case.module.css';

export function generateStaticParams() {
  return casesData.map((c) => ({
    slug: c.id,
  }));
}

export function generateMetadata({ params }) {
  const caseData = getCaseById(params.slug);
  if (!caseData) return { title: 'Case Not Found' };
  
  return {
    title: `${caseData.title} | Роман Салюк`,
    description: caseData.description,
  };
}

export default function CasePage({ params }) {
  const caseData = getCaseById(params.slug);

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

        <article className={`${styles.article} glass`}>
          <header className={styles.header}>
            <div className={styles.meta}>
              <span className={styles.industry}>{caseData.industry}</span>
            </div>
            <h1 className="heading-2">{caseData.title}</h1>
            <div className={styles.resultBanner}>
              <span className={styles.resultLabel}>Результат:</span>
              <span className={styles.resultValue}>{caseData.result}</span>
            </div>
          </header>

          <div className={styles.content}>
            <div className={styles.block}>
              <h3>Опис проєкту</h3>
              <p>{caseData.description}</p>
            </div>
            
            <div className={styles.block}>
              <h3>Проблема (Challenge)</h3>
              <p>{caseData.challenge}</p>
            </div>

            <div className={styles.block}>
              <h3>Рішення (Solution)</h3>
              <p>{caseData.solution}</p>
            </div>

            <div className={styles.block}>
              <h3>Використані технології</h3>
              <div className={styles.tags}>
                {caseData.tech.map((t, idx) => (
                  <span key={idx} className="tag">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </article>

        <div className={styles.ctaWrapper}>
          <h3 className="heading-2">Потрібна подібна автоматизація?</h3>
          <a href="mailto:saliyk.roman@gmail.com" className="btn-primary">Обговорити проєкт</a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
