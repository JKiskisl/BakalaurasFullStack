/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./footer.css";

const Footer = () => {
  return (
    <footer>
      <a href="#" className="footer__logo">
        360 Mind
      </a>

      <ul className="permalinks">
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#about">About us</a>
        </li>
        <li>
          <a href="#product">Product</a>
        </li>
        <li>
          <a href="#whyus">Why us</a>
        </li>
        <li>
          <a href="#pricing">Pricing</a>
        </li>
        <li>
          <a href="#team">Team</a>
        </li>
        <li>
          <a href="#contact">Contact</a>
        </li>
      </ul>

      <div className="footer__socials">
        <a href="http://www.linkedin.com">LinkedIN</a>
        <a href="http://www.github.com">GitHub</a>
        <a href="http://www.instagram.com">Instagram</a>
        <a href="http://www.facebook.com">Facebook</a>
      </div>

      <div className="footer__copyright">
        <small>&copy; 360 Mind. All rights reserved. 2023</small>
      </div>
    </footer>
  );
};

export default Footer;
