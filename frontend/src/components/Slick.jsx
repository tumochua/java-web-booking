import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { ImageList, ImageListItem } from "@mui/material";
function PauseOnHover() {
    const settings = {
        dots: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        pauseOnHover: true
    };

    const imgSlick = [
        "https://cdn.bookingcare.vn/fo/w1920/2023/10/10/163557-dat-lich-cham-soc-wecare247.png",
        "https://cdn.bookingcare.vn/fo/w1920/2023/09/07/141422-144204-dat-lich-kham-bookingcare-pharmacity.jpg",
    ]

    return (
        <div className="slider-container">
            <Slider {...settings}>
                {/* {imgSlick.map((item, index) => (
                    <div>
                        <img
                            src={`${item}`}
                            alt="img slick"
                            loading="lazy"
                        />
                    </div>
                ))} */}
                {imgSlick.map((item, index) => (
                    <ImageList key={index}>
                        <ImageListItem>
                            <img
                                src={`${item}`}
                                alt="img slick"
                                loading="lazy"
                            />
                        </ImageListItem>
                    </ImageList>
                ))}


            </Slider>
        </div>
    );
}

export default PauseOnHover;
