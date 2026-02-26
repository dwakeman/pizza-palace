# Pizza Palace - Complete Setup Guide

This guide will walk you through setting up the Pizza Palace application from scratch.

## Table of Contents
1. [Prerequisites](#prerequisites)
2. [Database Setup](#database-setup)
3. [Backend Setup](#backend-setup)
4. [Frontend Setup](#frontend-setup)
5. [Running the Application](#running-the-application)
6. [Testing](#testing)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

### Required Software
- **Python 3.9 or higher**
  - Check: `python --version` or `python3 --version`
  - Download: https://www.python.org/downloads/

- **Node.js 16 or higher**
  - Check: `node --version`
  - Download: https://nodejs.org/

- **PostgreSQL 13 or higher**
  - Check: `psql --version`
  - Download: https://www.postgresql.org/download/

- **Git** (optional, for cloning)
  - Check: `git --version`
  - Download: https://git-scm.com/downloads

### Recommended Tools
- **VS Code** or your preferred IDE
- **Postman** or **curl** for API testing
- **pgAdmin** for database management (optional)

## Database Setup

### 1. Start PostgreSQL Service

**macOS (Homebrew)**:
```bash
brew services start postgresql
```

**Linux**:
```bash
sudo systemctl start postgresql
```

**Windows**:
- Start PostgreSQL from Services or pgAdmin

### 2. Create Database

**Option A: Using psql**
```bash
# Connect to PostgreSQL
psql -U postgres

# Create database
CREATE DATABASE pizza_palace;

# Create user (optional)
CREATE USER pizza_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE pizza_palace TO pizza_user;

# Exit
\q
```

**Option B: Using pgAdmin**
1. Open pgAdmin
2. Right-click on "Databases"
3. Select "Create" > "Database"
4. Name: `pizza_palace`
5. Click "Save"

### 3. Verify Database
```bash
psql -U postgres -d pizza_palace -c "SELECT version();"
```

## Backend Setup

### 1. Navigate to Backend Directory
```bash
cd pizza-palace/backend
```

### 2. Create Virtual Environment (Recommended)

**macOS/Linux**:
```bash
python3 -m venv venv
source venv/bin/activate
```

**Windows**:
```bash
python -m venv venv
venv\Scripts\activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

If you encounter issues, try upgrading pip first:
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

### 4. Configure Environment Variables

Create `.env` file from example:
```bash
cp .env.example .env
```

Edit `.env` with your settings:
```env
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/pizza_palace
API_HOST=0.0.0.0
API_PORT=8000
CORS_ORIGINS=http://localhost:3000
```

**Important**: Replace `your_password` with your actual PostgreSQL password.

### 5. Initialize Database Tables

The tables will be created automatically when you first run the application. To verify:

```bash
python -c "from app.database import init_db; init_db(); print('Database initialized!')"
```

### 6. Verify Backend Setup

Run a quick test:
```bash
python -c "from app.config import settings; print(f'API will run on {settings.api_host}:{settings.api_port}')"
```

## Frontend Setup

### 1. Navigate to Frontend Directory
```bash
cd ../frontend
# Or from root: cd pizza-palace/frontend
```

### 2. Install Dependencies
```bash
npm install
```

If you encounter issues:
```bash
npm cache clean --force
npm install
```

### 3. Configure Environment Variables

Create `.env` file from example:
```bash
cp .env.example .env
```

Verify the content:
```env
REACT_APP_API_URL=http://localhost:8000/api
```

### 4. Verify Frontend Setup
```bash
npm run build
```

This should complete without errors.

## Running the Application

### Option 1: Run Both Services Separately

**Terminal 1 - Backend**:
```bash
cd backend
source venv/bin/activate  # On Windows: venv\Scripts\activate
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

**Terminal 2 - Frontend**:
```bash
cd frontend
npm start
```

### Option 2: Using Python Directly (Backend)
```bash
cd backend
python -m app.main
```

### Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs
- **Alternative API Docs**: http://localhost:8000/redoc

## Testing

### 1. Test Backend API

**Health Check**:
```bash
curl http://localhost:8000/health
```

Expected response:
```json
{"status": "healthy"}
```

**Get Menu Toppings**:
```bash
curl http://localhost:8000/api/menu/toppings
```

**Create Test Order**:
```bash
curl -X POST http://localhost:8000/api/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customer_name": "Test User",
    "customer_phone": "5551234567",
    "customer_address": "123 Test St",
    "pizzas": [{
      "size": "large",
      "crust_type": "thin_crust",
      "toppings": ["pepperoni", "mushrooms"]
    }]
  }'
```

### 2. Test Frontend

1. Open http://localhost:3000
2. Navigate through the application
3. Check browser console for errors (F12)

### 3. Test Database Connection

```bash
psql -U postgres -d pizza_palace -c "SELECT * FROM orders LIMIT 5;"
```

## Troubleshooting

### Backend Issues

#### "ModuleNotFoundError"
```bash
# Ensure virtual environment is activated
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate     # Windows

# Reinstall dependencies
pip install -r requirements.txt
```

#### "Connection refused" (Database)
```bash
# Check if PostgreSQL is running
pg_isready

# Start PostgreSQL
brew services start postgresql  # macOS
sudo systemctl start postgresql # Linux
```

#### "CORS Error"
- Verify `CORS_ORIGINS` in backend `.env` includes frontend URL
- Restart backend after changing `.env`

#### Port Already in Use
```bash
# Find process using port 8000
lsof -i :8000  # macOS/Linux
netstat -ano | findstr :8000  # Windows

# Kill the process or use different port
uvicorn app.main:app --reload --port 8001
```

### Frontend Issues

#### "npm install" Fails
```bash
# Clear cache and retry
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

#### "Module not found" Errors
```bash
# Reinstall specific package
npm install @carbon/react @carbon/icons-react

# Or reinstall all
rm -rf node_modules
npm install
```

#### Port 3000 Already in Use
```bash
# Use different port
PORT=3001 npm start
```

#### API Connection Fails
- Verify backend is running on port 8000
- Check `REACT_APP_API_URL` in frontend `.env`
- Check browser console for CORS errors

### Database Issues

#### "Database does not exist"
```bash
createdb pizza_palace
```

#### "Permission denied"
```bash
# Grant permissions
psql -U postgres -c "GRANT ALL PRIVILEGES ON DATABASE pizza_palace TO your_user;"
```

#### "Too many connections"
```bash
# Check active connections
psql -U postgres -c "SELECT count(*) FROM pg_stat_activity;"

# Restart PostgreSQL
brew services restart postgresql  # macOS
sudo systemctl restart postgresql # Linux
```

## Development Tips

### Hot Reload

Both backend and frontend support hot reload:
- **Backend**: Changes to Python files automatically reload the server
- **Frontend**: Changes to React files automatically refresh the browser

### Database Migrations

If you modify database models:
1. Stop the backend
2. Drop and recreate tables (development only):
```bash
psql -U postgres -d pizza_palace -c "DROP SCHEMA public CASCADE; CREATE SCHEMA public;"
```
3. Restart backend to recreate tables

### Debugging

**Backend**:
- Add `import pdb; pdb.set_trace()` for breakpoints
- Check logs in terminal
- Use `/docs` endpoint to test API

**Frontend**:
- Use React DevTools browser extension
- Check browser console (F12)
- Use Network tab to inspect API calls

## Production Deployment

### Backend
1. Set `DEBUG=False` in production
2. Use production WSGI server (Gunicorn)
3. Set up proper database credentials
4. Configure HTTPS
5. Set up monitoring and logging

### Frontend
1. Build production bundle: `npm run build`
2. Serve static files with Nginx or similar
3. Configure environment variables
4. Enable HTTPS
5. Set up CDN (optional)

### Database
1. Use managed PostgreSQL service (AWS RDS, etc.)
2. Set up regular backups
3. Configure connection pooling
4. Enable SSL connections

## Next Steps

1. ✅ Complete frontend components (in progress)
2. ✅ Add comprehensive testing
3. ✅ Set up CI/CD pipeline
4. ✅ Add user authentication (future enhancement)
5. ✅ Implement payment processing (future enhancement)

## Getting Help

- Check [ARCHITECTURE.md](ARCHITECTURE.md) for system design
- Review [IMPLEMENTATION_GUIDE.md](IMPLEMENTATION_GUIDE.md) for details
- Open an issue on GitHub
- Check API documentation at http://localhost:8000/docs

---

Happy coding! 🍕