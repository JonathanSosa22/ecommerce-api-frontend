import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  getCategoryThunk,
  getProductThunk,
} from "../store/slices/product.slice";
import { Row, Col, Button, Card } from "react-bootstrap";

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
      {/* {categoriesList.map((category) => (
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
      ))} */}

      <div>
        {categoriesList?.map((category) => (
          <Button
            key={category.id}
            onClick={() => dispatch(getCategoryThunk(category.id))}
          >
            {category.name}
          </Button>
        ))}
        <Button
          className="btn"
          onClick={() => dispatch(dispatch(getProductThunk(product)))}
        >
          See All
        </Button>
        <Row xs={1} md={2} lg={3}>
          {product?.map((productItem) => (
            <Col key={productItem.id}>
              <Card className="card-home">
                <Card.Img variant="top" src={productItem.productImgs[2].url} />
                <Card.Body className="card-home">
                  <Card.Title>{productItem?.title}</Card.Title>
                  <Card.Text>{productItem?.description}</Card.Text>
                  <Button
                    variant="primary"
                    as={Link}
                    to={`/product/${productItem?.id}`}
                  >
                    See Detail
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default Home;
