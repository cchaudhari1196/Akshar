import React, { useContext } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import { ThemeContext } from "../../contexts/ThemeContext";
import "./Testimonials.css";

function SingleTestimonial({ id, title, text, image, name }) {
  const { theme } = useContext(ThemeContext);

  return (
    <>
      <div className="testimonials" style={{ backgroundColor: theme.primary }}>
        <div className="testimonials--header">
          <h1 style={{ color: theme.secondary }}>Testimonials</h1>
        </div>
        <div className="testimonials--body">
          <FaQuoteLeft className="quote" style={{ color: theme.secondary }} />
          <div
            className="testimonials--slider"
            style={{ backgroundColor: theme.primary }}
          >
            <div className="single--testimony" key={id}>
              <div className="testimonials--container">
                <div
                  className="review--img"
                  style={{ backgroundColor: theme.secondary }}
                >
                  <img src={image} alt={name} />
                </div>
                <div
                  className="review--content"
                  style={{
                    backgroundColor: theme.secondary,
                    color: theme.tertiary,
                  }}
                >
                  <p>{text}</p>
                  <h1>{name}</h1>
                  <h4>{title}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleTestimonial;
