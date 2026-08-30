import { Mail, MessageCircle, ArrowUpRight } from 'lucide-react';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContent}`}>
        <div className={styles.cta}>
          <h2 className="heading-2">Готові автоматизувати свої процеси?</h2>
          <p className="text-muted">Напишіть мені, і ми обговоримо, як AI може оптимізувати ваш бізнес.</p>
        </div>
        
        <div className={styles.socials}>
          <a href="https://t.me/Saliuk_R" target="_blank" rel="noopener noreferrer" className={`${styles.socialBtn} glass`}>
            <MessageCircle size={24} />
            <span>Telegram</span>
          </a>
          <a href="mailto:saliyk.roman@gmail.com" className={`${styles.socialBtn} glass`}>
            <Mail size={24} />
            <span>Email</span>
          </a>
          <a href="https://www.linkedin.com/in/роман-салюк-28547a104" target="_blank" rel="noopener noreferrer" className={`${styles.socialBtn} glass`}>
            <ArrowUpRight size={24} />
            <span>LinkedIn</span>
          </a>
        </div>
        
        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} Роман Салюк. Всі права захищено.</p>
        </div>
      </div>
    </footer>
  );
}
