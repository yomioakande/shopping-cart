import { useRouter } from 'next/router';
import { Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

const CartSummary = ({ subTotal, productQty }) => {
  const router = useRouter();
  const USDollar = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });
  return (
    <div className="cart-summary">
      <h5> Cart Summary </h5>
      <TableContainer>
        <Table aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell>Products Qty</TableCell>
              <TableCell>{productQty}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Subtotal</TableCell>
              <TableCell>{USDollar.format(subTotal)}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button onClick={() => router.push('/checkout')} className="checkout-btn">
        Checkout
      </Button>
    </div>
  );
};

export default CartSummary;
