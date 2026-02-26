import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  Header,
  HeaderName,
  HeaderNavigation,
  HeaderMenuItem,
  HeaderGlobalBar,
  HeaderGlobalAction,
  Content,
} from '@carbon/react';
import { ShoppingCart, Receipt, Dashboard } from '@carbon/icons-react';
import './App.css';

// Pages
import Home from './pages/Home';
import BuildPizza from './pages/BuildPizza';
import TrackOrder from './pages/TrackOrder';
import AdminDashboard from './pages/AdminDashboard';

const App: React.FC = () => {
  return (
    <Router>
      <div className="app">
        <Header aria-label="Pizza Palace">
          <HeaderName as={Link} to="/" prefix="🍕">
            Pizza Palace
          </HeaderName>
          <HeaderNavigation aria-label="Pizza Palace">
            <HeaderMenuItem as={Link} to="/build">
              Order Pizza
            </HeaderMenuItem>
            <HeaderMenuItem as={Link} to="/track">
              Track Order
            </HeaderMenuItem>
            <HeaderMenuItem as={Link} to="/admin">
              Admin
            </HeaderMenuItem>
          </HeaderNavigation>
          <HeaderGlobalBar>
            <HeaderGlobalAction aria-label="Shopping Cart" tooltipAlignment="end">
              <ShoppingCart size={20} />
            </HeaderGlobalAction>
          </HeaderGlobalBar>
        </Header>

        <Content>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/build" element={<BuildPizza />} />
            <Route path="/track" element={<TrackOrder />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </Content>
      </div>
    </Router>
  );
};

export default App;

// Made with Bob
