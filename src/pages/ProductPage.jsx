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
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import {
  FavoriteBorder as FavoriteIcon,
  Favorite as FavoriteFilledIcon,
} from '@mui/icons-material';
import { products } from '../data/products';
import { useFavorites } from '../context/FavoritesContext';
import VideoPlayer from '../components/VideoPlayer';
import ModelViewer from '../components/ModelViewer';

function ProductPage() {
  const { id } = useParams();
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
  const [selectedMedia, setSelectedMedia] = useState('image');
  const [cooktopType, setCooktopType] = useState('gas');

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

  const handleCooktopTypeChange = (event, newType) => {
    if (newType !== null) {
      setCooktopType(newType);
    }
  };

  // Проверяем наличие медиафайлов
  const hasVideo = product.video && product.video.trim() !== '';
  const hasAdditionalImages = product.additionalImages && (
    Array.isArray(product.additionalImages) ? product.additionalImages.length > 0 : 
    typeof product.additionalImages === 'object'
  );
  const hasModel = product.models ? product.models[cooktopType] : (product.model && product.model.trim() !== '');
  const modelUrl = product.models ? product.models[cooktopType] : product.model;
  const specs = Array.isArray(product.specs) ? product.specs : 
    (typeof product.specs === 'object' ? product.specs[cooktopType] : []);
  const imageUrl = product.images ? product.images[cooktopType] : product.image;
  const additionalImageUrl = product.additionalImages ? 
    (typeof product.additionalImages === 'object' ? product.additionalImages[cooktopType] : product.additionalImages[0]) : 
    null;

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={4}>
        {/* Left column - Media */}
        <Grid item xs={12} md={7}>
          <Paper sx={{ p: 2 }}>
            {selectedMedia === 'image' && (
              <Box
                component="img"
                src={imageUrl}
                alt={product.title}
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '500px',
                  objectFit: 'contain',
                }}
              />
            )}

            {selectedMedia === 'video' && hasVideo && (
              <VideoPlayer src={product.video} fallbackImage={imageUrl} />
            )}

            {selectedMedia === '3d' && hasModel && (
              <ModelViewer modelUrl={modelUrl} />
            )}

            {selectedMedia === 'additional' && hasAdditionalImages && additionalImageUrl && (
              <Box
                component="img"
                src={additionalImageUrl}
                alt="Additional"
                sx={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '500px',
                  objectFit: 'contain',
                }}
              />
            )}

            {/* Cooktop type selector */}
            {product.models && (
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                <ToggleButtonGroup
                  value={cooktopType}
                  exclusive
                  onChange={handleCooktopTypeChange}
                  aria-label="тип варочной панели"
                >
                  <ToggleButton value="gas" aria-label="газовая">
                    Газовая
                  </ToggleButton>
                  <ToggleButton value="induction" aria-label="индукционная">
                    Индукционная
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
            )}

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
                  src={imageUrl}
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

              {hasModel && (
                <Paper
                  elevation={selectedMedia === '3d' ? 3 : 1}
                  sx={{
                    cursor: 'pointer',
                    p: 1,
                    border: selectedMedia === '3d' ? '2px solid #2c387e' : 'none',
                  }}
                  onClick={() => setSelectedMedia('3d')}
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
                      3D Модель
                    </Typography>
                  </Box>
                </Paper>
              )}

              {hasAdditionalImages && additionalImageUrl && (
                <Paper
                  elevation={selectedMedia === 'additional' ? 3 : 1}
                  sx={{
                    cursor: 'pointer',
                    p: 1,
                    border: selectedMedia === 'additional' ? '2px solid #2c387e' : 'none',
                  }}
                  onClick={() => setSelectedMedia('additional')}
                >
                  <Box
                    component="img"
                    src={additionalImageUrl}
                    alt="additional"
                    sx={{ width: 80, height: 80, objectFit: 'cover' }}
                  />
                </Paper>
              )}
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
                {Array.isArray(specs) && specs.map((spec, index) => (
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