# Pizza Palace Backend API

FastAPI backend for the Pizza Palace online ordering system.

## Features

- Create pizza orders with custom toppings and crust types
- Retrieve orders by customer phone number
- List all open orders (for admin dashboard)
- Update order status
- Get available menu items (toppings, crusts, sizes)
- Automatic price calculation
- Input validation with Pydantic
- Interactive API documentation with Swagger UI

## Prerequisites

- Python 3.9 or higher
- PostgreSQL 13 or higher

## Setup

### 1. Install Dependencies

```bash
cd backend
pip install -r requirements.txt
```

### 2. Configure Database

Create a PostgreSQL database:

```sql
CREATE DATABASE pizza_palace;
```

### 3. Environment Configuration

Copy the example environment file and update with your settings:

```bash
cp .env.example .env
```

Edit `.env` with your database credentials:

```
DATABASE_URL=postgresql://username:password@localhost:5432/pizza_palace
API_HOST=0.0.0.0
API_PORT=8000
CORS_ORIGINS=http://localhost:3000
```

### 4. Initialize Database

The database tables will be created automatically when you start the application for the first time.

## Running the Application

### Development Mode

```bash
cd backend
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Or using Python directly:

```bash
cd backend
python -m app.main
```

The API will be available at:
- API: http://localhost:8000
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## API Endpoints

### Orders

- `POST /api/orders` - Create a new order
- `GET /api/orders/phone/{phone_number}` - Get orders by phone number
- `GET /api/orders/open` - List all open orders
- `GET /api/orders/{order_id}` - Get specific order
- `PATCH /api/orders/{order_id}/status` - Update order status

### Menu

- `GET /api/menu/toppings` - Get available toppings
- `GET /api/menu/crusts` - Get available crust types
- `GET /api/menu/sizes` - Get available sizes

## Example API Usage

### Create an Order

```bash
curl -X POST "http://localhost:8000/api/orders" \
  -H "Content-Type: application/json" \
  -d '{
    "customer_name": "John Doe",
    "customer_phone": "5551234567",
    "customer_address": "123 Main St, City, State 12345",
    "pizzas": [
      {
        "size": "large",
        "crust_type": "thin_crust",
        "toppings": ["pepperoni", "mushrooms", "extra_cheese"]
      }
    ]
  }'
```

### Get Orders by Phone

```bash
curl "http://localhost:8000/api/orders/phone/5551234567"
```

### Get Available Toppings

```bash
curl "http://localhost:8000/api/menu/toppings"
```

## Project Structure

```
backend/
├── app/
│   ├── __init__.py
│   ├── main.py              # FastAPI application
│   ├── config.py            # Configuration settings
│   ├── database.py          # Database connection
│   ├── models/              # SQLAlchemy models
│   │   ├── order.py
│   │   ├── pizza.py
│   │   └── menu.py
│   ├── schemas/             # Pydantic schemas
│   │   ├── order.py
│   │   ├── pizza.py
│   │   └── menu.py
│   ├── routers/             # API endpoints
│   │   ├── orders.py
│   │   └── menu.py
│   └── services/            # Business logic
│       ├── order_service.py
│       └── menu_service.py
├── requirements.txt
├── .env.example
└── README.md
```

## Pizza Configuration

### Sizes and Base Prices
- Small: $8.99
- Medium: $12.99
- Large: $16.99

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

## Order Status Flow

```
open → preparing → out_for_delivery → delivered
                 → cancelled (from any status)
```

## Development

### Running Tests

```bash
pytest
```

### Code Formatting

```bash
black app/
```

### Type Checking

```bash
mypy app/
```

## Troubleshooting

### Database Connection Issues

- Verify PostgreSQL is running: `pg_isready`
- Check database exists: `psql -l`
- Verify connection string in `.env`

### CORS Errors

- Ensure frontend URL is in `CORS_ORIGINS` in `.env`
- Check that CORS middleware is configured in `main.py`

### Import Errors

- Ensure you're in the backend directory
- Verify all dependencies are installed: `pip install -r requirements.txt`

## License

MIT