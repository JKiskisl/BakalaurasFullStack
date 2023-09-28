import React from "react";
import "./team.css";
import IMG from "../../assets/testing.jpg";

const data = [
  {
    id: 1,
    image: IMG,
    title: "Info about team member",
    linkedin: "https://www.linkedin.com",
  },
  {
    id: 2,
    image: IMG,
    title: "Info about team member",
    linkedin: "https://www.linkedin.com",
  },
  {
    id: 3,
    image: IMG,
    title: "Info about team member",
    linkedin: "https://www.linkedin.com",
  },
  {
    id: 4,
    image: IMG,
    title: "Info about team member",
    linkedin: "https://www.linkedin.com",
  },
  {
    id: 5,
    image: IMG,
    title: "Info about team member",
    linkedin: "https://www.linkedin.com",
  },
  {
    id: 6,
    image: IMG,
    title: "Info about team member",
    linkedin: "https://www.linkedin.com",
  },
  {
    id: 7,
    image: IMG,
    title: "Info about team member",
    linkedin: "https://www.linkedin.com",
  },
  {
    id: 8,
    image: IMG,
    title: "Info about team member",
    linkedin: "https://www.linkedin.com",
  },
  {
    id: 9,
    image: IMG,
    title: "Info about team member",
    linkedin: "https://www.linkedin.com",
  },
  {
    id: 10,
    image: IMG,
    title: "Info about team member",
    linkedin: "https://www.linkedin.com",
  },
];

const Team = () => {
  return (
    <section id="team">
      <h5>Meet our</h5>
      <h2>Team</h2>
      <div className="container team__container">
        {data.map(({ id, image, title, linkedin }) => {
          return (
            <article className="team__item">
              <div className="team__item-image">
                <img src={image} alt="" />
                <div className="team__item-overlay">
                  <h3>{title}</h3>
                  <a href={linkedin}>Linkedin</a>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
};

export default Team;
