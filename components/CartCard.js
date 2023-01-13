import { Button } from '@mui/material';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { Store } from '../utils/Store';
import { useState, useContext } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import toast, { Toaster } from 'react-hot-toast';

const CartItem = ({ products, item }) => {
  const { state, dispatch } = useContext(Store);
  const [open, setOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState({});
  const [itemToUpdate, setItemToUpdate] = useState({});

  const successToast = (message) => toast.success(message);

  const product = products.find(
    (val) => val.productId === parseInt(item.productId)
  );
  const price = item.price.toString().split('.');

  const deleteProduct = () => {
    dispatch({ type: 'CART_DELETE_ITEM', payload: itemToDelete });
    successToast(`Item was successfully removed from cart`);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteItemHandler = (itemToDelete) => {
    setOpen(true);
    setItemToDelete(itemToDelete);
  };

  const incrementQty = (itemToUpdate) => {
    setItemToUpdate(itemToUpdate);
    const quantity = itemToUpdate.qty + 1;
    dispatch({
      type: 'UPDATE_ITEM',
      payload: {
        productId: itemToUpdate.productId,
        price: itemToUpdate.price,
        qty: quantity
      }
    });
    successToast(`Item qty successfully updated`);
  };

  const decrementQty = (itemToUpdate) => {
    setItemToUpdate(itemToUpdate);
    if (itemToUpdate.qty > 1) {
      const quantity = itemToUpdate.qty - 1;
      dispatch({
        type: 'UPDATE_ITEM',
        payload: {
          productId: itemToUpdate.productId,
          price: itemToUpdate.price,
          qty: quantity
        }
      });
      successToast(`Item qty successfully updated`);
    } else {
      dispatch({
        type: 'CART_DELETE_ITEM',
        payload: {
          productId: itemToUpdate.productId,
          price: itemToUpdate.price,
          qty: 1
        }
      });
      successToast(`Item was successfully removed from cart`);
    }
  };

  return (
    <div className="cart-item-box">
      <div className="item-img">
        <img src={product.img} alt="Product Image" />
      </div>
      <div className="item-info">
        <div className="info-top">
          <h5 className="item-name">{product.productName}</h5>
          <h3 className="item-price">
            ${price[0]}
            <span>{price[1] || '00'}</span>
          </h3>
        </div>
        <p>{product.redeemInstruction.concise}</p>
        <div className="item-qty">
          <Button className="qty-btn" onClick={() => decrementQty(item)}>
            <RemoveIcon />
          </Button>
          <p className="qty">{item.qty}</p>
          <Button className="qty-btn" onClick={() => incrementQty(item)}>
            <AddIcon />
          </Button>
        </div>
        <ul className="item-options">
          <li onClick={() => deleteItemHandler(item)}>
            <DeleteOutlineIcon /> Remove
          </li>
          <li
            onClick={() =>
              successToast(
                `${product.productName} Successfully added to Wishlist`
              )
            }
          >
            <FavoriteBorderIcon /> Wishlist
          </li>
          <li
            onClick={() =>
              successToast(
                `${product.productName} Successfully added to Compare`
              )
            }
          >
            <CompareArrowsIcon /> Compare
          </li>
        </ul>
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
        <DialogTitle id="alert-dialog-title">
          {'Remove Item from cart'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do you really want to remove this item from cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            No
          </Button>
          <Button variant="contained" onClick={deleteProduct} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default CartItem;
