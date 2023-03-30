import React, { useEffect } from "react";
import { Button, Offcanvas } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCartThunk } from "../store/slices/addCart.slice";
import { checkoutCartThunk } from "../store/slices/purchases.slice";

const SideBar = ({ show, handleClose }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartThunk());
  }, []);

  const cartAdd = useSelector((state) => state.addCart);

  return (
    <Offcanvas placement={"end"} show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Offcanvas</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {cartAdd.map((item) => (
          <div key={item.id}>
            <li>
              {item.product.title} Price: ${item.product.price} x{item.quantity}
            </li>
          </div>
        ))}
        <Button onClick={() => dispatch(checkoutCartThunk())}>CHECKOUT</Button>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default SideBar;
