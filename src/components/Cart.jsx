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
            <div class="row row-cols-1 row-cols-md-2 g-4">
            {data.map((item, index) => (
                





  <div class="col">
    <div class="card">
    <Carousel>
                {item.images.map((img, imgIndex) => (
                    <Carousel.Item key={imgIndex}>
                        <img src={img} className="d-block w-30" style={{width:'300px'}} alt={`Image ${imgIndex}`} />
                    </Carousel.Item>
                ))}
            </Carousel>
      {/* <img src="..." class="card-img-top" alt="..."> */}
      <div class="card-body">
        <h4 class="card-title">{item.title}</h4>
        <p className="card-text"><h4>{item.description}</h4></p>
        <h5 class="card-title">ID: {item.id}</h5>
        <h5 class="card-title">Price: {item.price}</h5>
        <h5 class="card-title">Discount Percentage: {item.discountPercentage}</h5>
        <h5 class="card-title">Rating: {item.rating}</h5>
        <h5 class="card-title">Stock: {item.stock}</h5>
        <h5 class="card-title">Brand: {item.brand}</h5>
        <h5 class="card-title">Category: {item.category}</h5>
        <button onClick={() => handleIncrease(item.id, item.quantity || 1)}>+</button>
                        <button onClick={() => handleDecrease(item.id, item.quantity || 1)}>-</button>
                        <button onClick={() => handleRemove(item.id)}>Remove</button>

      </div>
    </div>
    
  </div>
             ))}
</div>


                
           
        </div>
    );
};

export default Cart;
