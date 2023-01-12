import { Button } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

const CartSummary = () => {
  return (
    <div className="cart-summary">
      <h5> Cart Summary </h5>
      <TableContainer>
        <Table aria-label="simple table">
          <TableBody>
            <TableRow>
              <TableCell>Products Qty</TableCell>
              <TableCell>10</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Subtotal</TableCell>
              <TableCell>$9.99</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
      <Button className="checkout-btn">Checkout</Button>
    </div>
  );
};

export default CartSummary;
