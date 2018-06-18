import React from 'react'
import Link from 'gatsby-link'
import styles from '../layouts/styles.module.css'
import github from '../images/GitHub-Mark-64px.png'
import home from '../images/house-outline.svg'
import instagram from '../images/instagram-logo.svg'

const Footer = () => (
  <div
    style={{
      background: '#c6baaa',
      marginBottom: '1.45rem',
    }}
  >
    <div className={styles.footerGrid}>
      <Link className={styles.main} to="/"><img src={ home } alt="Home"/></Link>
      <a className={styles.github} href="https://github.com/complexbear" target="_blank">
        <img src={ github }/>
      </a>
      <a className={styles.instagram} href="https://instagram.com/acomplexbear" target="_blank">
        <img src={ instagram }/>
      </a>      
      <Link to="/credits">Credits</Link>      
    </div>
  </div>
)

export default Footer
