import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function OrderSuccess() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
    const username = localStorage.getItem("username");


  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/orders/${id}`);
        const data = await res.json();
        setOrder(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchOrder();
  }, [id]);

  if (!order)
    return <h2 style={{ textAlign: "center", marginTop: "50px" }}>Loading...</h2>;

  return (
    <div className="order-success-container">
      <h1>🎉 Order Successful!</h1>
      <p>Thank you {username} <b></b>, your order has been placed.</p>
   

      <ul>
        {(order.items || []).map((item) => (
          <li key={item.id}>
            {item.qty} × {item.name} – ₹{item.price}
          
          </li>
        ))}
      </ul>

      <Link to="/"><button className="back-home-btn">Back to Home</button></Link>
    </div>
  );
}

export default OrderSuccess;
