# Pizza Palace - Implementation Guide

This guide provides detailed steps for implementing the Pizza Palace application.

## Prerequisites

- Python 3.9+
- Node.js 16+
- PostgreSQL 13+
- npm or yarn

## Phase 1: Backend Setup

### Step 1: Project Structure
Create the following directory structure:
```
pizza-palace/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py
│   │   ├── database.py
│   │   ├── config.py
│   │   ├── models/
│   │   ├── schemas/
│   │   ├── routers/
│   │   └── services/
│   ├── requirements.txt
│   ├── .env.example
│   └── .env
└── frontend/
```

### Step 2: Backend Dependencies
Create [`requirements.txt`](backend/requirements.txt) with:
```
fastapi==0.104.1
uvicorn[standard]==0.24.0
sqlalchemy==2.0.23
psycopg2-binary==2.9.9
pydantic==2.5.0
pydantic-settings==2.1.0
python-dotenv==1.0.0
```

### Step 3: Database Configuration
1. Create PostgreSQL database: `pizza_palace`
2. Configure connection in [`.env`](backend/.env):
```
DATABASE_URL=postgresql://user:password@localhost:5432/pizza_palace
API_HOST=0.0.0.0
API_PORT=8000
```

### Step 4: Database Models
Implement SQLAlchemy models in [`app/models/`](backend/app/models/):
- [`order.py`](backend/app/models/order.py) - Order model with relationships
- [`pizza.py`](backend/app/models/pizza.py) - Pizza model
- [`menu.py`](backend/app/models/menu.py) - Topping and Crust models

### Step 5: Pydantic Schemas
Create request/response schemas in [`app/schemas/`](backend/app/schemas/):
- [`order.py`](backend/app/schemas/order.py) - OrderCreate, OrderResponse
- [`pizza.py`](backend/app/schemas/pizza.py) - PizzaCreate, PizzaResponse
- [`menu.py`](backend/app/schemas/menu.py) - Topping, Crust schemas

### Step 6: API Routers
Implement endpoints in [`app/routers/`](backend/app/routers/):

**[`orders.py`](backend/app/routers/orders.py)**:
- `POST /api/orders` - Create order
- `GET /api/orders/phone/{phone}` - Get by phone
- `GET /api/orders/open` - List open orders
- `GET /api/orders/{order_id}` - Get order details
- `PATCH /api/orders/{order_id}/status` - Update status

**[`menu.py`](backend/app/routers/menu.py)**:
- `GET /api/menu/toppings` - List toppings
- `GET /api/menu/crusts` - List crusts
- `GET /api/menu/sizes` - List sizes

### Step 7: Business Logic
Implement services in [`app/services/`](backend/app/services/):
- [`order_service.py`](backend/app/services/order_service.py) - Order CRUD operations, price calculation
- [`menu_service.py`](backend/app/services/menu_service.py) - Menu data management

### Step 8: Main Application
Configure FastAPI app in [`app/main.py`](backend/app/main.py):
- CORS middleware
- Router registration
- Database initialization
- Swagger UI configuration

## Phase 2: Frontend Setup

### Step 1: Create React App
```bash
cd frontend
npx create-react-app . --template typescript
```

### Step 2: Install Dependencies
```bash
npm install @carbon/react @carbon/icons-react
npm install react-router-dom axios
npm install @types/react-router-dom --save-dev
```

### Step 3: Project Structure
```
frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── PizzaBuilder/
│   │   ├── OrderForm/
│   │   ├── OrderTracking/
│   │   └── Admin/
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── BuildPizza.jsx
│   │   ├── TrackOrder.jsx
│   │   └── AdminDashboard.jsx
│   ├── services/
│   │   └── api.js
│   ├── App.jsx
│   └── index.js
└── package.json
```

### Step 4: API Service
Create [`src/services/api.js`](frontend/src/services/api.js):
```javascript
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const api = {
  // Orders
  createOrder: (orderData) => axios.post(`${API_BASE_URL}/orders`, orderData),
  getOrdersByPhone: (phone) => axios.get(`${API_BASE_URL}/orders/phone/${phone}`),
  getOpenOrders: () => axios.get(`${API_BASE_URL}/orders/open`),
  updateOrderStatus: (orderId, status) => 
    axios.patch(`${API_BASE_URL}/orders/${orderId}/status`, { status }),
  
  // Menu
  getToppings: () => axios.get(`${API_BASE_URL}/menu/toppings`),
  getCrusts: () => axios.get(`${API_BASE_URL}/menu/crusts`),
  getSizes: () => axios.get(`${API_BASE_URL}/menu/sizes`),
};
```

### Step 5: Component Implementation

**Pizza Builder Components**:
1. [`SizeSelector.jsx`](frontend/src/components/PizzaBuilder/SizeSelector.jsx) - Radio buttons for size selection
2. [`CrustSelector.jsx`](frontend/src/components/PizzaBuilder/CrustSelector.jsx) - Dropdown for crust type
3. [`ToppingSelector.jsx`](frontend/src/components/PizzaBuilder/ToppingSelector.jsx) - Checkboxes for toppings
4. [`PizzaSummary.jsx`](frontend/src/components/PizzaBuilder/PizzaSummary.jsx) - Display selected options and price

**Order Form Components**:
1. [`CustomerInfo.jsx`](frontend/src/components/OrderForm/CustomerInfo.jsx) - Name, phone, address inputs
2. [`OrderConfirmation.jsx`](frontend/src/components/OrderForm/OrderConfirmation.jsx) - Review and submit

**Order Tracking**:
1. [`OrderStatus.jsx`](frontend/src/components/OrderTracking/OrderStatus.jsx) - Display order status and details

**Admin Dashboard**:
1. [`OpenOrdersList.jsx`](frontend/src/components/Admin/OpenOrdersList.jsx) - Table of open orders with status update

### Step 6: Carbon Design System Integration
- Use Carbon components: Button, TextInput, Select, Checkbox, DataTable
- Apply Carbon themes
- Use Carbon grid system for layout
- Implement Carbon icons

### Step 7: Routing
Configure React Router in [`App.jsx`](frontend/src/App.jsx):
```javascript
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/build" element={<BuildPizza />} />
        <Route path="/track" element={<TrackOrder />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
```

## Phase 3: Integration & Testing

### Step 1: Environment Configuration
**Backend** [`.env`](backend/.env):
```
DATABASE_URL=postgresql://user:password@localhost:5432/pizza_palace
API_HOST=0.0.0.0
API_PORT=8000
CORS_ORIGINS=http://localhost:3000
```

**Frontend** [`.env`](frontend/.env):
```
REACT_APP_API_URL=http://localhost:8000/api
```

### Step 2: Database Initialization
Run database migrations and seed initial data:
```bash
cd backend
python -m app.database  # Initialize tables
python -m app.seed_data  # Seed toppings and crusts
```

### Step 3: Running the Application

**Backend**:
```bash
cd backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Frontend**:
```bash
cd frontend
npm start
```

### Step 4: Testing Checklist
- [ ] Create a pizza order with multiple pizzas
- [ ] Verify order appears in database
- [ ] Retrieve order by phone number
- [ ] View order in admin dashboard
- [ ] Update order status
- [ ] Verify price calculation is correct
- [ ] Test form validation
- [ ] Test error handling
- [ ] Test responsive design on mobile

## Phase 4: Documentation

### Step 1: API Documentation
- Access Swagger UI at `http://localhost:8000/docs`
- Test all endpoints
- Document example requests/responses

### Step 2: README
Update [`README.md`](README.md) with:
- Project description
- Setup instructions
- Running instructions
- API endpoints
- Technology stack
- Screenshots

## Key Implementation Notes

### Price Calculation Logic
```python
def calculate_pizza_price(size, crust_type, toppings):
    base_prices = {'small': 8.99, 'medium': 12.99, 'large': 16.99}
    crust_modifiers = {
        'thin_crust': 0.00,
        'new_york_style': 1.00,
        'deep_dish': 2.00,
        'cheese_stuffed': 3.00,
        'gluten_free': 2.50
    }
    
    price = base_prices[size]
    price += crust_modifiers[crust_type]
    price += len(toppings) * 1.50  # Each topping costs $1.50
    
    return round(price, 2)
```

### Order Status Flow
```
open -> preparing -> out_for_delivery -> delivered
                  -> cancelled (from any status)
```

### Phone Number Validation
- Format: XXX-XXXX or (XXX) XXX-XXXX or XXX.XXX.XXXX
- Store normalized format in database
- Display formatted in UI

## Common Issues & Solutions

### CORS Errors
- Ensure CORS middleware is configured in FastAPI
- Add frontend URL to allowed origins
- Check browser console for specific errors

### Database Connection Issues
- Verify PostgreSQL is running
- Check connection string in .env
- Ensure database exists

### Carbon Components Not Styling
- Import Carbon CSS in index.js: `import '@carbon/react/scss/styles.scss';`
- Verify Carbon theme is applied

### API Requests Failing
- Check API base URL in frontend .env
- Verify backend is running
- Check network tab in browser dev tools