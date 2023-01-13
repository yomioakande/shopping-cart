import Grid from '@mui/system/Unstable_Grid/Grid';
import { Layout } from '../components/layout/WebsiteLayout';
import PageHeader from '../components/PageHeader';
import dynamic from 'next/dynamic';
import { TextField } from '@mui/material';
import { Store } from '../utils/Store';
import { useContext, useEffect, useState } from 'react';
import CartSummary from '../components/CartSummary';

const Checkout = () => {
  const { state } = useContext(Store);
  const [subTotal, setSubTotal] = useState(0);
  const {
    cart: { cartItems }
  } = state;

  useEffect(() => {
    setSubTotal(cartItems.reduce((a, c) => a + c.qty * c.price, 0));
  }, [cartItems]);
  return (
    <Layout title="Checkout">
      <div className="page-content">
        <PageHeader title="Checkout" />
        <div className="cart-page">
          <Grid container md={10} mdOffset={1} spacing={3}>
            <Grid xs={12} md={6}>
              <div className="checkout-box">
                <h3>Billing</h3>
                <Grid container xs={12} className="checkout-form">
                  <Grid xs={12} md={6}>
                    <TextField
                      fullWidth
                      label="First Name"
                      variant="outlined"
                    />
                  </Grid>
                  <Grid xs={12} md={6}>
                    <TextField fullWidth label="Last Name" variant="outlined" />
                  </Grid>
                  <Grid xs={12} md={12}>
                    <TextField
                      fullWidth
                      label="Address Line 1"
                      variant="outlined"
                      margin="dense"
                    />
                    <TextField
                      fullWidth
                      label="Address Line 2"
                      variant="outlined"
                      margin="dense"
                    />
                    <TextField
                      fullWidth
                      label="Zip Code"
                      variant="outlined"
                      margin="dense"
                    />
                  </Grid>
                  <Grid xs={12} md={6}>
                    <TextField fullWidth label="State" variant="outlined" />
                  </Grid>
                  <Grid xs={12} md={6}>
                    <TextField fullWidth label="Country" variant="outlined" />
                  </Grid>
                </Grid>
              </div>
            </Grid>
            <Grid xs={12} md={6}>
              <div className="checkout-box">
                <h3>Order Summary</h3>
                {
                  <CartSummary
                    subTotal={subTotal}
                    productQty={cartItems.reduce((a, c) => a + c.qty, 0)}
                  />
                }
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(Checkout), { ssr: false });
