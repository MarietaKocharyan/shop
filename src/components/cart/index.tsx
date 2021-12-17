import { CartItemType } from '../../types/index';
import { Wrapper } from './index.styles';
import CartItem from './cartItem';

type Props = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};

const Cart: React.FC<Props> = ({ cartItems, addToCart, removeFromCart }) => {
  const calculateTotal = (items: CartItemType[]) =>
    items.reduce((num: number, item) => num + item.amount * item.price, 0);

  return (
    <Wrapper>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 && <p>No items in cart.</p>}
      {cartItems.map(item => (
        <CartItem key={item.id} item={item} addToCart={addToCart} removeFromCart={removeFromCart}/>
      ))}
      {cartItems.length !== 0 && <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>}
    </Wrapper>
  );
};

export default Cart;
