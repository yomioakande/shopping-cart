import { Button } from '@mui/material';
import Image from 'next/image';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';

const CartItem = () => {
  return (
    <div className="cart-item-box">
      <div className="item-img">
        <Image src={'/images/Flowers.jpg'} alt="Product Image" fill />
      </div>
      <div className="item-info">
        <div className="info-top">
          <h5 className="item-name">
            SAMSUNG SWA-9200S Wireless Rear Speaker Kit, Upgrade Soundbar System
            to True Surround Sound Experience, 2022
          </h5>
          <h3 className="item-price">
            $9<span>99</span>
          </h3>
        </div>
        <p>If you are accessing images from a source</p>
        <div className="item-qty">
          <Button className="qty-btn">
            <RemoveIcon />
          </Button>
          <p className="qty">1</p>
          <Button className="qty-btn">
            <AddIcon />
          </Button>
        </div>
        <ul className="item-options">
          <li>
            <DeleteOutlineIcon /> Remove
          </li>
          <li>
            <FavoriteBorderIcon /> Wishlist
          </li>
          <li>
            <CompareArrowsIcon /> Compare
          </li>
        </ul>
      </div>
    </div>
  );
};

export default CartItem;
