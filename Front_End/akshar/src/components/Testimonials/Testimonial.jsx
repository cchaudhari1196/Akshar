import React from "react";
import Carousel from "react-bootstrap/Carousel";

import { testimonialsData } from "./../../Assets/data/testimonialsData";
import SingleTestimonial from "./SingleTestimonial";

class Testimonial extends React.Component {
  render() {
    return (
      <div>
        <Carousel interval={1500}>
          {this.props.list.map(({ id, reviewer, review, imageUrl, title }) => (
            <Carousel.Item key={id}>
              <SingleTestimonial
                id={id}
                name={reviewer}
                title={title}
                image={imageUrl}
                text={review}
              ></SingleTestimonial>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>
    );
  }
}

export default Testimonial;
