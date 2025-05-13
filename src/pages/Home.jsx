import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Container, Typography, Button } from '@mui/material';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { products } from '../data/products';

const featuredProducts = Object.values(products);

function Home() {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: true,
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ width: '100%', position: 'relative' }}>
        <Slider {...settings}>
          {featuredProducts.map((product) => (
            <Box
              key={product.id}
              sx={{
                position: 'relative',
                height: '600px',
                backgroundColor: '#2c387e',
                color: 'white',
                cursor: 'pointer',
                display: 'flex !important',
                alignItems: 'center',
                padding: '0 48px',
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography variant="h2" component="h1" gutterBottom>
                  {product.title}
                </Typography>
                <Typography variant="h5" gutterBottom>
                  {product.description}
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  sx={{ mt: 3 }}
                  onClick={() => handleProductClick(product.id)}
                >
                  Подробнее
                </Button>
              </Box>
              <Box
                sx={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '500px',
                }}
              >
                <Box
                  component="video"
                  autoPlay
                  muted
                  loop
                  playsInline
                  sx={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                  }}
                >
                  <source src={product.video} type="video/mp4" />
                  <img
                    src={product.image}
                    alt={product.title}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'contain',
                    }}
                  />
                </Box>
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>
    </Container>
  );
}

export default Home; 