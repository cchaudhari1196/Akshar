import React, { useState } from "react";
import Carousel from "react-bootstrap/Carousel";

function ControlledCarousel({ data }) {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const PictureSizer = (img) => {
    return (
      <img
        // maxWidth={"100%"}
        // maxHeight={"500px"}
        src={img}
        alt="Type something descriptive"
      />
    );
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} interval={2000}>
      {data.map((item, index) => (
        <Carousel.Item key={index}>
          <img className="d-block w-100" src={item.address} alt="{item.name}" />
          <Carousel.Caption>
            <h3>{item.header}</h3>
            <p>{item.subHeader}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default ControlledCarousel;

//DATA FORMAT

// const carouselData = [
//     {
//       id: 1,
//       url: "https://cdn.pixabay.com/photo/2017/06/01/22/42/chain-2364830__340.jpg",
//       name: "abstarctImage",
//       header: "Look at the chain",
//       subHeader: "Its lloking like someone got eyes oon that thing.",
//     },
//     {
//       id: 2,
//       url: "https://cdn.pixabay.com/photo/2016/02/28/12/55/boy-1226964__340.jpg",
//       name: "boyImage",
//       header: "Boy looking cute",
//       subHeader:
//         "Its a image of boy who is waitng for his father to come home.",
//     }
//   ];
