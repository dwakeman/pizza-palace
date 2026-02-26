# Pizza Palace Frontend

React frontend application for Pizza Palace online ordering system, built with TypeScript and IBM Carbon Design System.

## Features

- **Pizza Builder**: Interactive pizza customization with size, crust, and topping selection
- **Order Management**: Place orders with customer information
- **Order Tracking**: Track order status by phone number
- **Admin Dashboard**: Manage orders and update status
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Pricing**: See prices update as you customize

## Technology Stack

- **React 18** with TypeScript
- **IBM Carbon Design System** for UI components
- **React Router** for navigation
- **Axios** for API communication
- **Create React App** for build tooling

## Prerequisites

- Node.js 16 or higher
- npm or yarn
- Backend API running on http://localhost:8000

## Installation

1. **Install Dependencies**
```bash
npm install
```

2. **Configure Environment**
```bash
cp .env.example .env
```

Edit `.env` to point to your backend API:
```
REACT_APP_API_URL=http://localhost:8000/api
```

## Running the Application

### Development Mode
```bash
npm start
```

The application will open at http://localhost:3000

### Production Build
```bash
npm run build
```

The optimized build will be in the `build/` directory.

### Run Tests
```bash
npm test
```

## Project Structure

```
src/
├── components/           # Reusable components
│   ├── PizzaBuilder/    # Pizza customization components
│   │   ├── SizeSelector.tsx
│   │   ├── CrustSelector.tsx
│   │   ├── ToppingSelector.tsx
│   │   └── PizzaSummary.tsx
│   ├── OrderForm/       # Order form components
│   │   ├── CustomerInfo.tsx
│   │   └── OrderConfirmation.tsx
│   ├── OrderTracking/   # Order tracking components
│   │   └── OrderStatus.tsx
│   └── Admin/           # Admin components
│       └── OpenOrdersList.tsx
├── pages/               # Page components
│   ├── Home.tsx
│   ├── BuildPizza.tsx
│   ├── TrackOrder.tsx
│   └── AdminDashboard.tsx
├── services/            # API services
│   └── api.ts
├── types/               # TypeScript type definitions
│   └── index.ts
├── App.tsx              # Main app component with routing
├── App.css              # Global styles
└── index.tsx            # Entry point
```

## Available Routes

- `/` - Home page
- `/build` - Build and order pizza
- `/track` - Track order by phone number
- `/admin` - Admin dashboard for managing orders

## Components

### Pizza Builder Components

**SizeSelector**
- Radio button group for selecting pizza size
- Displays size name and base price

**CrustSelector**
- Dropdown for selecting crust type
- Shows price modifier for each crust

**ToppingSelector**
- Checkbox grid for selecting toppings
- Multi-select functionality
- Shows price per topping

**PizzaSummary**
- Displays current pizza configuration
- Shows calculated total price
- Lists selected toppings as tags

### Order Form Components

**CustomerInfo**
- Form inputs for customer details
- Validates name, phone, and address
- Shows error messages for invalid input

**OrderConfirmation**
- Modal dialog showing order confirmation
- Displays order ID and details
- Success message with next steps

### Order Tracking Components

**OrderStatus**
- Shows order progress with visual indicator
- Displays order details and pizzas
- Updates in real-time

### Admin Components

**OpenOrdersList**
- Data table of all open orders
- Inline status update dropdown
- Shows customer info and order details

## API Integration

The application communicates with the backend API using Axios. All API calls are centralized in `src/services/api.ts`.

### API Methods

```typescript
// Orders
orderApi.createOrder(orderData)
orderApi.getOrdersByPhone(phone)
orderApi.getOpenOrders()
orderApi.updateOrderStatus(orderId, status)

// Menu
menuApi.getToppings()
menuApi.getCrusts()
menuApi.getSizes()
menuApi.getMenuData() // Get all menu data at once
```

## Styling

The application uses IBM Carbon Design System components and themes. Custom styles are in `App.css`.

### Carbon Components Used
- Header, HeaderNavigation
- Grid, Column
- Button, TextInput, Select, Checkbox
- DataTable
- Modal, Tile, Tag
- Loading, InlineNotification
- ProgressIndicator

## Environment Variables

- `REACT_APP_API_URL` - Backend API base URL (default: http://localhost:8000/api)

## Development Tips

### Hot Reload
Changes to source files automatically reload the browser.

### TypeScript
All components are written in TypeScript for type safety. Type definitions are in `src/types/index.ts`.

### Debugging
- Use React DevTools browser extension
- Check browser console for errors
- Use Network tab to inspect API calls

## Building for Production

1. **Build the application**
```bash
npm run build
```

2. **Test the production build**
```bash
npm install -g serve
serve -s build
```

3. **Deploy**
Upload the `build/` directory to your web server or hosting service.

## Troubleshooting

### API Connection Issues
- Verify backend is running on port 8000
- Check `REACT_APP_API_URL` in `.env`
- Look for CORS errors in browser console

### Build Errors
- Clear node_modules: `rm -rf node_modules && npm install`
- Clear cache: `npm cache clean --force`

### Styling Issues
- Ensure Carbon SCSS is imported in `index.tsx`
- Check that Carbon components are imported correctly

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Create a feature branch
2. Make your changes
3. Test thoroughly
4. Submit a pull request

## License

MIT
