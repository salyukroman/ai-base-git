import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import styles from './CaseCard.module.css';

export default function CaseCard({ title, industry, result, icon, link, id }) {
  const content = (
    <>
      <div className={styles.iconWrapper}>
        <span className={styles.icon}>{icon}</span>
      </div>
      <h3 className={styles.title}>{title}</h3>
      <div className={styles.details}>
        <div className={styles.detailItem}>
          <span className={styles.label}>Індустрія:</span>
          <span className={styles.value}>{industry}</span>
        </div>
        <div className={styles.detailItem}>
          <span className={styles.label}>Результат:</span>
          <span className={styles.valueHighlight}>{result}</span>
        </div>
      </div>
      <div className={styles.action}>
        <span>Детальніше</span>
        <ArrowUpRight size={18} className={styles.actionIcon} />
      </div>
    </>
  );

  return link ? (
    <Link href={`/cases/${id}`} className={`${styles.card} glass`}>
      <article className={styles.cardArticleWrapper}>
        {content}
      </article>
    </Link>
  ) : (
    <article className={`${styles.card} glass`}>
      {content}
    </article>
  );
}
