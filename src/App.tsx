import { useState } from 'react';
import { useQuery } from 'react-query';

import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import { CartItemType } from './types/index';
import Cart from './components/cart/index';
import Item from './components/item/index';

import { Wrapper, StyledButton } from './App.styles';


const getProducts = async (): Promise<CartItemType[]> => await (await fetch('https://fakestoreapi.com/products')).json();

function App() {
  const [openCart, setOpenCart] = useState(false);
  const [itemInCart, setItemInCart] = useState([] as CartItemType[]);

  const { data, isLoading, error } =useQuery<CartItemType[]>('products', getProducts);


  const getTotalItems = (items: CartItemType[]) => items.reduce((num: number, item) => num + item.amount, 0)

  const handleAddItem = (clickedItem: CartItemType ) => {
    setItemInCart(prev => { 
      const isItemInCart = prev.find(item => item.id === clickedItem.id);
      if(isItemInCart){
        return prev.map(item =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      return [...prev, { ...clickedItem, amount: 1 }];
    })
  };

  const handleRemoveItem = (id: number) => {
    setItemInCart(prev =>
      prev.reduce((num, item) => {
        if (item.id === id) {
          if (item.amount === 1) return num;
          return [...num, { ...item, amount: item.amount - 1 }];
        } else {
          return [...num, item];
        }
      }, [] as CartItemType[])
    );
  };

  if(isLoading) return  <LinearProgress />;
  if(error) return <div>Something is wrong...</div>
    console.log(data, 'data')
    return (
    <Wrapper>
      <Drawer anchor='right' open={openCart} onClose={() => setOpenCart(false)}>
      <Cart cartItems={itemInCart} addToCart={handleAddItem} removeFromCart={handleRemoveItem}/>      </Drawer>
      <StyledButton onClick={()=> setOpenCart(true)} >
        <Badge badgeContent={getTotalItems(itemInCart)} color="error">
        <ShoppingCartIcon />
        </Badge>
        </StyledButton>
        <Grid container spacing={3}>
        {data?.map(item => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddItem={handleAddItem} />
          </Grid>
        ))}
      </Grid>
      </Wrapper>
    );
}

export default App;
