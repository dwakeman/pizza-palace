from sqlalchemy.orm import Session
from typing import List, Optional
from uuid import UUID
from decimal import Decimal

from app.models import Order, Pizza, OrderStatus, calculate_pizza_price, pizza_toppings
from app.schemas import OrderCreate, PizzaCreate


def create_order(db: Session, order_data: OrderCreate) -> Order:
    """Create a new order with pizzas"""
    
    # Calculate total price
    total_price = Decimal(0)
    
    # Create order
    order = Order(
        customer_name=order_data.customer_name,
        customer_phone=order_data.customer_phone,
        customer_address=order_data.customer_address,
        status=OrderStatus.OPEN,
        total_price=0  # Will be updated after calculating pizza prices
    )
    
    db.add(order)
    db.flush()  # Get order ID without committing
    
    # Create pizzas
    for pizza_data in order_data.pizzas:
        pizza_price = calculate_pizza_price(
            pizza_data.size.value,
            pizza_data.crust_type,
            pizza_data.toppings
        )
        
        pizza = Pizza(
            order_id=order.id,
            size=pizza_data.size,
            crust_type=pizza_data.crust_type,
            base_price=Decimal(str(pizza_price))
        )
        
        db.add(pizza)
        db.flush()  # Get pizza ID
        
        # Add toppings to junction table
        for topping in pizza_data.toppings:
            db.execute(
                pizza_toppings.insert().values(
                    pizza_id=pizza.id,
                    topping_name=topping
                )
            )
        
        total_price += Decimal(str(pizza_price))
    
    # Update order total price
    order.total_price = total_price
    
    db.commit()
    db.refresh(order)
    
    return order


def get_order_by_id(db: Session, order_id: UUID) -> Optional[Order]:
    """Get order by ID"""
    return db.query(Order).filter(Order.id == order_id).first()


def get_orders_by_phone(db: Session, phone: str) -> List[Order]:
    """Get all orders for a phone number"""
    return db.query(Order).filter(Order.customer_phone == phone).order_by(Order.created_at.desc()).all()


def get_open_orders(db: Session) -> List[Order]:
    """Get all open orders"""
    return db.query(Order).filter(Order.status == OrderStatus.OPEN).order_by(Order.created_at.desc()).all()


def update_order_status(db: Session, order_id: UUID, status: OrderStatus) -> Optional[Order]:
    """Update order status"""
    order = db.query(Order).filter(Order.id == order_id).first()
    
    if not order:
        return None
    
    order.status = status
    db.commit()
    db.refresh(order)
    
    return order


def get_pizza_toppings(db: Session, pizza_id: UUID) -> List[str]:
    """Get toppings for a pizza"""
    result = db.execute(
        pizza_toppings.select().where(pizza_toppings.c.pizza_id == pizza_id)
    )
    return [row.topping_name for row in result]

# Made with Bob
