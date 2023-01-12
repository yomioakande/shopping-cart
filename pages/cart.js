import Grid from '@mui/system/Unstable_Grid/Grid';
import EmptyCart from '../components/EmptyCart';
import { Layout } from '../components/layout/WebsiteLayout';
import PageHeader from '../components/PageHeader';
import DeleteIcon from '@mui/icons-material/Delete';
import CartItem from '../components/CartItem';
import CartSummary from '../components/CartSummary';
import ProductCard from '../components/ProductCard';

const index = () => {
  return (
    <Layout title="Cart">
      <div className="page-content">
        <PageHeader title="My Cart" />
        <div className="cart-page">
          <Grid container md={8} mdOffset={2} spacing={3}>
            <Grid md={8}>
              <div className="delete-cart">
                <DeleteIcon /> Empty Cart
              </div>
              <CartItem />
              <CartItem />
            </Grid>
            <Grid md={4} xs={12}>
              <>
                <CartSummary />
              </>
            </Grid>
          </Grid>
          <Grid
            container
            md={8}
            mdOffset={2}
            spacing={3}
            className="hand-picked"
          >
            <h5 className="title">Hand picked just for you</h5>
            {/* <Grid md={2}>
              <ProductCard />
            </Grid>
            <Grid md={2}>
              <ProductCard />
            </Grid>
            <Grid md={2}>
              <ProductCard />
            </Grid>
            <Grid md={2}>
              <ProductCard />
            </Grid>
            <Grid md={2}>
              <ProductCard />
            </Grid>
            <Grid md={2}>
              <ProductCard />
            </Grid> */}
          </Grid>
        </div>
        {/* <EmptyCart /> */}
      </div>
    </Layout>
  );
};

export default index;
