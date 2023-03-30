import React, { useEffect, useState } from "react";
import { Row, Col, ListGroup, Button, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProductThunk } from "../store/slices/product.slice";
import { postPurchasesThunk } from "../store/slices/purchases.slice";
import Carousel from "react-bootstrap/Carousel";

const ProductDetail = () => {
  const { id } = useParams();
  const [rate, setRate] = useState(1);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductThunk());
  }, []);

  const productList = useSelector((state) => state.products);

  const product = productList.find(
    (productItem) => productItem.id === Number(id)
  );
  const relateProduct = productList.filter(
    (productItem) => productItem.category.id === product.category.id
  );

  const [quantity, setQuantity] = useState("");

  // const addToCart = () => {
  //   const productId = {
  //     productId: product.id,
  //     quantity: quantity,
  //   };
  //   dispatch(postPurchasesThunk(productId));
  // };

  const addToCart = () => {
    const token = localStorage.getItem("token");

    if (token) {
      const productId = {
        productId: product.id,
        quantity: rate,
      };
      dispatch(postPurchasesThunk(productId));
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="product-detail">
      <Card className="card-produc-detail">
        {/* <h1>{product?.title}</h1>
      <img src={product?.productImgs[2].url} />
      <p>{product?.description}</p>
      <p>Price: ${product?.price}</p>
      <input
        type="text"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      />
      <Button onClick={addToCart}>Add To Cart</Button>
      <div>
        <h2>Related Product</h2>
        {relateProduct.map((itemProduc) => (
          <div key={itemProduc.id}>
            <Link />
            <img src={itemProduc?.productImgs[2].url} style={{ width: 200 }} />
          </div>
        ))}
      </div> */}

        <h1>{product?.title}</h1>

        <Row>
          <Col lg={9}>
            <Carousel>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={product?.productImgs[2].url}
                  alt="First slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={product?.productImgs[2].url}
                  alt="Second slide"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  className="d-block w-100"
                  src={product?.productImgs[2].url}
                  alt="Third slide"
                />
              </Carousel.Item>
            </Carousel>

            <p>{product?.description}</p>
            <p>Price: ${product?.price}</p>
            <div className="mb-3">
              <Button onClick={addToCart}>Add To Cart</Button>
              <Button onClick={() => setRate(rate - 1)}>-</Button>
              {rate}
              <Button onClick={() => setRate(rate + 1)}>+</Button>
            </div>
          </Col>
        </Row>
      </Card>

      <Card className="card-produc-detail">
        <Col>
          <h3>Releated Products</h3>

          <ListGroup className="list-product">
            {relateProduct.map((itemProduc) => (
              <div key={itemProduc.id}>
                {itemProduc.title}
                <div>
                  <Link />
                  <img
                    src={itemProduc?.productImgs[2].url}
                    style={{ width: 200 }}
                  />
                </div>
              </div>
            ))}
          </ListGroup>
        </Col>
      </Card>
    </div>
  );
};

export default ProductDetail;
