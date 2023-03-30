import axios from "axios";
import { useState, useEffect } from "react";
import getConfig from "../utils/getConfig";

const Purchases = () => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    axios
      .get("https://e-comerce-api.onrender.com/api/v1/purchases", getConfig())
      .then((resp) => setPurchases(resp.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <div>
        <h1>Purchases</h1>
        {purchases.map((item) => (
          <div key={item.id}>
            <li>
              {item.product.title} Price: ${item.product.price}
            </li>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Purchases;
