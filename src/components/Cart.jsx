import React, { useContext } from 'react';
import { myContext } from '../App';
import { Carousel } from 'react-bootstrap';

const Cart = () => {
    const [data, setData] = useContext(myContext);
    const totalPrice = data.reduce((total, data) => total + data.price * (data.quantity || 1), 0);
    const totalQuantity = data.reduce((total, data) => total + (data.quantity || 1), 0);
    
    const handleIncrease = (id, quantity) => {
        setData(prevData => prevData.map(item => {
            if (item.id === id) {
                return { ...item, quantity: (item.quantity + 1 || quantity + 1) };
            }
            return item;
        }));
    };
    
    const handleDecrease = (id, quantity) => {
        setData(prevData => prevData.map(item => {
            if (item.id === id && (item.quantity || quantity) > 0) {
                return { ...item, quantity: (item.quantity - 1 || quantity - 1) };
            }
            return item;
        }));
    };
    const handleRemove = (id) => {
        setData(prevData => prevData.filter(item => item.id !== id));
    };

    return (
        <div display:flex>
           <div className="heading">
            <h1>Total Quantity: {totalQuantity}</h1>
            <h1>Total Price: {totalPrice}</h1></div>
            {data.map((item, index) => (
                <span key={index} className="card text-dark bg-light mb-3"col-lg-2>
                  <div class="flex-container" ><div>  <Carousel>
                        {item.images.map((img, imgIndex) => (
                            <Carousel.Item key={imgIndex}>
                                <img src={img} className="d-block w-30" alt={`Image ${imgIndex}`} />
                            </Carousel.Item>
                        ))}
                    </Carousel>
                    <div className="card-body">
                        <p className="card-title"><h5>{item.title}</h5></p>
                        <p className="card-text"><h5>{item.description}</h5></p>
                        <ul className="list-group list-group-flush">
                            <li className="list-group-item"><h5>ID: {item.id}</h5></li>
                            <li className="list-group-item"><h5>Price: {item.price}</h5></li>
                            <li className="list-group-item"><h5>Discount Percentage: {item.discountPercentage}</h5></li>
                            <li className="list-group-item"><h5>Rating: {item.rating}</h5></li>
                            <li className="list-group-item"><h5>Stock: {item.stock}</h5></li>
                            <li className="list-group-item"><h5>Brand: {item.brand}</h5></li>
                            <li className="list-group-item"><h5>Category: {item.category}</h5></li>
                        </ul>
                        <button onClick={() => handleIncrease(item.id, item.quantity || 1)}>+</button>
                        <button onClick={() => handleDecrease(item.id, item.quantity || 1)}>-</button>
                        <button onClick={() => handleRemove(item.id)}>Remove</button>

                    </div>
                    </div>
                    </div>
                    <div className="card-footer text-muted">
                        Last updated 3 mins ago
                    </div>
                </span>
            ))}
        </div>
    );
};

export default Cart;
