import React from 'react';
import Header from './Header';

const Layout = ({ children }) => (
  <div className="layout-container bg-indigo-50">
    <Header />
  
    <main>{children}</main>
  </div>
);

export default Layout;