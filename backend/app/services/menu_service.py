from typing import Dict
from app.models.menu import (
    AVAILABLE_TOPPINGS,
    AVAILABLE_CRUSTS,
    PIZZA_SIZES,
    get_topping_display_name,
    get_crust_display_name
)
from app.schemas.menu import ToppingItem, CrustItem, SizeItem


def get_toppings() -> Dict[str, ToppingItem]:
    """Get all available toppings"""
    return {
        name: ToppingItem(
            name=name,
            display_name=get_topping_display_name(name),
            price=price
        )
        for name, price in AVAILABLE_TOPPINGS.items()
    }


def get_crusts() -> Dict[str, CrustItem]:
    """Get all available crust types"""
    return {
        name: CrustItem(
            name=name,
            display_name=get_crust_display_name(name),
            price_modifier=price
        )
        for name, price in AVAILABLE_CRUSTS.items()
    }


def get_sizes() -> Dict[str, SizeItem]:
    """Get all available pizza sizes"""
    return {
        name: SizeItem(
            name=name,
            display_name=name.title(),
            base_price=price
        )
        for name, price in PIZZA_SIZES.items()
    }

# Made with Bob
