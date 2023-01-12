import Rating from '@mui/material/Rating';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import Link from 'next/link';
import Tooltip from '@mui/material/Tooltip';
import { formatPrice, randomRating, randomReviews } from '../utils';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { Fragment, useState } from 'react';

const ProductCard = ({ product }) => {
  const {
    productName,
    productId,
    img,
    minRecipientDenomination: minD,
    maxRecipientDenomination: maxD,
    fixedSenderDenominations: fd
  } = product;

  const price = formatPrice(minD, maxD, fd);

  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleClick = (name, action) => {
    setOpen(true);
    setMessage(`"${name}" Added to ${action}`);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const action = (
    <Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Fragment>
  );

  return (
    <div className="product-container">
      <div className="product-img">
        <Link href={`/products/${productId}`}>
          <img src={img} alt={productName} loading="lazy" />
        </Link>
        <ul className="product-img-overlay">
          <Tooltip title="Wishlist">
            <li onClick={() => handleClick(productName, 'Wishlist')}>
              <FavoriteBorderIcon />
            </li>
          </Tooltip>
          <Tooltip title="Compare">
            <li onClick={() => handleClick(productName, 'Compare')}>
              <CompareArrowsIcon />
            </li>
          </Tooltip>
        </ul>
      </div>
      <Link href={`/products/${productId}`}>
        <div className="product-info">
          <div className="product-name">{productName}</div>
          <div className="rating">
            <Rating
              defaultValue={randomRating}
              precision={0.5}
              size="small"
              readOnly
            />
            <p>({randomReviews()})</p>
          </div>
          <div className="product-price">
            {price.D2 ? (
              <>
                {price.D1}
                <span>.{price.C1}</span> - {price.D2}
                <span>.{price.C2}</span>
              </>
            ) : (
              <>
                {price.D1}
                <span>.{price.C1}</span>
              </>
            )}
          </div>
        </div>
      </Link>

      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={12000}
        onClose={handleClose}
        message={message}
        action={action}
      />
    </div>
  );
};

export default ProductCard;
