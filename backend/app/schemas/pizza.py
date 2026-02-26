from pydantic import BaseModel, Field, field_validator
from typing import List
from decimal import Decimal
from uuid import UUID

from app.models.pizza import PizzaSize
from app.models.menu import AVAILABLE_TOPPINGS, AVAILABLE_CRUSTS


class PizzaCreate(BaseModel):
    size: PizzaSize
    crust_type: str
    toppings: List[str] = Field(default_factory=list)
    
    @field_validator('crust_type')
    @classmethod
    def validate_crust_type(cls, v):
        if v not in AVAILABLE_CRUSTS:
            raise ValueError(f"Invalid crust type. Must be one of: {', '.join(AVAILABLE_CRUSTS.keys())}")
        return v
    
    @field_validator('toppings')
    @classmethod
    def validate_toppings(cls, v):
        invalid_toppings = [t for t in v if t not in AVAILABLE_TOPPINGS]
        if invalid_toppings:
            raise ValueError(f"Invalid toppings: {', '.join(invalid_toppings)}")
        return v


class PizzaResponse(BaseModel):
    id: UUID
    size: PizzaSize
    crust_type: str
    toppings: List[str]
    base_price: Decimal
    
    class Config:
        from_attributes = True

# Made with Bob
