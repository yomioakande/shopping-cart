import Rating from '@mui/material/Rating';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import Link from 'next/link';
import Tooltip from '@mui/material/Tooltip';
import { formatPrice, randomRating, randomReviews } from '../utils';
import toast, { Toaster } from 'react-hot-toast';

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

  const successToast = (message) => toast.success(message);

  return (
    <div className="product-container">
      <div className="product-img">
        <Link href={`/products/${productId}`} passHref>
          <img src={img} alt={productName} loading="lazy" />
        </Link>
        <ul className="product-img-overlay">
          <Tooltip title="Wishlist">
            <li
              onClick={() =>
                successToast(`${productName} Successfully added to Wishlist`)
              }
            >
              <FavoriteBorderIcon />
            </li>
          </Tooltip>
          <Tooltip title="Compare">
            <li
              onClick={() =>
                successToast(`${productName} Successfully added to Compare`)
              }
            >
              <CompareArrowsIcon />
            </li>
          </Tooltip>
        </ul>
      </div>
      <Link href={`/products/${productId}`} passHref>
        <div className="product-info">
          <div className="product-name">{productName}</div>
          <div className="rating">
            <Rating
              value={Number(randomRating())}
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

      <Toaster
        toastOptions={{
          success: {
            duration: 4000,
            style: {
              background: '#4bb543',
              color: '#fff'
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#4bb543'
            },
            icon: '👏'
          },
          error: {
            duration: 4000,
            style: {
              background: '#dd3939',
              color: '#fff'
            },
            iconTheme: {
              primary: '#fff',
              secondary: '#dd3939'
            }
          }
        }}
      />
    </div>
  );
};

export default ProductCard;
