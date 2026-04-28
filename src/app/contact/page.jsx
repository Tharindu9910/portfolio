'use client'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const headingStyle = {
    fontFamily: 'Oswald, sans-serif',
    fontWeight: 700,
    lineHeight: 0.97,
    letterSpacing: '-0.02em',
    textTransform: 'uppercase',
    display: 'block',
  }

export default function ContactPage() {
    const subtextRef = useRef(null)
      const buttonsRef = useRef(null)
      const labelRef = useRef(null)
      const line1Ref = useRef(null)
      const line2Ref = useRef(null)
      const line3Ref = useRef(null)

      useEffect(() => {
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
        tl.fromTo(labelRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.5 }
        )
          .fromTo(
            [line1Ref.current, line2Ref.current, line3Ref.current],
            { y: 70, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.85, stagger: 0.1 },
            '-=0.2'
          )
          .fromTo(subtextRef.current,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.6 },
            '-=0.35'
          )
          .fromTo(buttonsRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5 },
            '-=0.2'
          )
      }, [])
    return (
      <>
        <main className="ct-wrap" style={{ paddingTop: "140px" }}>
  
          {/* HERO */}
          <section className="ct-hero">
            <div className="ct-hero__available">
              <span className="ct-hero__line"></span>
              <span className="ct-hero__badge">Available for hire</span>
            </div>
  
            <h1 ref={line1Ref} className="ct-hero__h1"  style={{ ...headingStyle }}>
              IN ARCHITECTURE<br />
              WE TRUST. LET'S<br />
              <span>CONNECT.</span>
            </h1>
  
            <div className="ct-hero__bottom">
              <p className="ct-hero__desc">
                Currently accepting new architectural challenges. Whether it's a complex cloud migration or a pixel-perfect interface, I'm ready to build the next monolith with you.
              </p>
  
              <div className="ct-status-pill">
                <div className="ct-status-dot-wrap">
                  <span className="ct-status-dot-ping"></span>
                  <span className="ct-status-dot-core"></span>
                </div>
                <span className="ct-status-text">
                  Active in SriLanka, GMT+5:30
                </span>
              </div>
            </div>
          </section>
  
          {/* BENTO GRID */}
          <section className="ct-bento">
  
            {/* FORM */}
            <div className="ct-form-card">
              <h2 className="ct-form-card__title">Send a Message</h2>
              <p className="ct-form-card__sub">
                Direct communication line for hiring managers and technical leads.
              </p>
  
              <form className="ct-form">
                <div className="ct-form__group">
                  <label className="ct-form__label">Name</label>
                  <input className="ct-form__input"  />
                </div>
  
                <div className="ct-form__group">
                  <label className="ct-form__label">Company / Organization</label>
                  <input className="ct-form__input"  />
                </div>
  
                <div className="ct-form__group ct-form__group--full">
                  <label className="ct-form__label">Email Address</label>
                  <input className="ct-form__input" />
                </div>
  
                <div className="ct-form__group ct-form__group--full">
                  <label className="ct-form__label">Message</label>
                  <textarea
                    className="ct-form__textarea"
                  ></textarea>
                </div>
  
                <div className="ct-form__group--submit">
                  <button className="ct-form__submit">
                    INITIALIZE TRANSMISSION
                    <span className="ct-form__submit-icon">→</span>
                  </button>
                </div>
              </form>
            </div>
  
            {/* LINKS */}
            <div className="ct-links">
              <a target="_blank" href="https://github.com/Tharindu9910" className="ct-social-link">
                <div>
                  <span className="ct-social-link__label">Version Control</span>
                  <span className="ct-social-link__name">GITHUB</span>
                </div>
                <span className="ct-social-link__icon">›</span>
              </a>
  
              <a target="_blank" href="https://www.linkedin.com/in/tharindu-thennakoon"  className="ct-social-link">
                <div>
                  <span className="ct-social-link__label">Professional</span>
                  <span className="ct-social-link__name">LINKEDIN</span>
                </div>
                <span className="ct-social-link__icon">›</span>
              </a>
  
              <a target="_blank" href="https://medium.com/@tharindutkt" className="ct-social-link">
                <div>
                  <span className="ct-social-link__label">Sharing</span>
                  <span className="ct-social-link__name">MEDIUM</span>
                </div>
                <span className="ct-social-link__icon">›</span>
              </a>
            </div>
          </section>
  
          {/* IMAGE SECTION */}
          {/* <section className="ct-visual">
            <img
              className="ct-visual__img"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuC9DDKkJC6pAdlNI6FcERZ9mvPA0vHFsSunxgBUnsi2J93znFY-18JazT9tJFm2vhdtAsoi7lR08rsDrovwgnK4CU7fBcyN9SLYmec1dznh3S4yTG8KYrmttE6oNqGSal43bcrpu-6yHkXv3Ey7jGn9ZeEL07ij11eX95zMZrMyPXoWm-O6gYORXH_0BM-_-rXpSJCYPy25G_mt2Juz9fMESngADoCYt3TbULAEbWGAFyT3zGnV-OKBRe3KjLUU3hFqWAyF2ZCnSos"
              alt=""
            />
            <div className="ct-visual__gradient"></div>
  
            <div className="ct-visual__content">
              <div className="ct-visual__facts">
                <div>
                  <span className="ct-fact__label">Location</span>
                  <p className="ct-fact__value">
                    Remote / SriLanka Based<br />Available Worldwide
                  </p>
                </div>
  
                <div>
                  <span className="ct-fact__label">Response Time</span>
                  <p className="ct-fact__value">
                    Usually within 24 hours<br />Monday — Friday
                  </p>
                </div>
  
                <div>
                  <span className="ct-fact__label">Timezone</span>
                  <p className="ct-fact__value">
                    IST (UTC+5:30)<br />Flexible for syncs
                  </p>
                </div>
              </div>
            </div>
          </section>
   */}
          {/* NEWSLETTER */}
          {/* <section className="ct-newsletter">
            <h3 className="ct-newsletter__title">WANT TO SEE THE SOURCE?</h3>
            <p className="ct-newsletter__desc">
              I occasionally share deep-dives into system architecture and clean code principles.
            </p>
  
            <div className="ct-newsletter__form">
              <input className="ct-newsletter__input" placeholder="YOUR EMAIL ADDRESS" />
              <button className="ct-newsletter__btn">Subscribe</button>
            </div>
          </section> */}
        </main>
  
      </>
    );
  }