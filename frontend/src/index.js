import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";

import './index.css';
import App from './App';
import { About, Contact, Home, Login, Menu, NewProduct, Signup } from './pages'

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path='/' element={<App/>} >
            <Route index element={<Home />} />
            <Route path="menu" element={<Menu />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="login" element={<Login />} />
            <Route path="newproduct" element={<NewProduct />} />
            <Route path="signup" element={<Signup />} />
        </Route>
    )
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);
