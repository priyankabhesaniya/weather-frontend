import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './asset/css/component.scss'
import 'react-toastify/dist/ReactToastify.css';
import './asset/css/custom.scss'
import App from './App';
import store from './store/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import persistStore from 'redux-persist/es/persistStore';
import { Navigate, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import { toast,ToastContainer } from 'react-toastify';
axios.interceptors.request.use(
  (req) => {
    req.baseURL = process.env.REACT_APP_API_ENDPOINT;
    // if (authSelector?.access_token) {
    //   req.headers = {
    //     "Content-Type": "application/json",

    //     Authorization: `Bearer ${authSelector.access_token}`,
    //     accesscode: authSelector.accesscode,
    //     ...req.headers,
    //   };
    // }
    return req;
  },
  (error) => {
    console.log("🚀 ~ error:", error)
    return error;
  }
);

axios.interceptors.response.use(
  response => response,
  error => {
    // Handle the error globally
    console.log("🚀 ~ error:", error.response.status)
    toast.error(error?.response?.data?.error)
    console.log("🚀 ~ error:",error?.response?.data?.message)
    console.log("🚀 ~ error:", error.response)
    if (error?.response?.status == 403 && error?.response?.data?.message == 'Invalid token') {
      localStorage.clear()
      window.location.href = '/login'
      toast.error('Session expired')
      return
    }
    return Promise.reject(error);
  }

);
const persistor = persistStore(store)
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
     <Provider store={store}>
      {/* <ToastContainer autoClose={5000} limit={1}/> */}
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          {/* <Suspense fallback={<Loader />}> */}

            <App />
            <ToastContainer
              position="top-right"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              limit={1}
            />
        </Router>
      </PersistGate>
    </Provider>
  </>
 
);


