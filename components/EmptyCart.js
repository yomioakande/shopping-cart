import Link from 'next/link';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Button } from '@mui/material';

const EmptyCart = () => {
  return (
    <div className="empty-cart">
      <ShoppingCartOutlinedIcon />
      <h3>Your Cart is empty!</h3>
      <p>Start shopping to add products to your cart. </p>
      <Link href="/products" passHref>
        <Button className="empty-cart-btn">Start Shopping</Button>
      </Link>
    </div>
  );
};

export default EmptyCart;
