import React from 'react'

const Footer = () => {
const reportCurrentYear = new Date().getFullYear();
  return (
    <>
        <footer className="main-footer"> 
        <div className="footer-container container">
            <div className="footer-left">
            <h3 className="footer-logo">श्री चित्रगुप्तजी</h3>
            <p className="footer-copyright">
                © Copyright {reportCurrentYear} - Chitragupt.
            </p>
            </div>

            <div className="footer-right">
            <p>A shared celebration.</p>
            </div>
        </div>
        </footer>
    </>
  )
}

export default Footer