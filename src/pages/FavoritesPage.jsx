import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  IconButton,
  Box,
} from '@mui/material';
import { Favorite as FavoriteFilledIcon } from '@mui/icons-material';
import { products } from '../data/products';
import { useFavorites } from '../context/FavoritesContext';

function FavoritesPage() {
  const { favorites, removeFromFavorites } = useFavorites();
  const navigate = useNavigate();

  const favoriteProducts = favorites.map(id => products[id]).filter(Boolean);

  if (favoriteProducts.length === 0) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, minHeight: '60vh' }}>
        <Typography variant="h4" gutterBottom align="center">
          Избранные товары
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mt: 4 }}>
          У вас пока нет избранных товаров
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
          <Button variant="contained" color="primary" onClick={() => navigate('/')}>
            Перейти к каталогу
          </Button>
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Избранные товары
      </Typography>
      <Grid container spacing={4}>
        {favoriteProducts.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Card 
              sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative'
              }}
            >
              <CardMedia
                component="img"
                sx={{
                  height: 200,
                  objectFit: 'contain',
                  cursor: 'pointer'
                }}
                image={product.image}
                alt={product.title}
                onClick={() => navigate(`/product/${product.id}`)}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h6" component="h2">
                  {product.title}
                </Typography>
                <Typography color="text.secondary">
                  {product.description}
                </Typography>
                <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                  {product.price}
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ textDecoration: 'line-through', opacity: 0.7 }}
                >
                  {product.oldPrice}
                </Typography>
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  onClick={() => navigate(`/product/${product.id}`)}
                >
                  Подробнее
                </Button>
                <IconButton
                  color="secondary"
                  onClick={() => removeFromFavorites(product.id)}
                  sx={{ ml: 'auto' }}
                >
                  <FavoriteFilledIcon />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default FavoritesPage; 