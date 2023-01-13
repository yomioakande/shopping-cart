import Grid from '@mui/system/Unstable_Grid/Grid';
import EmptyCart from '../components/EmptyCart';
import { Layout } from '../components/layout/WebsiteLayout';
import PageHeader from '../components/PageHeader';
import DeleteIcon from '@mui/icons-material/Delete';
import CartCard from '../components/CartCard';
import CartSummary from '../components/CartSummary';
import ProductCard from '../components/ProductCard';
import { Button } from '@mui/material';
import { useState, useEffect, useContext } from 'react';
import { Store } from '../utils/Store';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import toast, { Toaster } from 'react-hot-toast';
import dynamic from 'next/dynamic';

const CartPage = (props) => {
  const { products } = props;
  const { state, dispatch } = useContext(Store);
  const [open, setOpen] = useState(false);
  const [subTotal, setSubTotal] = useState(0);
  const {
    cart: { cartItems }
  } = state;
  const successToast = (message) => toast.success(message);

  const emptyCart = () => {
    dispatch({ type: 'EMPTY_CART', payload: [] });
    successToast('Cart successfully emptied');
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const emptyCartHandler = () => {
    setOpen(true);
  };

  useEffect(() => {
    setSubTotal(cartItems.reduce((a, c) => a + c.qty * c.price, 0));
  }, [cartItems]);

  return (
    <Layout title="Cart">
      <div className="page-content">
        <PageHeader title="My Cart" />
        {cartItems.length === 0 ? (
          <EmptyCart />
        ) : (
          <div className="cart-page">
            <Grid container md={8} mdOffset={2} spacing={3}>
              <Grid md={8}>
                <div className="delete-cart" onClick={() => emptyCartHandler()}>
                  <DeleteIcon /> Empty Cart
                </div>
                {cartItems.map((item) => (
                  <CartCard products={products} item={item} />
                ))}
              </Grid>
              <Grid md={4} xs={12}>
                <>
                  <CartSummary
                    subTotal={subTotal}
                    productQty={cartItems.reduce((a, c) => a + c.qty, 0)}
                  />
                </>
              </Grid>
            </Grid>
          </div>
        )}
        <Grid
          container
          md={10}
          mdOffset={1}
          spacing={3}
          className="hand-picked"
        >
          <h5 className="title">Hand picked just for you</h5>
          {products.slice(14, 20).map((product) => (
            <Grid md={2} xs={12}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
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
          }
        }}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Empty cart'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to empty your cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            No
          </Button>
          <Button variant="contained" onClick={emptyCart} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
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

export default dynamic(() => Promise.resolve(CartPage), { ssr: false });
