import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom"; // Import NavLink or Link from react-router-dom
import { apiGetProfile } from "../services/doctorService";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Box, IconButton, Typography } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
    responsive: [
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                dots: true
            }
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 1
            }
        }
    ]
};

function DoctorSlick() {
    const sliderRef = useRef(null);

    const [doctorsData, setDoctorsData] = useState([])

    useEffect(() => {
        try {
            (async () => {
                const res = await apiGetProfile();
                //console.log(res);
                if (res?.data?.code === 1000) {
                    setDoctorsData(res?.data?.result)
                }
            })();
        } catch (error) {
            console.log(error);
        }
    }, []);

    const nextSlide = () => {
        if (sliderRef.current) {
            sliderRef.current.slickNext();
        }
    };

    const prevSlide = () => {
        if (sliderRef.current) {
            sliderRef.current.slickPrev();
        }
    };

    const handleDoctorClick = (userId) => {
        console.log("Clicked doctor with userId:", userId);
        // You can navigate to the detail page of the doctor using React Router
    };

    return (
        <Box sx={{
            margin: '0 auto',
            backgroundColor: '#f0f0f0', // Màu nền của Slider
            padding: '20px',
            borderRadius: '8px',
            position: 'relative',
        }}>
            <Slider ref={sliderRef} {...settings} sx={{ marginBottom: '20px' }}>
                {doctorsData && doctorsData.map((doctor) => (
                    <Box key={doctor?.id} sx={{ padding: '0 10px' }}>
                        <Link to={`/detail-doctor/${doctor?.id}?value=${doctor?.user?.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            {/* </Link><Link to={`/detail-doctor/${doctor?.user?.id}`} style={{ textDecoration: 'none', color: 'inherit' }}> */}
                            <img
                                src={doctor.imageLink}
                                alt={doctor.userNameDetail}
                                style={{ width: '100%', borderRadius: '8px' }}
                                onClick={() => handleDoctorClick(doctor.id)}
                            />
                            <Typography variant="h6" mt={1} mb={1}>{doctor?.userNameDetail}</Typography>
                            <Typography variant="body2" color="text.secondary">{doctor?.specialization}</Typography>
                        </Link>
                    </Box>
                ))}
            </Slider>
            <IconButton onClick={nextSlide} style={{ position: 'absolute', right: 10, top: '50%', transform: 'translateY(-50%)', backgroundColor: '#4CAF50', color: 'white' }}>
                <NavigateNextIcon />
            </IconButton>
            <IconButton onClick={prevSlide} style={{ position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)', backgroundColor: '#f44336', color: 'white' }}>
                <ArrowBackIcon />
            </IconButton>
        </Box>
    );
}

export default DoctorSlick;
