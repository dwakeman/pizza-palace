from sqlalchemy import Column, String, Enum, DECIMAL, DateTime, Text
from sqlalchemy.orm import relationship
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid
import enum

from app.database import Base


class OrderStatus(str, enum.Enum):
    OPEN = "open"
    PREPARING = "preparing"
    OUT_FOR_DELIVERY = "out_for_delivery"
    DELIVERED = "delivered"
    CANCELLED = "cancelled"


class Order(Base):
    __tablename__ = "orders"
    
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    customer_name = Column(String(255), nullable=False)
    customer_phone = Column(String(20), nullable=False, index=True)
    customer_address = Column(Text, nullable=False)
    status = Column(Enum(OrderStatus), default=OrderStatus.OPEN, nullable=False)
    total_price = Column(DECIMAL(10, 2), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)
    
    # Relationship to pizzas
    pizzas = relationship("Pizza", back_populates="order", cascade="all, delete-orphan")

# Made with Bob
