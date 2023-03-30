import axios from "axios";
import { useState, useEffect } from "react";
import getConfig from "../utils/getConfig";
import Table from "react-bootstrap/Table";

const Purchases = () => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    axios
      .get("https://e-comerce-api.onrender.com/api/v1/purchases", getConfig())
      .then((resp) => setPurchases(resp.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="purchase-tab">
      <Table striped bordered hover variant="dark">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
          </tr>
        </thead>
        {purchases.map((item) => (
          <>
            <tbody>
              <tr>
                <td>{item.product.title}</td>
                <td>${item.product.price}</td>
              </tr>
            </tbody>
          </>
        ))}
      </Table>
    </div>
  );
};

export default Purchases;
