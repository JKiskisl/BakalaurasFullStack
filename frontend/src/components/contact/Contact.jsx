import React from "react";
import "./contact.css";
import { AiFillFacebook, AiOutlineMail } from "react-icons/ai";

import { useRef } from "react";
import emailjs from "emailjs-com";

const Contact = () => {
  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      "service_ai23kye",
      "template_b16wyrp",
      form.current,
      "j9XjdK4ktQ-PJFKMK"
    );
    e.target.reset();
  };

  return (
    <section id="contact">
      <h5>Get in touch</h5>
      <h2>Contact us</h2>
      <div className="container contact__container">
        <div className="contact__options">
          <article className="contact__option">
            <AiOutlineMail className="contact__option-icon" />
            <h4>E-mail</h4>
            <h5>mail@mail.com</h5>
            <a href="mailto:mail@mail.com" target="_blank" rel="noreferrer">
              Send a message
            </a>
          </article>
          <article className="contact__option">
            <AiFillFacebook className="contact__option-icon" />
            <h4>Facebook</h4>
            <h5>360mind</h5>
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              Send a message
            </a>
          </article>
        </div>
        {/*form*/}
        <form ref={form} onSubmit={sendEmail}>
          <input
            type="text"
            name="name"
            placeholder="Your full name"
            required
          />
          <input type="email" name="email" placeholder="Your e-mail" required />
          <textarea
            name="message"
            rows="7"
            placeholder="Your message"
            required
          />
          <button type="submit" className="btn btn-primary">
            Send message
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;
