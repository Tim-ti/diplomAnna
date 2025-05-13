import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Box,
  IconButton,
  Button,
  Paper,
} from '@mui/material';
import {
  FavoriteBorder as FavoriteIcon,
  Favorite as FavoriteFilledIcon,
} from '@mui/icons-material';
import { products } from '../data/products';
import { useFavorites } from '../context/FavoritesContext';

function ProductPage() {
  const { id } = useParams();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const [selectedMedia, setSelectedMedia] = useState('image');

  const product = products[id];

  if (!product) {
    return (
      <Container>
        <Typography variant="h4">Продукт не найден</Typography>
      </Container>
    );
  }

  const isFavorite = favorites.includes(product.id);

  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product.id);
    }
  };

  // Проверяем наличие медиафайлов
  const hasVideo = product.video && product.video.trim() !== '';
  const hasAdditionalImages = product.additionalImages && product.additionalImages.length > 0;

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid container spacing={4}>
        {/* Left column - Media */}
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 2 }}>
            {selectedMedia === 'video' && hasVideo ? (
              <Box
                component="video"
                controls
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '500px',
                  objectFit: 'contain',
                }}
              >
                <source src={product.video} type="video/mp4" />
                Your browser does not support the video tag.
              </Box>
            ) : selectedMedia.startsWith('additional-') ? (
              <Box
                component="img"
                src={product.additionalImages[parseInt(selectedMedia.split('-')[1])]}
                alt={product.title}
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '500px',
                  objectFit: 'contain',
                }}
              />
            ) : (
              <Box
                component="img"
                src={product.image}
                alt={product.title}
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '500px',
                  objectFit: 'contain',
                }}
              />
            )}
            
            {/* Media selection */}
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Paper
                elevation={selectedMedia === 'image' ? 3 : 1}
                sx={{
                  cursor: 'pointer',
                  p: 1,
                  border: selectedMedia === 'image' ? '2px solid #2c387e' : 'none',
                }}
                onClick={() => setSelectedMedia('image')}
              >
                <Box
                  component="img"
                  src={product.image}
                  alt="main"
                  sx={{ width: 80, height: 80, objectFit: 'cover' }}
                />
              </Paper>
              
              {hasVideo && (
                <Paper
                  elevation={selectedMedia === 'video' ? 3 : 1}
                  sx={{
                    cursor: 'pointer',
                    p: 1,
                    border: selectedMedia === 'video' ? '2px solid #2c387e' : 'none',
                  }}
                  onClick={() => setSelectedMedia('video')}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 80,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#f5f5f5',
                    }}
                  >
                    <Typography variant="body2" align="center">
                      Видео
                    </Typography>
                  </Box>
                </Paper>
              )}

              {hasAdditionalImages && product.additionalImages.map((img, index) => (
                <Paper
                  key={index}
                  elevation={selectedMedia === `additional-${index}` ? 3 : 1}
                  sx={{
                    cursor: 'pointer',
                    p: 1,
                    border: selectedMedia === `additional-${index}` ? '2px solid #2c387e' : 'none',
                  }}
                  onClick={() => setSelectedMedia(`additional-${index}`)}
                >
                  <Box
                    component="img"
                    src={img}
                    alt={`additional-${index + 1}`}
                    sx={{ width: 80, height: 80, objectFit: 'cover' }}
                  />
                </Paper>
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Right column - Product Info */}
        <Grid item xs={12} md={5}>
          <Box sx={{ position: 'sticky', top: 20 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h4" component="h1" gutterBottom>
                {product.title}
              </Typography>
              <IconButton
                onClick={handleFavoriteClick}
                color="secondary"
                sx={{ width: 48, height: 48 }}
              >
                {isFavorite ? <FavoriteFilledIcon /> : <FavoriteIcon />}
              </IconButton>
            </Box>

            <Typography variant="body1" sx={{ mt: 3 }}>
              {product.description}
            </Typography>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Характеристики:
              </Typography>
              <ul>
                {product.specs.map((spec, index) => (
                  <Typography
                    key={index}
                    component="li"
                    variant="body1"
                    sx={{ mb: 1 }}
                  >
                    {spec}
                  </Typography>
                ))}
              </ul>
            </Box>

            <Button
              variant="contained"
              color="secondary"
              size="large"
              fullWidth
              sx={{ mt: 4 }}
              onClick={handleFavoriteClick}
            >
              {isFavorite ? 'Убрать из избранного' : 'Добавить в избранное'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductPage; 