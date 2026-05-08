'use client'

import { useState } from 'react'
import styles from './ProductCard.module.css'

export default function ProductCard({ product, index }) {
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div
      className={styles.card}
      style={{
        animationDelay: `${index * 0.1}s`,
        '--accent': product.theme.accent,
        '--accent-light': product.theme.accentLight,
      }}
    >
      {/* Image area */}
      <div
        className={styles.imgWrap}
        style={{
          background: `radial-gradient(circle at 50% 70%, ${product.theme.accent}22 0%, transparent 70%)`,
        }}
      >
        <span className={styles.emoji}>{product.emoji}</span>

        {/* Badge */}
        <span
          className={styles.badge}
          style={{
            background: product.theme.accent + '28',
            color: product.theme.accentLight,
            borderColor: product.theme.accentLight + '30',
          }}
        >
          {product.badge}
        </span>
      </div>

      {/* Body */}
      <div className={styles.body}>
        <div>
          <h3 className={styles.name}>{product.name}</h3>
          <p
            className={styles.variant}
            style={{ color: product.theme.accentLight + '99' }}
          >
            {product.variant}
          </p>
          <p className={styles.tagline}>{product.tagline}</p>
        </div>

        <div className={styles.specRow}>
          <span className={styles.specChip}>{product.cocoa} Cocoa</span>
          <span className={styles.specChip}>{product.weight}</span>
        </div>

        <div className={styles.footer}>
          <div>
            <span className={styles.price}>₹{product.price}</span>
            <span className={styles.per}> / 100g</span>
          </div>
          <button
            className={`${styles.addBtn} ${added ? styles.added : ''}`}
            onClick={handleAdd}
            style={added
              ? { background: product.theme.accent, borderColor: product.theme.accent }
              : { borderColor: product.theme.accentLight + '40' }
            }
            aria-label="Add to cart"
          >
            {added ? '✓' : '+'}
          </button>
        </div>
      </div>

      {/* Hover glow */}
      <div
        className={styles.hoverGlow}
        style={{ background: `radial-gradient(circle at 50% 100%, ${product.theme.accent}20 0%, transparent 65%)` }}
      />
    </div>
  )
}
