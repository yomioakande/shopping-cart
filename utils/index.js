const fetchProducts = async () => {
  try {
    const { data } = await fetch(process.env.NEXT_PUBLIC_API_URL).then((res) =>
      res.json()
    );
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
};
const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

const currencyFormatter = (amount) => {
  let price = USDollar.format(amount);
  price = price.toString().split('.');
  return {
    D: price[0],
    C: price[1]
  };
};

const formatPrice = (minD, maxD, fd) => {
  let price;
  if (minD) {
    price = {
      D1: currencyFormatter(minD).D,
      C1: currencyFormatter(minD).C,
      D2: currencyFormatter(maxD).D,
      C2: currencyFormatter(maxD).C
    };
  } else {
    const len = fd.length;
    if (len == 1) {
      price = {
        D1: currencyFormatter(fd[0]).D,
        C1: currencyFormatter(fd[0]).C
      };
    } else {
      price = {
        D1: currencyFormatter(fd[0]).D,
        C1: currencyFormatter(fd[0]).C,
        D2: currencyFormatter(fd[len - 1]).D,
        C2: currencyFormatter(fd[len - 1]).C
      };
    }
  }
  return price;
};

const sortOptions = [
  { value: 'recommended', name: 'Recommended' },
  { value: 'asc', name: 'Price: Low to High' },
  { value: 'desc', name: 'Price: High to Low' },
  { value: 'rating', name: 'Rating' }
];

const randomRating = () => {
  const values = [0, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
  const randomIndex = Math.floor(Math.random() * values.length);
  const rating = values[randomIndex];
  return rating;
};

const randomReviews = () => {
  return Math.floor(Math.random() * 99999);
};

export {
  fetchProducts,
  currencyFormatter,
  sortOptions,
  formatPrice,
  randomRating,
  randomReviews
};
