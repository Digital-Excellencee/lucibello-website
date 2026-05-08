'use client'

import styles from './AnnouncementBar.module.css'

const messages = [
  '✦ Free shipping on orders above ₹499',
  '✦ No Artificial Sweeteners',
  '✦ Gluten Free',
  '✦ No Preservatives',
  '✦ Handcrafted in small batches',
  '✦ 100% Natural Ingredients',
]

export default function AnnouncementBar({ theme }) {
  const text = [...messages, ...messages].join('     ')

  return (
    <div
      className={styles.bar}
      style={{
        background: theme.annBar,
        color: theme.annBarText,
        transition: 'background 0.85s cubic-bezier(0.76,0,0.24,1), color 0.6s',
      }}
    >
      <div className={styles.track}>
        <span className={styles.text}>{text}</span>
        <span className={styles.text} aria-hidden="true">{text}</span>
      </div>
    </div>
  )
}
