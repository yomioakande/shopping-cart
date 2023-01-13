import Grid from '@mui/system/Unstable_Grid/Grid';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import Link from 'next/link';

const PageHeader = ({ title }) => {
  return (
    <div className="page-header">
      <Grid container md={10} mdOffset={1}>
        <h2>{title}</h2>
        {title == 'My Cart' && (
          <ul className="breadcrumbs">
            <li>
              <Link href="/products" passHref>
                Products
              </Link>
              <NavigateNextIcon />
            </li>
            <li style={{ color: '#252a33' }}>My Cart</li>
          </ul>
        )}
      </Grid>
    </div>
  );
};

export default PageHeader;
