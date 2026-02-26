# Pizza Palace 🍕

A full-stack pizza ordering application with a FastAPI backend and React frontend using IBM Carbon Design System.

## Original Requirements

> I want to create an app for ordering pizza online. The app is going to need an API that can be called from the frontend. The API should be able to create pizza orders, retrieve existing orders by customer phone number, and list all orders whose status is open, meaning the order has not yet been delivered. Pizzas can come in 3 sizes, small, medium and large. For now, let's stick to "build your own" pizzas on the menu. Allow the user to add toppings from a list. You can pick some toppings to put in the list. There should be multiple crust types, like thin crust, new york style, deep dish, cheese stuffed and any others you can think of. The front end application should use IBM Carbon and should a react application.

## Features

### Customer Features
- **Build Custom Pizzas**: Choose size, crust type, and toppings
- **Place Orders**: Submit orders with delivery information
- **Track Orders**: Look up orders by phone number
- **Real-time Pricing**: See prices update as you customize

### Admin Features
- **Order Management**: View all open orders
- **Status Updates**: Update order status (preparing, out for delivery, delivered)
- **Order Details**: View complete order information

## Technology Stack

### Backend
- **Framework**: FastAPI (Python)
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy
- **Validation**: Pydantic
- **API Documentation**: Swagger UI

### Frontend
- **Framework**: React with TypeScript
- **UI Library**: IBM Carbon Design System
- **HTTP Client**: Axios
- **Routing**: React Router

## Project Structure

```
pizza-palace/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── models/         # Database models
│   │   ├── schemas/        # Pydantic schemas
│   │   ├── routers/        # API endpoints
│   │   ├── services/       # Business logic
│   │   ├── database.py     # Database configuration
│   │   ├── config.py       # Settings
│   │   └── main.py         # FastAPI app
│   ├── requirements.txt
│   └── README.md
│
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── pages/          # Page components
│   │   ├── services/       # API client
│   │   ├── types/          # TypeScript types
│   │   └── App.tsx
│   ├── package.json
│   └── README.md
│
├── ARCHITECTURE.md          # System architecture
├── IMPLEMENTATION_GUIDE.md  # Implementation details
├── PROJECT_PLAN.md          # Project plan
└── README.md               # This file
```

## Quick Start

### Prerequisites
- Python 3.9+
- Node.js 16+
- PostgreSQL 13+

### Backend Setup

1. **Create Database**
```bash
createdb pizza_palace
```

2. **Install Dependencies**
```bash
cd backend
pip install -r requirements.txt
```

3. **Configure Environment**
```bash
cp .env.example .env
# Edit .env with your database credentials
```

4. **Run Backend**
```bash
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend will be available at:
- API: http://localhost:8000
- Swagger UI: http://localhost:8000/docs

### Frontend Setup

1. **Install Dependencies**
```bash
cd frontend
npm install
```

2. **Configure Environment**
```bash
cp .env.example .env
# Verify REACT_APP_API_URL points to your backend
```

3. **Run Frontend**
```bash
npm start
```

Frontend will be available at: http://localhost:3000

## Pizza Menu

### Sizes
- **Small**: $8.99
- **Medium**: $12.99
- **Large**: $16.99

### Crust Types
- Thin Crust: +$0.00
- New York Style: +$1.00
- Deep Dish: +$2.00
- Cheese Stuffed: +$3.00
- Gluten Free: +$2.50

### Toppings (each +$1.50)
- Pepperoni
- Italian Sausage
- Ham
- Bacon
- Ground Beef
- Grilled Chicken
- Mushrooms
- Green Peppers
- Red Onions
- Black Olives
- Tomatoes
- Spinach
- Jalapeños
- Pineapple
- Extra Cheese
- Feta Cheese

## API Endpoints

### Orders
- `POST /api/orders` - Create new order
- `GET /api/orders/phone/{phone}` - Get orders by phone
- `GET /api/orders/open` - List open orders
- `GET /api/orders/{id}` - Get order details
- `PATCH /api/orders/{id}/status` - Update status

### Menu
- `GET /api/menu/toppings` - Available toppings
- `GET /api/menu/crusts` - Available crusts
- `GET /api/menu/sizes` - Available sizes

## Development Status

### ✅ Completed
- Backend API with all endpoints
- Database models and schemas
- Input validation and error handling
- API documentation with Swagger
- Frontend project setup
- TypeScript types
- API client service
- Environment configuration

### 🚧 In Progress
- React components (Pizza Builder, Order Form, etc.)
- Page routing
- UI styling with Carbon Design
- Complete integration testing

## Documentation

- [Architecture](ARCHITECTURE.md) - System architecture and design
- [Implementation Guide](IMPLEMENTATION_GUIDE.md) - Detailed implementation steps
- [Project Plan](PROJECT_PLAN.md) - Project overview and planning
- [Backend README](backend/README.md) - Backend-specific documentation
- [Frontend README](frontend/README.md) - Frontend-specific documentation (coming soon)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues or questions, please open an issue on GitHub.

---

**Pizza Palace** - Order your perfect pizza online! 🍕