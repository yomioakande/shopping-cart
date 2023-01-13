import Grid from '@mui/system/Unstable_Grid/Grid';
import { Layout } from '../components/layout/WebsiteLayout';
import PageHeader from '../components/PageHeader';
import dynamic from 'next/dynamic';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';
import { Store } from '../utils/Store';
import { useContext, useEffect, useState } from 'react';

const Checkout = () => {
  const { state } = useContext(Store);
  const [subTotal, setSubTotal] = useState(0);
  const {
    cart: { cartItems }
  } = state;

  useEffect(() => {
    setSubTotal(cartItems.reduce((a, c) => a + c.qty * c.price, 0));
  }, [cartItems]);

  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });
  return (
    <Layout title="Checkout">
      <div className="page-content">
        <PageHeader title="Checkout" />
        <div className="cart-page">
          <Grid container md={10} mdOffset={1} spacing={3}>
            <Grid xs={12} md={8}>
              <div className="billing">
                <div className="billing-header">
                  <h3>Address Details</h3>
                  <span>ADD ADDRESS</span>
                </div>
                <div className="billing-body">
                  <p>
                    No Address found for this account. Please Add an address for
                    delivery purpose.
                  </p>
                </div>
              </div>
              <div className="billing">
                <div className="billing-header">
                  <h3>Payment Method</h3>
                </div>
                <div className="billing-body">
                  <div className="methods">
                    <RadioGroup
                      aria-labelledby="demo-radio-buttons-group-label"
                      defaultValue="female"
                      name="radio-buttons-group"
                    >
                      <FormControlLabel
                        value="card"
                        control={<Radio />}
                        label="Card Payment"
                      />

                      <FormControlLabel
                        value="bank"
                        control={<Radio />}
                        label="Bank Payment/Transfer"
                      />
                    </RadioGroup>
                    <div className="acctDetails">
                      <p>
                        All bank transfers and payments are to be paid into the
                        following account:
                      </p>
                      <ul>
                        <li>
                          <strong>Account Name:</strong> Dummy Account Name
                        </li>
                        <li>
                          <strong>Account Number:</strong> 0123456789
                        </li>
                        <li>
                          <strong>Banker:</strong> Dummy bank
                        </li>
                      </ul>
                      <p>
                        After payment, proof of payment should be sent to{' '}
                        <a href="mailto:">dummyemail@gmail.com</a> for payment
                        confirmation and order approval.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </Grid>
            <Grid xs={12} md={4}>
              <div className="billing">
                <div className="billing-header">
                  <h3>Order Review</h3>
                </div>
                <div className="billing-body">
                  <TableContainer>
                    <Table aria-label="simple table">
                      <TableBody>
                        <TableRow>
                          <TableCell>Products Qty</TableCell>
                          <TableCell>
                            {cartItems.reduce((a, c) => a + c.qty, 0)}
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Subtotal</TableCell>
                          <TableCell>{USDollar.format(subTotal)}</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>VAT</TableCell>
                          <TableCell>0.00</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>Discount</TableCell>
                          <TableCell>-</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center" colSpan={2}>
                            <div className="coupon">
                              <label htmlFor="coupon">Add Coupon</label>
                              <input
                                id="coupon"
                                type="text"
                                placeholder="Coupon Code"
                              />
                              <button className="coupon-btn" type="button">
                                Add
                              </button>
                            </div>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <strong>Total</strong>
                          </TableCell>
                          <TableCell>
                            <strong>{USDollar.format(subTotal)}</strong>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="center" colSpan={2}>
                            <button className="order-btn" type="button">
                              Place Order
                            </button>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
    </Layout>
  );
};

export default dynamic(() => Promise.resolve(Checkout), { ssr: false });
