import React from "react";

import "./header.css";
import CTA from "./CTA";
import HeaderSocials from "./HeaderSocials";

const Header = () => {
  return (
    <section id="home">
      <header>
        <div className="container header__container">
          <h5>Hello, we are</h5>
          <h1>360 Mind</h1>
          <h5 className="text-light">Digital products</h5>
          <CTA />
          <HeaderSocials />

          <a href="#contact" className="scroll__down">
            Scroll down
          </a>
        </div>
      </header>
    </section>
  );
};

export default Header;
