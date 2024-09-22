import React, { useState, useRef } from "react";
import styles from "./sliderCourse.module.scss";
import banner1 from "../../../../assets/banner1.png";
import banner2 from "../../../../assets/banner2.png";
import banner3 from "../../../../assets/banner3.png";

const images = [banner1, banner2, banner3];

const SliderCourse = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const touchStartX = useRef(0);
    const touchEndX = useRef(0);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex(
            (prevIndex) => (prevIndex - 1 + images.length) % images.length
        );
    };

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        touchEndX.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
        if (touchStartX.current - touchEndX.current > 50) {
            nextSlide();
        } else if (touchStartX.current - touchEndX.current < -50) {
            prevSlide();
        }
    };

    return (
        <div
            className={styles.slider}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}>
            <button onClick={prevSlide} className={styles.leftArrow}>
                ❮
            </button>
            <img
                src={images[currentIndex]}
                alt={`Slide ${currentIndex}`}
                className={styles.slide}
            />
            <button onClick={nextSlide} className={styles.rightArrow}>
                ❯
            </button>
        </div>
    );
};

export default SliderCourse;