import React, { useEffect } from 'react';
import { useSelector, useDispatch, Provider } from 'react-redux';
import { createStore } from 'redux';
import productData from './products.json'; // Import your JSON data
import './index.css';

// Reducer
const cartReducer = (state = { products: productData.products }, action) => {
  switch (action.type) {
    case 'UPDATE_QUANTITY':
      const updatedProducts = state.products.map((product) => {
        if (product.id === action.payload.id) {
          return {
            ...product,
            stock: product.stock - action.payload.quantity,
          };
        }
        return product;
      });
      return { ...state, products: updatedProducts };
    default:
      return state;
  }
};

// Action creators
const updateQuantity = (id, quantity) => ({
  type: 'UPDATE_QUANTITY',
  payload: { id, quantity },
});

// Store
const store = createStore(cartReducer);

const App = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity(id, quantity));
  };

  useEffect(() => {
    // Fetch products or perform any other initial setup
  }, []);

  return (
    <div>
      <h1>Cart Page</h1>
      {products && products.length > 0 ? (
        <div>
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                {product.title} - ${product.price} - Stock: {product.stock}

                <button onClick={() => handleQuantityChange(product.id, -1)}>Increase Quantity</button>
                <button onClick={() => handleQuantityChange(product.id, 1)}>Decrease Quantity</button>
              </li>
            ))}
          </ul>
          <p>Total Quantity: {products.reduce((acc, curr) => acc + curr.stock, 0)}</p>
          <p>
            Total Amount: $
            {products.reduce((acc, curr) => acc + curr.price * curr.stock, 0).toFixed(2)}
          </p>
        </div>
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

// Wrap your app with Redux Provider
const ReduxApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default ReduxApp;
