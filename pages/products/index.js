import ReactPaginate from 'react-paginate';
import Grid from '@mui/material/Unstable_Grid2';
import { Layout } from '../../components/layout/WebsiteLayout';
import PageHeader from '../../components/PageHeader';
import ProductCard from '../../components/ProductCard';
import ProductSidebar from '../../components/ProductSidebar';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { Listbox } from '@headlessui/react';
import { useState, useEffect } from 'react';
import { sortOptions } from '../../utils';

const index = (props) => {
  const { products } = props;
  const [selectedSort, setSelectedSort] = useState(sortOptions[0]);
  const [sortShadow, setSortShadow] = useState(false);
  const [showFilter, setShowFilter] = useState(false);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 12;

  const toggleSortShadow = () => {
    setSortShadow(!sortShadow);
  };
  const toggleShowFilter = () => {
    setShowFilter(!showFilter);
  };

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = products.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(products.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % products.length;
    setItemOffset(newOffset);
  };

  let brands = [];

  products.map((product) => {
    brands.push(product.brand.brandName);
  });

  // useEffect(() => {
  //   window.localStorage.setItem('PRODUCTS_LIST', JSON.stringify(products));
  // }, [products]);

  return (
    <Layout title="Products">
      <div className="page-content">
        <PageHeader title="Products" text="" />
        <div className="cart-page">
          <Grid container md={10} mdOffset={1} xs={12} spacing={3}>
            <Grid md={3} xs={12}>
              <ProductSidebar
                filter={showFilter}
                brands={[...new Set(brands)]}
              />
            </Grid>
            <Grid md={9}>
              <div className="mainbar">
                <Grid container spacing={1}>
                  <Grid md={12} xs={12}>
                    <div className="mainbar-header">
                      <div className="sort">
                        <span>Sort by:</span>
                        <Listbox
                          value={selectedSort}
                          onChange={setSelectedSort}
                        >
                          <Listbox.Button
                            className={`sort-btn ${sortShadow ? 'shadow' : ''}`}
                            onClick={toggleSortShadow}
                          >
                            {selectedSort.name} <ExpandMoreIcon />
                          </Listbox.Button>
                          <Listbox.Options className="sort-dropdown">
                            {sortOptions.map((sort, sortIdx) => (
                              <Listbox.Option
                                className="sort-list"
                                key={sortIdx}
                                value={sort}
                                onClick={toggleSortShadow}
                              >
                                {sort.name}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Listbox>
                      </div>
                      <div className="filter" onClick={toggleShowFilter}>
                        FILTERS
                      </div>
                    </div>
                  </Grid>
                  {currentItems.map((product) => (
                    <Grid md={3} xs={12}>
                      <ProductCard product={product} />
                    </Grid>
                  ))}
                  <Grid xs={12} className="align-center">
                    <ReactPaginate
                      breakLabel="..."
                      nextLabel={<NavigateNextIcon />}
                      onPageChange={handlePageClick}
                      pageRangeDisplayed={3}
                      marginPagesDisplayed={1}
                      pageCount={pageCount}
                      previousLabel={<NavigateBeforeIcon />}
                      renderOnZeroPageCount={null}
                      containerClassName="pagination"
                    />
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </div>
      </div>
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

export default index;