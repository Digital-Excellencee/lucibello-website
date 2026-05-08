'use client'

import { useState, useCallback } from 'react'
import { products } from '@/data/products'
import AnnouncementBar from '@/components/AnnouncementBar'
import Navbar from '@/components/Navbar'
import HeroCarousel from '@/components/HeroCarousel'
import ProductsSection from '@/components/ProductsSection'
import styles from './page.module.css'

export default function HomePage() {
  const [theme, setTheme] = useState(products[0].theme)

  const handleThemeChange = useCallback((newTheme) => {
    setTheme(newTheme)
  }, [])

  return (
    <main
      className={styles.main}
      style={{ background: theme.bg, transition: 'background 0.9s cubic-bezier(0.76,0,0.24,1)' }}
    >
      <AnnouncementBar theme={theme} />
      <Navbar theme={theme} />
      <HeroCarousel onThemeChange={handleThemeChange} />
      <ProductsSection theme={theme} />
    </main>
  )
}
