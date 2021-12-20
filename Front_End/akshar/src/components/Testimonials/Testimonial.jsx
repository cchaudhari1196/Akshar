import React from "react";
import Carousel from "react-bootstrap/Carousel";

import { testimonialsData } from "./../../Assets/data/testimonialsData";
import SingleTestimonial from "./SingleTestimonial";

class Testimonial extends React.Component {
  states = {
    index: 0,
  };
  handleSelect = (selectedIndex, e) => {
    this.setState({ index: this.states.index++ });
  };

  render() {
    return (
      <div>
        <Carousel
          activeIndex={this.states.index}
          onSelect={this.handleSelect}
          interval={1500}
        >
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
