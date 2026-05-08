'use client'

import { products } from '@/data/products'
import ProductCard from './ProductCard'
import styles from './ProductsSection.module.css'

export default function ProductsSection({ theme }) {
  return (
    <section className={styles.section}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <p className={styles.eyebrow} style={{ color: theme.accentLight }}>
            <span style={{ background: theme.accentLight }} className={styles.eyebrowLine} />
            Our Bestsellers
          </p>
          <h2 className={styles.title}>
            Handcrafted <em>Indulgence</em>
          </h2>
        </div>
        <a href="#" className={styles.viewAll}>
          View All Collection →
        </a>
      </div>

      {/* Cards grid */}
      <div className={styles.grid}>
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>

      {/* Quality strip */}
      <div className={styles.strip}>
        {[
          { icon: '🌿', label: 'No Artificial Sweeteners' },
          { icon: '✦', label: 'Gluten Free' },
          { icon: '🛡️', label: 'No Preservatives' },
          { icon: '🚚', label: 'Pan India Delivery' },
        ].map(({ icon, label }) => (
          <div key={label} className={styles.stripItem}>
            <span className={styles.stripIcon}>{icon}</span>
            <span>{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
