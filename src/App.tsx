
import Drawer from '@material-ui/core/Drawer';
import LinearProgress from '@material-ui/core/LinearProgress';
import Grid from '@material-ui/core/Grid';
import AddShoppingCartIcon from '@material-ui/icons'
import { StringLiteralLike } from 'typescript';
import { useQuery } from 'react-query';

import { Wrapper } from './App.styles';
import Item from './components/item/index';

export type CartItemType = {
  id: number;
  category: string;
  description: string;
  image: string;
  price: number;
  title: string;
  amount: number;
};

const getProducts = async (): Promise<CartItemType[]> => await (await fetch('https://fakestoreapi.com/products')).json();

function App() {
  const { data, isLoading, error } =useQuery<CartItemType[]>('products', getProducts);


// const getTotalItems = () => null;
const handleAddItem = (clickedItem: CartItemType ) => '';
// const handleRemoveItem = () => null;

if(isLoading) return  <LinearProgress />;
if(error) return <div>Something is wrong...</div>
  console.log(data, 'data')
  return (
   <Wrapper>
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
