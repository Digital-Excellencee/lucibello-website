'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Image from 'next/image'
import { products } from '@/data/products'
import styles from './HeroCarousel.module.css'

const DURATION = 6000 // ms per slide

export default function HeroCarousel({ onThemeChange }) {
  const [current, setCurrent] = useState(0)
  const [prev, setPrev] = useState(null)
  const [direction, setDirection] = useState(1) // 1=forward, -1=backward
  const [progress, setProgress] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const intervalRef = useRef(null)
  const progressRef = useRef(null)
  const startTimeRef = useRef(null)

  const goTo = useCallback((index, dir = 1) => {
    if (isAnimating || index === current) return
    setIsAnimating(true)
    setDirection(dir)
    setPrev(current)
    setCurrent(index)
    setProgress(0)
    startTimeRef.current = null
    setTimeout(() => {
      setPrev(null)
      setIsAnimating(false)
    }, 800)
  }, [current, isAnimating])

  const next = useCallback(() => {
    const nextIdx = (current + 1) % products.length
    goTo(nextIdx, 1)
  }, [current, goTo])

  const goBack = useCallback(() => {
    const prevIdx = (current - 1 + products.length) % products.length
    goTo(prevIdx, -1)
  }, [current, goTo])

  // Notify parent of theme change
  useEffect(() => {
    onThemeChange?.(products[current].theme)
  }, [current, onThemeChange])

  // Auto-advance
  useEffect(() => {
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(next, DURATION)
    return () => clearInterval(intervalRef.current)
  }, [next])

  // Progress animation
  useEffect(() => {
    setProgress(0)
    const tick = (ts) => {
      if (!startTimeRef.current) startTimeRef.current = ts
      const elapsed = ts - startTimeRef.current
      const pct = Math.min((elapsed / DURATION) * 100, 100)
      setProgress(pct)
      if (pct < 100) progressRef.current = requestAnimationFrame(tick)
    }
    progressRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(progressRef.current)
  }, [current])

  const product = products[current]
  const prevProduct = prev !== null ? products[prev] : null

  return (
    <section className={styles.hero}>
      {/* Atmospheric orbs */}
      <div
        className={styles.orb1}
        style={{ background: product.theme.orb1 }}
      />
      <div
        className={styles.orb2}
        style={{ background: product.theme.orb2 }}
      />

      {/* Grain texture overlay */}
      <div className={styles.grain} />

      {/* Slides */}
      <div className={styles.slidesWrap}>

        {/* Previous slide (exit) */}
        {prevProduct && (
          <div
            className={`${styles.slide} ${styles.slideExit}`}
            data-direction={direction}
          >
            <SlideContent product={prevProduct} isExit direction={direction} />
          </div>
        )}

        {/* Current slide (enter) */}
        <div
          className={`${styles.slide} ${styles.slideEnter}`}
          data-direction={direction}
        >
          <SlideContent product={product} direction={direction} />
        </div>

      </div>

      {/* Progress bar */}
      <div className={styles.progressWrap}>
        <div
          className={styles.progressBar}
          style={{
            width: `${progress}%`,
            background: product.theme.accentLight,
          }}
        />
      </div>

      {/* Controls */}
      <div className={styles.controls}>
        <div className={styles.dots}>
          {products.map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
              style={i === current ? { background: product.theme.accentLight } : {}}
              onClick={() => goTo(i, i > current ? 1 : -1)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <div className={styles.arrows}>
          <button className={styles.arrow} onClick={goBack} aria-label="Previous">
            ←
          </button>
          <button className={styles.arrow} onClick={next} aria-label="Next">
            →
          </button>
        </div>
      </div>
    </section>
  )
}

function SlideContent({ product, isExit, direction }) {
  const { theme } = product

  return (
    <div className={`${styles.slideInner} ${isExit ? styles.exit : styles.enter}`}
      data-direction={direction}>

      {/* Text side */}
      <div className={styles.textSide}>

        <div className={styles.eyebrow} style={{ color: theme.accentLight }}>
          <span
            className={styles.eyebrowLine}
            style={{ background: theme.accentLight }}
          />
          {product.badge}
        </div>

        <h1 className={styles.title}>
          {product.name.split(' ').map((word, i) => (
            <span key={i} className={styles.titleLine}>
              {i === product.name.split(' ').length - 1
                ? <em>{word}</em>
                : word}
            </span>
          ))}
        </h1>

        <p className={styles.desc}>{product.description}</p>

        <div className={styles.chips}>
          <span className={styles.chip}>{product.cocoa} Cocoa</span>
          <span className={styles.chip}>{product.weight}</span>
          <span className={styles.chip}>{product.variant}</span>
        </div>

        <div className={styles.ctaRow}>
          <button
            className={styles.btnPrimary}
            style={{
              background: `linear-gradient(135deg, ${theme.gradientFrom}, ${theme.gradientTo})`,
              boxShadow: `0 8px 32px ${theme.accent}40`,
            }}
          >
            Add to Cart →
          </button>
          <button className={styles.btnGhost}>View Details</button>
        </div>

        <div className={styles.priceRow}>
          <span className={styles.price}>₹{product.price}</span>
          <span className={styles.priceSub}>/ 100g</span>
        </div>
      </div>

      {/* Visual side */}
      <div className={styles.visualSide}>
        <div
          className={styles.productCard}
          style={{ borderColor: theme.accentLight + '20' }}
        >
          {/* Glow ring */}
          <div
            className={styles.glowRing}
            style={{ background: `radial-gradient(circle, ${theme.accent}30 0%, transparent 70%)` }}
          />

          {/* Product placeholder (swap with <Image> when real images available) */}
          <div
            className={styles.productVisual}
            style={{ background: `radial-gradient(circle at 50% 60%, ${theme.accent}18 0%, transparent 65%)` }}
          >
            <span className={styles.productEmoji}>{product.emoji}</span>
            <div className={styles.productLabel} style={{ color: theme.accentLight }}>
              {product.name}
            </div>
            <div className={styles.productVariant}>
              {product.variant}
            </div>

            {/* Specs pills */}
            <div className={styles.specPills}>
              {product.specs.map((s) => (
                <span
                  key={s}
                  className={styles.specPill}
                  style={{ borderColor: theme.accentLight + '30', color: theme.accentLight + 'aa' }}
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Cocoa badge */}
            <div
              className={styles.cocoaBadge}
              style={{ background: theme.accent + '25', color: theme.accentLight }}
            >
              {product.cocoa} Cocoa
            </div>
          </div>
        </div>

        {/* Floating decorative elements */}
        <div
          className={styles.floatDot1}
          style={{ background: theme.accentLight }}
        />
        <div
          className={styles.floatDot2}
          style={{ background: theme.accent }}
        />
      </div>

    </div>
  )
}
