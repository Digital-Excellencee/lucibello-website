'use client'

import { useState } from 'react'
import styles from './Navbar.module.css'

const navLinks = ['Collections', 'Chocolates', 'Gifting', 'Our Story']

export default function Navbar({ theme }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <nav className={styles.nav}>
      {/* Logo */}
      <div className={styles.logo}>
        <div
          className={styles.badge}
          style={{ borderColor: theme.accentLight + '60' }}
        >
          <span>L</span>
        </div>
        <span className={styles.brandName}>Lucibello&apos;s</span>
      </div>

      {/* Desktop links */}
      <ul className={styles.links}>
        {navLinks.map((link) => (
          <li key={link}>
            <a href="#" className={styles.link}>{link}</a>
          </li>
        ))}
      </ul>

      {/* Right actions */}
      <div className={styles.right}>
        <button
          className={styles.shopBtn}
          style={{
            borderColor: theme.accentLight + '50',
            color: theme.accentLight,
          }}
        >
          Shop Now →
        </button>
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.open : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {navLinks.map((link) => (
            <a key={link} href="#" className={styles.mobileLink}
              onClick={() => setMenuOpen(false)}>
              {link}
            </a>
          ))}
          <button className={styles.mobileShop}>Shop Now →</button>
        </div>
      )}
    </nav>
  )
}
