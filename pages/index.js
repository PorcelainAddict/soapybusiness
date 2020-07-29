import React from 'react'
import axios from 'axios'
import PoductList from '../components/Index/ProductList'
import ProductList from '../components/Index/ProductList';

function Home({products}) {
  return <ProductList products={products} />
}

Home.getInitialProps = async() => {
  //fetch data on server
  const url = "http://localhost:3000/api/products";
    const response = await axios.get(url);
    return { products: response.data }
  //return res data as an object
  // return { hello: 'planet'};
  // note: this object will be merged with existing props
}

export default Home;
