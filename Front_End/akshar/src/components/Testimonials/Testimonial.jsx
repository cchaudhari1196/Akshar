import React from "react";
import Carousel from "react-bootstrap/Carousel";

import { testimonialsData } from "./../../Assets/data/testimonialsData";
import SingleTestimonial from "./SingleTestimonial";

class Testimonial extends React.Component {
  render() {
    return (
      <div>
        <Carousel interval={1500}>
          {testimonialsData.map(({ id, title, text, image, name }) => (
            <Carousel.Item key={id}>
              <SingleTestimonial
                id={id}
                name={name}
                title={title}
                image={image}
                text={text}
              ></SingleTestimonial>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    );
  }
}

export default Testimonial;
