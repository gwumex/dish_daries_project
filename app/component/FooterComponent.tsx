'use client'
import React from 'react';
import Link from 'next/link';
import './FooterComponent.css'; // Ensure this path is correct

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h5 className="footer-heading">Links</h5>
          <ul className="list-none p-0">
            <li>
              <Link href="/" className="footer-link">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="footer-link">
                About Us
              </Link>
            </li>
            <li>
              <Link href="/menu" className="footer-link">
                Menu
              </Link>
            </li>
            <li>
              <Link href="/contact" className="footer-link">
                Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="footer-column">
          <h5 className="footer-heading">Our Address</h5>
          <address className="address">
            121, Clear Water Bay Road<br />
            Clear Water Bay, Kowloon<br />
            HONG KONG<br />
            <i className="fa fa-phone"></i>: +852 1234 5678<br />
            <i className="fa fa-fax"></i>: +852 8765 4321<br />
            <i className="fa fa-envelope"></i>:{' '}
            <a className="footer-link" href="mailto:confusion@food.net">
              confusion@food.net
            </a>
          </address>
        </div>
        <div className="footer-column">
          <h5 className="footer-heading">Connect With Us</h5>
          <div className="social-icons-container">
            <a className="social-icon-link" href="http://google.com/+" aria-label="Google">
              <i className="fa fa-google-plus"></i>
            </a>
            <a className="social-icon-link" href="http://www.facebook.com/profile.php?id=" aria-label="Facebook">
              <i className="fa fa-facebook"></i>
            </a>
            <a className="social-icon-link" href="http://www.linkedin.com/in/" aria-label="LinkedIn">
              <i className="fa fa-linkedin"></i>
            </a>
            <a className="social-icon-link" href="http://twitter.com/" aria-label="Twitter">
              <i className="fa fa-twitter"></i>
            </a>
            <a className="social-icon-link" href="http://youtube.com/" aria-label="Youtube">
              <i className="fa fa-youtube"></i>
            </a>
            <a className="social-icon-link" href="mailto:" aria-label="Email">
              <i className="fa fa-envelope-o"></i>
            </a>
          </div>
        </div>
        {/* Additional column can be added here */}
      </div>
      <div className="copy-right">
        &copy; {new Date().getFullYear()} Ristorante Con Fusion
      </div>
    </footer>
  );
}

export default Footer;
