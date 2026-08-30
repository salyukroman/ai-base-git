import Link from 'next/link';
import { Layers } from 'lucide-react';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        {/* Left: Navigation */}
        <nav className={styles.navLinks}>
          <Link href="/" className={`${styles.navLink} ${styles.active}`}>Головна</Link>
          <Link href="/#cases" className={styles.navLink}>Автоматизації</Link>
          <Link href="/#faq" className={styles.navLink}>FAQ</Link>
        </nav>

        {/* Center: Logo */}
        <div className={styles.logo}>
          <Layers size={24} color="#fff" />
          <span>Roman Saliuk</span>
        </div>

        {/* Right: Actions */}
        <div className={styles.actions}>
          <a href="#cases" className={styles.btnSecondary}>Кейси</a>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=salyuk.roman@gmail.com" target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>Зв'язатися</a>
        </div>
      </div>
    </header>
  );
}
