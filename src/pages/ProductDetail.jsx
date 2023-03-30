import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getProductThunk } from "../store/slices/product.slice";
import { postPurchasesThunk } from "../store/slices/purchases.slice";

const ProductDetail = () => {
  const { id } = useParams();

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

  const addToCart = () => {
    const productId = {
      productId: product.id,
      quantity: quantity,
    };
    dispatch(postPurchasesThunk(productId));
  };

  return (
    <div>
      <h1>{product?.title}</h1>
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
      </div>
    </div>
  );
};

export default ProductDetail;
