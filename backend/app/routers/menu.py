from fastapi import APIRouter
from typing import Dict

from app.schemas.menu import ToppingItem, CrustItem, SizeItem
from app.stub_data import get_stub_toppings, get_stub_crusts, get_stub_sizes

router = APIRouter(prefix="/menu", tags=["menu"])


@router.get("/toppings", response_model=Dict[str, ToppingItem])
def get_available_toppings():
    """
    Get all available pizza toppings with prices.
    
    Returns a dictionary where keys are topping names and values contain:
    - **name**: Internal topping name
    - **display_name**: Human-readable name
    - **price**: Additional cost for this topping
    """
    return get_stub_toppings()


@router.get("/crusts", response_model=Dict[str, CrustItem])
def get_available_crusts():
    """
    Get all available crust types with price modifiers.
    
    Returns a dictionary where keys are crust names and values contain:
    - **name**: Internal crust name
    - **display_name**: Human-readable name
    - **price_modifier**: Additional cost for this crust type
    """
    return get_stub_crusts()


@router.get("/sizes", response_model=Dict[str, SizeItem])
def get_available_sizes():
    """
    Get all available pizza sizes with base prices.
    
    Returns a dictionary where keys are size names and values contain:
    - **name**: Size name (small, medium, large)
    - **display_name**: Human-readable name
    - **base_price**: Base price for this size before toppings and crust
    """
    return get_stub_sizes()

# Made with Bob
