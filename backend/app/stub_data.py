"""
Stub data for testing the frontend without a database.
This module provides in-memory storage and hardcoded data.
"""
from typing import Dict, List, Optional
from uuid import UUID, uuid4
from datetime import datetime
from decimal import Decimal

from app.models.order import OrderStatus
from app.models.pizza import PizzaSize
from app.models.menu import (
    AVAILABLE_TOPPINGS,
    AVAILABLE_CRUSTS,
    PIZZA_SIZES,
    calculate_pizza_price,
    get_topping_display_name,
    get_crust_display_name
)
from app.schemas.menu import ToppingItem, CrustItem, SizeItem
from app.schemas.order import OrderCreate
from app.schemas.pizza import PizzaResponse


# In-memory storage for orders
orders_db: Dict[UUID, "StubOrder"] = {}


class StubOrder:
    """Stub order class to mimic database model"""
    def __init__(self, order_id: UUID, customer_name: str, customer_phone: str,
                 customer_address: str, status: OrderStatus, total_price: Decimal,
                 pizzas: List[dict], created_at: datetime, updated_at: datetime):
        self.id = order_id
        self.customer_name = customer_name
        self.customer_phone = customer_phone
        self.customer_address = customer_address
        self.status = status
        self.total_price = total_price
        self.pizzas = pizzas
        self.created_at = created_at
        self.updated_at = updated_at


def get_stub_toppings() -> Dict[str, ToppingItem]:
    """Get all available toppings"""
    return {
        name: ToppingItem(
            name=name,
            display_name=get_topping_display_name(name),
            price=price
        )
        for name, price in AVAILABLE_TOPPINGS.items()
    }


def get_stub_crusts() -> Dict[str, CrustItem]:
    """Get all available crust types"""
    return {
        name: CrustItem(
            name=name,
            display_name=get_crust_display_name(name),
            price_modifier=price
        )
        for name, price in AVAILABLE_CRUSTS.items()
    }


def get_stub_sizes() -> Dict[str, SizeItem]:
    """Get all available pizza sizes"""
    return {
        name: SizeItem(
            name=name,
            display_name=name.title(),
            base_price=price
        )
        for name, price in PIZZA_SIZES.items()
    }


def create_stub_order(order_data: OrderCreate) -> StubOrder:
    """Create a new order in memory"""
    order_id = uuid4()
    total_price = Decimal(0)
    pizzas = []
    
    # Create pizzas
    for pizza_data in order_data.pizzas:
        pizza_price = calculate_pizza_price(
            pizza_data.size.value,
            pizza_data.crust_type,
            pizza_data.toppings
        )
        
        pizza = {
            "id": uuid4(),
            "size": pizza_data.size,
            "crust_type": pizza_data.crust_type,
            "toppings": pizza_data.toppings,
            "base_price": Decimal(str(pizza_price))
        }
        
        pizzas.append(pizza)
        total_price += Decimal(str(pizza_price))
    
    # Create order
    now = datetime.utcnow()
    order = StubOrder(
        order_id=order_id,
        customer_name=order_data.customer_name,
        customer_phone=order_data.customer_phone,
        customer_address=order_data.customer_address,
        status=OrderStatus.OPEN,
        total_price=total_price,
        pizzas=pizzas,
        created_at=now,
        updated_at=now
    )
    
    # Store in memory
    orders_db[order_id] = order
    
    return order


def get_stub_order_by_id(order_id: UUID) -> Optional[StubOrder]:
    """Get order by ID"""
    return orders_db.get(order_id)


def get_stub_orders_by_phone(phone: str) -> List[StubOrder]:
    """Get all orders for a phone number"""
    return [
        order for order in orders_db.values()
        if order.customer_phone == phone
    ]


def get_stub_open_orders() -> List[StubOrder]:
    """Get all open orders"""
    return [
        order for order in orders_db.values()
        if order.status == OrderStatus.OPEN
    ]


def update_stub_order_status(order_id: UUID, status: OrderStatus) -> Optional[StubOrder]:
    """Update order status"""
    order = orders_db.get(order_id)
    
    if not order:
        return None
    
    order.status = status
    order.updated_at = datetime.utcnow()
    
    return order


# Initialize with some sample orders for testing
def init_sample_data():
    """Initialize with sample orders"""
    sample_order_id = uuid4()
    now = datetime.utcnow()
    
    sample_order = StubOrder(
        order_id=sample_order_id,
        customer_name="John Doe",
        customer_phone="5551234567",
        customer_address="123 Main St, Anytown, USA",
        status=OrderStatus.OPEN,
        total_price=Decimal("25.48"),
        pizzas=[
            {
                "id": uuid4(),
                "size": PizzaSize.LARGE,
                "crust_type": "thin_crust",
                "toppings": ["pepperoni", "mushrooms", "extra_cheese"],
                "base_price": Decimal("21.49")
            },
            {
                "id": uuid4(),
                "size": PizzaSize.SMALL,
                "crust_type": "new_york_style",
                "toppings": [],
                "base_price": Decimal("9.99")
            }
        ],
        created_at=now,
        updated_at=now
    )
    
    orders_db[sample_order_id] = sample_order


# Initialize sample data on module load
init_sample_data()

# Made with Bob