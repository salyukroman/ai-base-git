"use client";
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './FAQ.module.css';

export default function FAQ({ questions }) {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleOpen = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className={styles.faqList}>
      {questions.map((q, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={index} className={`${styles.faqItem} ${isOpen ? styles.open : ''} glass`}>
            <button 
              className={styles.question} 
              onClick={() => toggleOpen(index)}
              aria-expanded={isOpen}
            >
              <span>{q.question}</span>
              <ChevronDown 
                size={20} 
                className={`${styles.icon} ${isOpen ? styles.rotated : ''}`} 
              />
            </button>
            <div 
              className={styles.answerWrapper}
              style={{ gridTemplateRows: isOpen ? '1fr' : '0fr' }}
            >
              <div className={styles.answer}>
                <div className={styles.answerInner}>
                  {q.answer}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
