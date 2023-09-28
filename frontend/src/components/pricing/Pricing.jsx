import React from "react";
import { BiCheck } from "react-icons/bi";
import "./pricing.css";

const Pricing = () => {
  return (
    <section id="pricing">
      <h5>Our pricing</h5>
      <h2>Plans</h2>

      <div className="container pricing__container">
        <article className="pricing">
          <div className="pricing__head">
            <h3>Base plan</h3>
          </div>
          <ul className="pricing__list">
            <li>
              <BiCheck className="pricing__list-icon" />
              <p>Goal tracking</p>
            </li>
            <li>
              <BiCheck className="pricing__list-icon" />
              <p>Mood journal</p>
            </li>
            <li>
              <BiCheck className="pricing__list-icon" />
              <p>Task management</p>
            </li>
            <li>
              <BiCheck className="pricing__list-icon" />
              <p>Basic analytics</p>
            </li>
            <li>
              <BiCheck className="pricing__list-icon" />
              <p>$9.99/month</p>
            </li>
          </ul>
        </article>

        {/* end of base plan */}
        <article className="pricing">
          <div className="pricing__head">
            <h3>Upgraded plan</h3>
          </div>
          <ul className="pricing__list">
            <li>
              <BiCheck className="pricing__list-icon" />
              <p>All Base Plan features</p>
            </li>
            <li>
              <BiCheck className="pricing__list-icon" />
              <p>Advanced analytics</p>
            </li>
            <li>
              <BiCheck className="pricing__list-icon" />
              <p>Priority support</p>
            </li>
            <li>
              <BiCheck className="pricing__list-icon" />
              <p>Customizable reminders</p>
            </li>
            <li>
              <BiCheck className="pricing__list-icon" />
              <p>$19.99/month</p>
            </li>
          </ul>
        </article>

        {/* end of upgraded plan */}
        <article className="pricing">
          <div className="pricing__head">
            <h3>All in plan</h3>
          </div>
          <ul className="pricing__list">
            <li>
              <BiCheck className="pricing__list-icon" />
              <p>All Upgraded Plan features</p>
            </li>
            <li>
              <BiCheck className="pricing__list-icon" />
              <p>Sleep tracker</p>
            </li>
            <li>
              <BiCheck className="pricing__list-icon" />
              <p>Stress reduction exercises</p>
            </li>
            <li>
              <BiCheck className="pricing__list-icon" />
              <p>Premium content library</p>
            </li>
            <li>
              <BiCheck className="pricing__list-icon" />
              <p>$29.99/month</p>
            </li>
          </ul>
        </article>
      </div>
    </section>
  );
};

export default Pricing;
