import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getCategoryThunk,
  getProductThunk,
} from "../store/slices/product.slice";
import { Button } from "react-bootstrap";

const Home = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products);

  const [categoriesList, setCategoriesList] = useState([]);

  useEffect(() => {
    dispatch(getProductThunk());

    axios
      .get("https://e-comerce-api.onrender.com/api/v1/categories/")
      .then((res) => setCategoriesList(res.data));
  }, []);

  return (
    <div>
      <h1>Home</h1>
      {categoriesList.map((category) => (
        <Button
          key={category.id}
          onClick={() => dispatch(getCategoryThunk(category.id))}
        >
          {category?.name}
        </Button>
      ))}
      <Button onClick={() => dispatch(getProductThunk(product))}>
        Get All
      </Button>
      {product.map((productItem) => (
        <div key={productItem.id}>
          <h1>
            <Link to={`/product/${productItem?.id}`}>{productItem?.title}</Link>
          </h1>
          <img src={productItem?.productImgs[2].url} style={{ width: 200 }} />
          <p>{productItem?.description}</p>
          <p>Price: ${productItem?.price}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;
