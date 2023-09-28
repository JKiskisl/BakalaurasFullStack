import React from "react";
import "./whyus.css";

const Whyus = () => {
  const reviews = [
    {
      name: "John Doe",
      review:
        "I absolutely love this product! It has exceeded my expectations and I can't imagine my life without it. Highly recommended!",
    },
    {
      name: "Jane Smith",
      review:
        "This product has made a significant difference in my daily routine. It's easy to use and has improved my productivity. I'm very satisfied!",
    },
    {
      name: "Mike Johnson",
      review:
        "I've tried many similar products in the past, but this one stands out from the rest. It's reliable, durable, and offers great value for the price. I'm a happy customer!",
    },
    {
      name: "Emily Thompson",
      review:
        "I've been using this product for a month now, and I'm impressed with the results. It has helped me save time and effort. I highly recommend it to everyone!",
    },
    {
      name: "David Wilson",
      review:
        "After trying several alternatives, I finally found this product, and it's exactly what I needed. The quality is top-notch, and the customer service is excellent. Thumbs up!",
    },
    {
      name: "Sarah Adams",
      review:
        "I'm a long-time user of this product, and it never disappoints. It's user-friendly, packed with useful features, and the price is unbeatable. I'm a loyal customer for life!",
    },
    {
      name: "Mark Davis",
      review:
        "I recently purchased this product and it has been a game-changer for me. It's incredibly intuitive to use and has greatly improved my efficiency. I highly recommend it!",
    },
    {
      name: "Jessica Anderson",
      review:
        "I've been using this product for a few weeks now, and I'm thoroughly impressed. It has exceeded my expectations in terms of functionality and performance. It's a must-have for anyone looking to streamline their workflow!",
    },
    {
      name: "Chris Roberts",
      review:
        "I stumbled upon this product while searching for a solution to my problem, and I'm so glad I did. It's been a game-changer for me. The quality is outstanding, and it's incredibly user-friendly. I can't recommend it enough!",
    },
  ];

  const firstSet = reviews.slice(0, 3);
  const secondSet = reviews.slice(3, 6);
  const thirdSet = reviews.slice(6, 9);

  return (
    <section id="whyus">
      <h5>Learn</h5>
      <h2>Why us</h2>
      <div className="reviews-container">
        <div className="review-set">
          {firstSet.map((review, index) => (
            <div key={index} className="review">
              <h3>{review.name}</h3>
              <p>{review.review}</p>
            </div>
          ))}
        </div>
        <div className="review-set">
          {secondSet.map((review, index) => (
            <div key={index} className="review">
              <h3>{review.name}</h3>
              <p>{review.review}</p>
            </div>
          ))}
        </div>
        <div className="review-set">
          {thirdSet.map((review, index) => (
            <div key={index} className="review">
              <h3>{review.name}</h3>
              <p>{review.review}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Whyus;
