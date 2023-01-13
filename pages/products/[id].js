import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import { Layout } from '../../components/layout/WebsiteLayout';
import Grid from '@mui/system/Unstable_Grid/Grid';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Button, Rating } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ProductCard from '../../components/ProductCard';
import { useState, useEffect, useContext } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import {
  fetchProducts,
  formatPrice,
  randomRating,
  randomReviews
} from '../../utils';
import { Store } from '../../utils/Store';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

const ProductScreen = (props) => {
  const [products] = useState(props.products);
  const { state, dispatch } = useContext(Store);
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState();
  const [product, setProduct] = useState();
  const [ratings, setRatings] = useState(3);
  const [reviewCount, setReviewCount] = useState(123);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();
  const productId = router.query.id;

  useEffect(() => {
    const item = products.find(
      (item) => item.productId === parseInt(productId)
    );
    setProduct(item);
  }, [productId]);

  useEffect(() => {
    setRatings(randomRating);
    setReviewCount(randomReviews);
  }, []);

  if (!product) {
    return <div className="page-404">Product Not Found</div>;
  }

  const prices = formatPrice(
    product.minRecipientDenomination,
    product.maxRecipientDenomination,
    product.fixedSenderDenominations
  );

  const fd = product.fixedSenderDenominations;
  const unfixedAmount = [5, 10, 15, 25, 50, 100];

  const successToast = (message) => toast.success(message);
  const errorToast = (message) => toast.error(message);

  const handleClickOpen = (msg) => {
    setOpen(true);
    setMessage(msg);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleRedirect = () => {
    router.push('/');
  };

  const addToCartHandler = () => {
    const existItem = state.cart.cartItems.find(
      (item) => item.productId === productId
    );
    const quantity = existItem ? existItem.qty + parseInt(qty) : qty;
    if (!price) {
      errorToast('Please select a price for the gift card.');
    } else {
      dispatch({
        type: 'CART_ADD_ITEM',
        payload: { productId, price, qty: quantity }
      });
      handleClickOpen(`${product.productName} was successfully added to cart`);
      successToast(`${product.productName} was successfully added to cart`);
    }
  };

  return (
    <Layout title="Products">
      <div className="page-content">
        <ul className="page-breadcrumb">
          <li onClick={() => router.push('/')}>Home</li> <NavigateNextIcon />
          <li onClick={() => router.push('/products')}>Products</li>
          <NavigateNextIcon />
          <li className="active">{product.productName}</li>
        </ul>
        <div className="cart-page">
          <Grid container md={8} mdOffset={2} spacing={3}>
            <Grid md={5}>
              <div className="product-main-img">
                <img src={product.img} alt={product.productName} />
              </div>
            </Grid>
            <Grid md={7}>
              <div className="product-details">
                <h1>{product.productName}</h1>
                <div className="p-rating">
                  <Rating
                    value={Number(ratings)}
                    precision={0.5}
                    size="small"
                    readOnly
                  />
                  <p>({reviewCount} ratings)</p>
                </div>
                <div className="p-amount">
                  {prices.D2 ? (
                    <>
                      {prices.D1}
                      <span>{prices.C1}</span> - {prices.D2}
                      <span>{prices.C2}</span>
                    </>
                  ) : (
                    <>
                      {prices.D1}
                      <span>{prices.C1}</span>
                    </>
                  )}
                </div>
                <div className="variations">
                  <label>Price Variations:</label>
                  {fd
                    ? fd.map((val, index) => (
                        <input
                          className={val === price && 'active'}
                          type="button"
                          key={index}
                          value={`$${val}`}
                          readOnly
                          onClick={() => setPrice(val)}
                        />
                      ))
                    : unfixedAmount.map((val, index) => (
                        <input
                          className={val === price && 'active'}
                          type="button"
                          key={index}
                          value={`$${val}`}
                          readOnly
                          onClick={() => setPrice(val)}
                        />
                      ))}
                </div>
                <div className="p-qty">
                  <div
                    className="p-qty-btn"
                    onClick={() => setQty(qty > 2 ? qty - 1 : 1)}
                  >
                    <RemoveIcon />
                  </div>
                  <input type="text" value={qty} readOnly />
                  <div className="p-qty-btn" onClick={() => setQty(qty + 1)}>
                    <AddIcon />
                  </div>
                </div>
                <div
                  className="p-wishlist"
                  onClick={() =>
                    successToast(
                      `${product.productName} Successfully added to Wishlist`
                    )
                  }
                >
                  <FavoriteBorderIcon /> Add to Wishlist
                </div>
                <p>{product.redeemInstruction.verbose}</p>
                <Button className="cart-btn" onClick={addToCartHandler}>
                  <AddShoppingCartIcon />
                  Add to Cart
                </Button>
              </div>
            </Grid>
          </Grid>
          <Grid
            container
            md={8}
            mdOffset={2}
            spacing={3}
            className="related-products"
          >
            <h5>Related Products</h5>
            {products.slice(50, 54).map((product, index) => (
              <Grid md={3} key={index}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
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
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{message}</DialogTitle>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Continue Shopping
          </Button>
          <Button variant="contained" onClick={handleRedirect} autoFocus>
            Go to Cart
          </Button>
        </DialogActions>
      </Dialog>
    </Layout>
  );
};

export async function getServerSideProps() {
  return fetchProducts();
}

export default dynamic(() => Promise.resolve(ProductScreen), { ssr: false });
