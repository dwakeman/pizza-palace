from pydantic import BaseModel
from typing import Dict


class ToppingItem(BaseModel):
    name: str
    display_name: str
    price: float


class CrustItem(BaseModel):
    name: str
    display_name: str
    price_modifier: float


class SizeItem(BaseModel):
    name: str
    display_name: str
    base_price: float


class MenuResponse(BaseModel):
    toppings: Dict[str, ToppingItem]
    crusts: Dict[str, CrustItem]
    sizes: Dict[str, SizeItem]

# Made with Bob
