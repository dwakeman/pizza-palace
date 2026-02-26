from typing import Dict, List


# Available toppings with prices
AVAILABLE_TOPPINGS: Dict[str, float] = {
    "pepperoni": 1.50,
    "italian_sausage": 1.50,
    "ham": 1.50,
    "bacon": 1.50,
    "ground_beef": 1.50,
    "grilled_chicken": 1.50,
    "mushrooms": 1.50,
    "green_peppers": 1.50,
    "red_onions": 1.50,
    "black_olives": 1.50,
    "tomatoes": 1.50,
    "spinach": 1.50,
    "jalapenos": 1.50,
    "pineapple": 1.50,
    "extra_cheese": 1.50,
    "feta_cheese": 1.50,
}


# Available crust types with price modifiers
AVAILABLE_CRUSTS: Dict[str, float] = {
    "thin_crust": 0.00,
    "new_york_style": 1.00,
    "deep_dish": 2.00,
    "cheese_stuffed": 3.00,
    "gluten_free": 2.50,
}


# Pizza sizes with base prices
PIZZA_SIZES: Dict[str, float] = {
    "small": 8.99,
    "medium": 12.99,
    "large": 16.99,
}


def get_topping_display_name(topping_key: str) -> str:
    """Convert topping key to display name"""
    return topping_key.replace("_", " ").title()


def get_crust_display_name(crust_key: str) -> str:
    """Convert crust key to display name"""
    return crust_key.replace("_", " ").title()


def calculate_pizza_price(size: str, crust_type: str, toppings: List[str]) -> float:
    """Calculate the total price for a pizza"""
    if size not in PIZZA_SIZES:
        raise ValueError(f"Invalid size: {size}")
    if crust_type not in AVAILABLE_CRUSTS:
        raise ValueError(f"Invalid crust type: {crust_type}")
    
    # Start with base price for size
    price = PIZZA_SIZES[size]
    
    # Add crust modifier
    price += AVAILABLE_CRUSTS[crust_type]
    
    # Add topping prices
    for topping in toppings:
        if topping not in AVAILABLE_TOPPINGS:
            raise ValueError(f"Invalid topping: {topping}")
        price += AVAILABLE_TOPPINGS[topping]
    
    return round(price, 2)

# Made with Bob
