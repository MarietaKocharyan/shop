import Button from '@mui/material/Button';

import {CartItemType} from '../../App';
import {Wrapper } from './index.styles';

type Props = {
    item: CartItemType;
    handleAddItem: (clickedItem: CartItemType) => void;

}

const Item: React.FC<Props> = ({item, handleAddItem}) => (
    <Wrapper> 
        <img src={item.image} alt={item.title} />
        <div>
            {console.log(item)}
            <h2>
                {item.title}
            </h2>
            <p>{item.description}</p>
            <h3>${item.price}</h3> 
            <Button onClick={() => handleAddItem(item)} >Add to cart </Button>
        </div>
    </Wrapper>
);

export default Item;