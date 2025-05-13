import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Box,
  Menu,
  MenuItem,
  Button,
  Badge,
  styled,
  Drawer,
  Divider,
  Tooltip,
} from '@mui/material';
import {
  Search as SearchIcon,
  FavoriteBorder as FavoriteIcon,
  Favorite as FavoriteFilledIcon,
  Menu as MenuIcon,
  Instagram as InstagramIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Info as InfoIcon,
  Logout as LogoutIcon,
  More as MoreIcon,
} from '@mui/icons-material';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: 'rgba(255, 255, 255, 0.25)',
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'white',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
    '&::placeholder': {
      color: 'rgba(255, 255, 255, 0.7)',
      opacity: 1,
    },
  },
}));

const allowedSearchTerms = [
  'Стиральная машина',
  'Духовой шкаф',
  'Посудомоечная машина',
  'Варочная панель',
  'Вытяжка',
];

function Header() {
  const navigate = useNavigate();
  const { favorites } = useFavorites();
  const { user } = useAuth();
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [infoDrawerOpen, setInfoDrawerOpen] = useState(false);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
  };

  const filteredSearchTerms = allowedSearchTerms.filter(term =>
    term.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleInfoDrawer = () => {
    setInfoDrawerOpen(!infoDrawerOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Ошибка при выходе:', error);
    }
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ 
              display: { xs: 'none', sm: 'block' },
              cursor: 'pointer'
            }}
            onClick={() => navigate('/')}
          >
            Галерея бытовой техники
          </Typography>

          <Button
            color="inherit"
            onClick={handleMenuClick}
            startIcon={<MenuIcon />}
          >
            Каталог
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {allowedSearchTerms.map((term) => {
              const product = Object.values(products).find(p =>
                p.title.toLowerCase().includes(term.toLowerCase())
              );
              
              return (
                <MenuItem 
                  key={term} 
                  onClick={() => {
                    handleMenuClose();
                    if (product) {
                      navigate(`/product/${product.id}`);
                    }
                  }}
                >
                  {term}
                </MenuItem>
              );
            })}
            {user && (
              <MenuItem onClick={handleLogout}>
                <IconButton color="inherit" size="small">
                  <LogoutIcon />
                </IconButton>
                <Typography>Выйти</Typography>
              </MenuItem>
            )}
          </Menu>

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Поиск..."
              value={searchTerm}
              onChange={handleSearchChange}
              sx={{
                '& .MuiInputBase-input': {
                  color: 'inherit',
                  fontSize: '1rem',
                  fontWeight: 500
                }
              }}
            />
            {searchTerm && (
              <Box sx={{ 
                position: 'absolute', 
                bgcolor: 'background.paper', 
                width: '100%', 
                zIndex: 1,
                boxShadow: 3
              }}>
                {filteredSearchTerms.map(term => {
                  // Find matching product
                  const product = Object.values(products).find(p => 
                    p.title.toLowerCase().includes(term.toLowerCase())
                  );
                  
                  return (
                    <MenuItem 
                      key={term}
                      onClick={() => {
                        setSearchTerm(term);
                        if (product) {
                          navigate(`/product/${product.id}`);
                        }
                      }}
                      sx={{
                        fontSize: '0.9rem',
                        padding: '8px 16px',
                        color: 'black',
                        '&:hover': {
                          bgcolor: 'action.hover'
                        }
                      }}
                    >
                      {term}
                    </MenuItem>
                  );
                })}
              </Box>
            )}
          </Search>

          <Box sx={{ flexGrow: 1 }} />

          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
            <Typography variant="body1" sx={{ mr: 2 }}>
              {user && user.email}
            </Typography>
            <IconButton 
              color="inherit"
              onClick={() => navigate('/favorites')}
              sx={{ mr: 1 }}
            >
              <Badge badgeContent={favorites.length} color="secondary">
                {favorites.length > 0 ? <FavoriteFilledIcon /> : <FavoriteIcon />}
              </Badge>
            </IconButton>
            <IconButton color="inherit" disabled>
              <InstagramIcon />
            </IconButton>
            <IconButton color="inherit" disabled>
              <FacebookIcon />
            </IconButton>
            <IconButton color="inherit" disabled>
              <TwitterIcon />
            </IconButton>
            <IconButton 
              color="inherit"
              onClick={toggleInfoDrawer}
              sx={{ ml: 1 }}
            >
              <InfoIcon />
            </IconButton>
            {user && (
              <Tooltip title="Выйти">
                <IconButton 
                  color="inherit"
                  onClick={handleLogout}
                  sx={{ ml: 1 }}
                >
                  <LogoutIcon />
                </IconButton>
              </Tooltip>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={infoDrawerOpen}
        onClose={toggleInfoDrawer}
      >
        <Box
          sx={{
            width: 350,
            p: 3,
            height: '100%',
            backgroundColor: '#1a1a1a',
            color: 'white',
          }}
        >
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            О галерее
          </Typography>
          <Divider sx={{ mb: 3, backgroundColor: 'rgba(255,255,255,0.1)' }} />
          <Typography variant="body1" paragraph>
            "Виртуальная галерея бытовой техники в 3D формате" представляет современную платформу, 
            погружающую пользователей в уникальный виртуальный мир бытовой техники. Здесь каждый 
            посетитель может ознакомиться с трехмерными моделями самых популярных и инновационных 
            устройств для дома и кухни.
          </Typography>
          <Typography variant="body1" paragraph>
            Виртуальная галерея бытовой техники в 3D формате предлагает удобный и интуитивно понятный 
            интерфейс, который делает процесс выбора и покупки бытовой техники увлекательным и информативным. 
            Создайте свой идеальный домашний арсенал с помощью нашей уникальной виртуальной галереи 
            бытовой техники в 3D формате уже сегодня!
          </Typography>
        </Box>
      </Drawer>

      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        <IconButton
          size="large"
          aria-label="show more"
          aria-controls="menu-mobile"
          aria-haspopup="true"
          onClick={handleMenuClick}
          color="inherit"
        >
          <MoreIcon />
        </IconButton>
        <Menu
          id="menu-mobile"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {allowedSearchTerms.map((term) => {
            const product = Object.values(products).find(p =>
              p.title.toLowerCase().includes(term.toLowerCase())
            );
            
            return (
              <MenuItem 
                key={term} 
                onClick={() => {
                  handleMenuClose();
                  if (product) {
                    navigate(`/product/${product.id}`);
                  }
                }}
              >
                {term}
              </MenuItem>
            );
          })}
          {user && (
            <MenuItem onClick={handleLogout}>
              <IconButton color="inherit" size="small">
                <LogoutIcon />
              </IconButton>
              <Typography>Выйти</Typography>
            </MenuItem>
          )}
        </Menu>
      </Box>
    </>
  );
}

export default Header; 