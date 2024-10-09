// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useSocket } from './context/SocketContext';

// const ProductDashboard = () => {
//   const [products, setProducts] = useState([]);
//   const socket = useSocket();

//   useEffect(() => {
//     fetchProducts();

//     if (socket) {
//       socket.on('update', (update) => {
//         console.log("🚀 ~ socket.on ~ update:", update)
//         if (update.endpoint === '/products') {
//           if (update.type === 'POST') {
//             setProducts(prevProducts => [...prevProducts, update.data]);
//           } else {
//             fetchProducts();
//           }
//         }
//       });
//     }

//     return () => {
//       if (socket) {
//         socket.off('update');
//       }
//     };
//   }, [socket]);

//   const fetchProducts = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/products');
//       setProducts(response.data);
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   const addData = async () => {
//     const data = {
//       name: 'not this 67888',
//       category: 'npmmmmmmmmmmmmmm'
//     }
//     try {
//       const res = await axios.post('http://localhost:5000/products', data);
//       if (res.status === 201) {
//         console.log('Product added:', res.data);
//         socket.emit('productUpdated', res.data);
//       }
//     } catch (e) {
//       console.error('Error adding product:', e);
//     }
//   }

//   return (
//     <div>
//       <h1>Product Dashboard</h1>
//       <ul>
//         {products.map(product => (
//           <li key={product.id}>
//             {product.name} - ${product?.price}
//           </li>
//         ))}
//       </ul>
//       <button onClick={addData}>Add Product</button>
//     </div>
//   );
// };

// export default ProductDashboard;
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { useWebSocket } from './context/SocketContext';
// import { useWebSocket } from './context/WebSocketContext';

const ProductDashboard = () => {
  const [products, setProducts] = useState([]);
  const { socket, sendMessage } = useWebSocket();

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axios.get('http://localhost:5000/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (socket) {
      const handleMessage = (event) => {
        const update = JSON.parse(event.data);
        console.log("🚀 ~ WebSocket update:", update);
        if (update.endpoint === '/products') {
          if (update.type === 'POST') {
            setProducts(prevProducts => [...prevProducts, update.data]);
          } else {
            fetchProducts();
          }
        }
      };

      socket.addEventListener('message', handleMessage);

      return () => {
        socket.removeEventListener('message', handleMessage);
      };
    }
  }, [socket, fetchProducts]);

  const addData = async () => {
    const data = {
      name: 'lets go to bed',
      category: 'npmmmmmmmmmmmmmm'
    }
    try {
      const res = await axios.post('http://localhost:5000/products', data);
      if (res.status === 201) {
        console.log('Product added:', res.data);
        sendMessage({ type: 'productUpdated', product: res.data });
      }
    } catch (e) {
      console.error('Error adding product:', e);
    }
  }

  return (
    <div>
      <h1>Product Dashboard</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>
            {product.name} - ${product?.price}
          </li>
        ))}
      </ul>
      <button onClick={addData}>Add Product</button>
    </div>
  );
};

export default ProductDashboard;