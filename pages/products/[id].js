import { useRouter } from 'next/router';
import { Layout } from '../../components/layout/WebsiteLayout';
import Grid from '@mui/system/Unstable_Grid/Grid';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Button, Rating } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ProductCard from '../../components/ProductCard';
import { Fragment, useState, useEffect } from 'react';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { formatPrice, randomRating, randomReviews } from '../../utils';

const ProductScreen = (props) => {
  const { products } = props;
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState();
  const [product, setProduct] = useState();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();
  const productId = router.query.id;

  useEffect(() => {
    const item = products.find(
      (item) => item.productId === parseInt(productId)
    );
    setProduct(item);
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
                    defaultValue={randomRating}
                    precision={0.5}
                    size="small"
                    readOnly
                  />
                  <p>({randomReviews()} ratings)</p>
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
                    ? fd.map((val) => (
                        <input
                          className={val === price && 'active'}
                          type="button"
                          value={`$${val}`}
                          readOnly
                          onClick={() => setPrice(val)}
                        />
                      ))
                    : unfixedAmount.map((val) => (
                        <input
                          className={val === price && 'active'}
                          type="button"
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
                  onClick={() => handleClick(product.productName, 'Wishlist')}
                >
                  <FavoriteBorderIcon /> Add to Wishlist
                </div>
                <p>{product.redeemInstruction.verbose}</p>
                <Button className="cart-btn">
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
            {products.slice(0, 4).map((product) => (
              <Grid md={3}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </div>
      </div>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={message}
        action={action}
      />
    </Layout>
  );
};

export async function getServerSideProps() {
  try {
    const { data } = await fetch(
      'https://api.chimoney.io/v0.2/info/assets'
    ).then((res) => res.json());
    return {
      props: {
        products: JSON.parse(JSON.stringify(data.giftCardsRLD.content))
      }
    };
  } catch (error) {
    console.log(error);
    return {
      props: {
        products: [],
        error
      }
    };
  }
}

export default ProductScreen;
