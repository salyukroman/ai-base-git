"use client";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CaseCard from '@/components/CaseCard';
import FAQ from '@/components/FAQ';
import styles from './page.module.css';
import { Bot, LineChart, Users, PhoneCall, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 }
  }
};

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { ease: [0.16, 1, 0.3, 1], duration: 0.8 } }
};

const glassStepsContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.4 }
  }
};

const glassStepItem = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { ease: [0.16, 1, 0.3, 1], duration: 0.5 } }
};

export default function Home() {
  const faqData = [
    {
      question: "Як швидко окупається впровадження AI-агентів?",
      answer: "Зазвичай ROI досягається вже в перші 1-3 місяці за рахунок скорочення витрат на ручну обробку та зменшення кількості втрачених лідів."
    },
    {
      question: "Чи безпечно передавати дані через API?",
      answer: "Так. Всі дані передаються через зашифровані канали (HTTPS), а AI-агенти можуть бути налаштовані так, щоб не зберігати конфіденційну інформацію клієнтів (Zero Data Retention)."
    },
    {
      question: "Скільки часу займає розробка кастомного воркфлоу?",
      answer: "Від 1 до 3 тижнів залежно від складності інтеграцій, кількості систем (CRM, месенджери, бази даних) та вимог до AI-логіки."
    },
    {
      question: "Чи зможе моя команда самостійно підтримувати ці автоматизації?",
      answer: "Так! Я будую процеси на базі no-code платформ на кшталт n8n. Ви отримаєте детальну документацію та відеоінструкцію, тому базові зміни зможете робити самостійно."
    }
  ];

  return (
    <div className={styles.wrapper}>
      <Header />
      
      <main>
        {/* FULL BLEED HERO SECTION (SaaS Landing Style) */}
        <section className={styles.fullHero}>
          <div className={styles.heroBackground}></div>
          
          <div className={`container ${styles.heroContainer}`}>
            
            {/* Left Content */}
            <motion.div 
              className={styles.heroContentLeft}
              variants={staggerContainer}
              initial="hidden"
              animate="show"
            >
              <motion.div variants={staggerItem} className={styles.heroPill}>
                <span className={styles.pillHighlight}>[ 100% ]</span>
                <span className={styles.pillText}>Автоматизація рутини</span>
              </motion.div>
              
              <motion.h1 variants={staggerItem} className={styles.heroTitle}>Автоматизація бізнесу<br/>Powered by AI</motion.h1>
              
              <motion.p variants={staggerItem} className={styles.heroSubtitle}>
                Перетворіть ручні процеси на надійні, автономні AI-воркфлоу без постійних помилок.
              </motion.p>
              
              <motion.div variants={staggerItem} className={styles.heroActions}>
                <a href="#cases" className={styles.btnPrimaryLg}>Get Started <ArrowRight size={16} /></a>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=salyuk.roman@gmail.com" target="_blank" rel="noopener noreferrer" className={styles.btnSecondaryLg}>Book a Demo</a>
              </motion.div>
            </motion.div>

            {/* Right Content (Glass Card) */}
            <motion.div 
              className={styles.heroContentRight}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ ease: [0.16, 1, 0.3, 1], duration: 1, delay: 0.2 }}
            >
              <motion.div 
                className={styles.glassCard}
                animate={{ y: [-5, 5, -5] }}
                transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              >
                <div className={styles.glassHeader}>
                  <div className={styles.glassIconBox}>
                    <Bot size={28} color="#fff" />
                  </div>
                  <div className={styles.glassTitleBox}>
                    <h3 className={styles.glassTitle}>AI Lead Qualification</h3>
                    <p className={styles.glassVal}>120 hrs saved / month</p>
                  </div>
                </div>
                
                <motion.div 
                  className={styles.glassBody}
                  variants={glassStepsContainer}
                  initial="hidden"
                  animate="show"
                >
                  <motion.div variants={glassStepItem} className={styles.glassRow}>
                    <span className={styles.glassStep}>
                      <span className={styles.glassStepIcon} style={{background: '#8b5cf6'}}></span>
                      Webhook Trigger
                    </span>
                    <span className={styles.glassTime}>0ms</span>
                  </motion.div>
                  <motion.div variants={glassStepItem} className={styles.glassRow}>
                    <span className={styles.glassStep}>
                      <span className={styles.glassStepIcon} style={{background: '#22c55e'}}></span>
                      ChatGPT Analysis
                    </span>
                    <span className={styles.glassTime}>800ms</span>
                  </motion.div>
                  <motion.div variants={glassStepItem} className={styles.glassRow}>
                    <span className={styles.glassStep}>
                      <span className={styles.glassStepIcon} style={{background: '#3b82f6'}}></span>
                      Zoho CRM Update
                      <motion.span 
                        animate={{ opacity: [1, 0, 1] }} 
                        transition={{ repeat: Infinity, duration: 0.8 }}
                        style={{ display: 'inline-block', width: '6px', height: '14px', background: '#3b82f6', marginLeft: '6px', verticalAlign: 'middle' }}
                      />
                    </span>
                    <span className={styles.glassTime}>250ms</span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* LOGO WALL (Extracted from Hero) */}
        <section className={styles.logoWall}>
          <div className={`container ${styles.logoWallContent}`}>
            <div className={styles.trustedBy}>
              <span>Довіряють власники бізнесу</span>
              <div className={styles.avatarGroup}>
                <img className={styles.avatar} src="https://i.pravatar.cc/100?img=68" alt="Client 1" />
                <img className={styles.avatar} src="https://i.pravatar.cc/100?img=47" alt="Client 2" />
                <img className={styles.avatar} src="https://i.pravatar.cc/100?img=33" alt="Client 3" />
              </div>
            </div>
            <div className={styles.techLogos}>
              <span className={styles.techLogo}>OpenAI</span>
              <span className={styles.techLogo}>n8n</span>
              <span className={styles.techLogo}>Claude</span>
              <span className={styles.techLogo}>Telegram</span>
            </div>
          </div>
        </section>

        {/* CASES SECTION */}
        <section id="cases" className="section container" style={{ marginTop: '4rem' }}>
          <div className={styles.sectionHeader}>
            <h2 className="heading-2">Реалізовані проєкти</h2>
            <p className="text-muted">Останні автоматизації, які вже економлять час клієнтам.</p>
          </div>
          
          <div className={styles.casesGrid}>
            <CaseCard 
              id="call-analysis"
              title="Агент аналізу дзвінків"
              industry="B2B-продажі та послуги"
              result="10–15 хв → 0 хв на обробку дзвінка"
              icon={<PhoneCall />}
              link={true}
            />
            <CaseCard 
              id="lead-qualification"
              title="AI кваліфікація лідів"
              industry="E-commerce / Догляд за волоссям"
              result="−100% ручної класифікації"
              icon={<Users />}
              link={true}
            />
            <CaseCard 
              id="sales-reporting"
              title="AI звітність по продажах"
              industry="E-commerce / Онлайн-ритейл"
              result="45+ хв/день → 0 хв щоденного огляду"
              icon={<LineChart />}
              link={true}
            />
            <CaseCard 
              id="ticket-routing"
              title="AI маршрутизація звернень"
              industry="Сфера послуг / Барбершоп"
              result="0 хв затримки + 100% захист від пропусків"
              icon={<Bot />}
              link={true}
            />
          </div>
        </section>

        {/* FAQ SECTION */}
        <section id="faq" className="section container">
          <div className={styles.sectionHeader}>
            <h2 className="heading-2">Поширені запитання</h2>
          </div>
          <FAQ questions={faqData} />
        </section>
      </main>

      <Footer />
    </div>
  );
}
