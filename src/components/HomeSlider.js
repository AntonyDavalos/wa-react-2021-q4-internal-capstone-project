import React, { useState } from "react";

// CSS
import "../styles/HomeSlider.css";

// Components
import BannerComponent from "./BannerComponent";

const HomeSlider = function HomeSlider({ banners, length }) {
  const [current, setCurrent] = useState(0);
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  setTimeout(() => {
    const slider = document.getElementById("home-carrousel");

    if (!slider) {
      return;
    }
    nextSlide();
  }, 20000);

  return (
    <section className="Slider" id="home-carrousel">
      {banners.map((slide, index) => (
        <div
          className={index === current ? "slide active" : "slide"}
          key={`Slide ${slide.title}`}
        >
          {index === current && (
            <div>
              <BannerComponent banner={slide} index={index} />
            </div>
          )}
        </div>
      ))}
    </section>
  );
};

export default HomeSlider;
