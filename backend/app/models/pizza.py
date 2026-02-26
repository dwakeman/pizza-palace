from sqlalchemy import Column, String, Enum, DECIMAL, ForeignKey, Table
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
import enum

from app.database import Base


class PizzaSize(str, enum.Enum):
    SMALL = "small"
    MEDIUM = "medium"
    LARGE = "large"


# Association table for pizza toppings (many-to-many relationship)
pizza_toppings = Table(
    'pizza_toppings',
    Base.metadata,
    Column('pizza_id', UUID(as_uuid=True), ForeignKey('pizzas.id', ondelete='CASCADE'), primary_key=True),
    Column('topping_name', String(50), primary_key=True)
)


class Pizza(Base):
    __tablename__ = "pizzas"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=lambda: __import__('uuid').uuid4())
    order_id = Column(UUID(as_uuid=True), ForeignKey('orders.id', ondelete='CASCADE'), nullable=False)
    size = Column(Enum(PizzaSize), nullable=False)
    crust_type = Column(String(50), nullable=False)
    base_price = Column(DECIMAL(10, 2), nullable=False)
    
    # Relationships
    order = relationship("Order", back_populates="pizzas")
    
    # Store toppings as a simple list of strings
    @property
    def toppings(self):
        # This will be populated from the pizza_toppings table
        return []

# Made with Bob
