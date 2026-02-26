from pydantic import BaseModel, Field, field_validator
from typing import List
from decimal import Decimal
from datetime import datetime
from uuid import UUID
import re

from app.models.order import OrderStatus
from app.schemas.pizza import PizzaCreate, PizzaResponse


class OrderCreate(BaseModel):
    customer_name: str = Field(..., min_length=1, max_length=255)
    customer_phone: str = Field(..., min_length=10, max_length=20)
    customer_address: str = Field(..., min_length=5)
    pizzas: List[PizzaCreate] = Field(..., min_length=1)
    
    @field_validator('customer_phone')
    @classmethod
    def validate_phone(cls, v):
        # Remove common separators
        phone = re.sub(r'[\s\-\.\(\)]', '', v)
        # Check if it's a valid phone number (10 digits)
        if not re.match(r'^\d{10}$', phone):
            raise ValueError('Phone number must be 10 digits')
        return phone
    
    @field_validator('customer_name')
    @classmethod
    def validate_name(cls, v):
        if not v.strip():
            raise ValueError('Customer name cannot be empty')
        return v.strip()
    
    @field_validator('customer_address')
    @classmethod
    def validate_address(cls, v):
        if not v.strip():
            raise ValueError('Customer address cannot be empty')
        return v.strip()


class OrderResponse(BaseModel):
    id: UUID
    customer_name: str
    customer_phone: str
    customer_address: str
    status: OrderStatus
    total_price: Decimal
    pizzas: List[PizzaResponse]
    created_at: datetime
    updated_at: datetime
    
    class Config:
        from_attributes = True


class OrderStatusUpdate(BaseModel):
    status: OrderStatus

# Made with Bob
