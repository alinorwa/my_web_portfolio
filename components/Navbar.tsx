'use client'
import { useState, useEffect } from 'react'
import { gsap } from 'gsap'

const NAV_LINKS = [
  { name: 'Home', href: '#hero' },
  { name: 'Story', href: '#journey-outer' },
  { name: 'About', href: '#about-section' },
  { name: 'Projects', href: '#projects-section' },
  { name: 'Skills', href: '#skills-section' },
  { name: 'Contact', href: '#social-section' },
]

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    
    // Navbar entry animation
    gsap.fromTo('.navbar', 
      { y: -100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, ease: 'power4.out', delay: 1 }
    )

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle body scroll lock when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isMobileMenuOpen])

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    
    const target = document.querySelector(href)
    if (target) {
      const offset = 80 // Offset for fixed navbar
      const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset
      
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    }
  }

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isMobileMenuOpen ? 'menu-open' : ''}`}>
      <div className="nav-container">
        <a href="#hero" className="nav-logo" onClick={(e) => handleNavClick(e, '#hero')}>
          ali<span>.</span>
        </a>

        {/* Desktop Links */}
        <div className="nav-links desktop-only">
          {NAV_LINKS.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="nav-link"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Hamburger Toggle */}
        <button 
          className={`nav-toggle ${isMobileMenuOpen ? 'active' : ''}`} 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-links">
          {NAV_LINKS.map((link, i) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="mobile-link"
              style={{ transitionDelay: `${i * 0.1}s` }}
              onClick={(e) => handleNavClick(e, link.href)}
            >
              <span className="link-num">0{i + 1}</span>
              <span className="link-text">{link.name}</span>
            </a>
          ))}
        </div>
        <div className="mobile-footer">
          <p>© {new Date().getFullYear()} ALI — DIGITAL CRAFTSMAN</p>
        </div>
      </div>

      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1000;
          padding: 25px 0;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          border-bottom: 1px solid transparent;
        }

        .navbar.scrolled {
          padding: 15px 0;
          background: rgba(11, 31, 58, 0.85);
          backdrop-filter: blur(15px);
          border-bottom: 1px solid rgba(46, 212, 255, 0.15);
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }

        .navbar.menu-open {
          background: transparent;
          backdrop-filter: none;
          border-bottom: 1px solid transparent;
        }

        .nav-container {
          max-width: 1300px;
          margin: 0 auto;
          padding: 0 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
          z-index: 2100;
        }

        .nav-logo {
          font-family: var(--font-mono);
          font-size: 30px;
          font-weight: 700;
          color: var(--text);
          text-decoration: none;
          letter-spacing: -1.5px;
          transition: transform 0.3s ease;
        }

        .nav-logo span {
          color: var(--accent);
          text-shadow: 0 0 10px var(--accent);
        }

        .nav-logo:hover {
          transform: scale(1.05);
        }

        .nav-links {
          display: flex;
          gap: 40px;
        }

        .nav-link {
          font-family: var(--font-mono);
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 2.5px;
          color: var(--dim);
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          padding: 8px 0;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--accent);
          transition: width 0.3s ease;
          box-shadow: 0 0 10px var(--accent);
        }

        .nav-link:hover {
          color: var(--text);
        }

        .nav-link:hover::after {
          width: 100%;
        }

        /* Hamburger Toggle */
        .nav-toggle {
          display: none;
          flex-direction: column;
          gap: 6px;
          background: none;
          border: none;
          cursor: pointer;
          padding: 10px;
          z-index: 1002;
        }

        .bar {
          width: 28px;
          height: 2px;
          background: var(--text);
          transition: all 0.4s ease;
          border-radius: 2px;
        }

        .nav-toggle.active .bar:nth-child(1) {
          transform: translateY(8px) rotate(45deg);
          background: var(--accent);
        }
        .nav-toggle.active .bar:nth-child(2) {
          opacity: 0;
          transform: translateX(-10px);
        }
        .nav-toggle.active .bar:nth-child(3) {
          transform: translateY(-8px) rotate(-45deg);
          background: var(--accent);
        }

        /* Mobile Menu */
        .mobile-menu {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          height: 100dvh; /* Dynamic viewport height for mobile browsers */
          background: rgba(11, 31, 58, 0.98);
          backdrop-filter: blur(25px);
          z-index: 2000; /* High z-index to cover everything */
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          opacity: 0;
          visibility: hidden;
          transition: all 0.5s cubic-bezier(0.77, 0, 0.175, 1);
          transform: translateY(-100%); /* Slide from top */
          overflow: hidden;
        }

        .mobile-menu::before {
          content: '';
          position: absolute;
          top: -10%;
          right: -10%;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle, rgba(46, 212, 255, 0.15), transparent 70%);
          z-index: -1;
        }

        .mobile-menu::after {
          content: '';
          position: absolute;
          bottom: -10%;
          left: -10%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(153, 102, 255, 0.1), transparent 70%);
          z-index: -1;
        }

        .mobile-menu.open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .mobile-links {
          display: flex;
          flex-direction: column;
          gap: 30px;
          text-align: center;
        }

        .mobile-link {
          font-family: var(--font-sans);
          font-size: clamp(32px, 8vw, 48px);
          font-weight: 800;
          color: var(--text);
          text-decoration: none;
          display: flex;
          align-items: baseline;
          gap: 15px;
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.5s ease;
        }

        .mobile-menu.open .mobile-link {
          opacity: 1;
          transform: translateY(0);
        }

        .link-num {
          font-family: var(--font-mono);
          font-size: 14px;
          color: var(--accent);
          font-weight: 400;
        }

        .mobile-link:hover .link-text {
          color: var(--accent);
          padding-left: 15px;
        }

        .link-text {
          transition: all 0.3s ease;
        }

        .mobile-footer {
          position: absolute;
          bottom: 40px;
          font-family: var(--font-mono);
          font-size: 11px;
          color: var(--dim);
          letter-spacing: 2px;
          opacity: 0.6;
        }

        @media (max-width: 992px) {
          .desktop-only {
            display: none;
          }
          .nav-toggle {
            display: flex;
          }
          .nav-container {
            padding: 0 30px;
          }
          .navbar {
            padding: 20px 0;
          }
        }

        @media (max-width: 480px) {
          .nav-logo {
            font-size: 24px;
          }
          .nav-container {
            padding: 0 20px;
          }
        }
      `}</style>
    </nav>
  )
}
