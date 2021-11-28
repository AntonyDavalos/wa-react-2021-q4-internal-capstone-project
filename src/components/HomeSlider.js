import React, { useState } from "react";

//Components
import BannerComponent from "./BannerComponent";

const HomeSlider = ({ banners }) => {
  const [current, setCurrent] = useState(0);
  const length = banners.length;
  const nextSlide = () => {
    setCurrent(current === length - 1 ? 0 : current + 1);
  };

  setTimeout(() => {
    var slider = document.getElementById("home-carrousel");

    if (!slider) {
      return;
    }
    nextSlide();
  }, 20000);

  return (
    <section className="Slider" id="home-carrousel">
      {banners.map((slide, index) => {
        return (
          <div
            className={index === current ? "slide active" : "slide"}
            key={index}
          >
            {index === current && (
              <div>
                <BannerComponent banner={slide} index={index} />
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
};

export default HomeSlider;
