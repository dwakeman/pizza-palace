from fastapi import APIRouter, HTTPException, status
from typing import List
from uuid import UUID

from app.schemas import OrderCreate, OrderResponse, OrderStatusUpdate, PizzaResponse
from app.stub_data import (
    create_stub_order,
    get_stub_order_by_id,
    get_stub_orders_by_phone,
    get_stub_open_orders,
    update_stub_order_status
)

router = APIRouter(prefix="/orders", tags=["orders"])


def convert_stub_order_to_response(order) -> OrderResponse:
    """Convert stub order to response format"""
    pizzas_with_toppings = []
    
    for pizza in order.pizzas:
        pizza_dict = {
            "id": pizza["id"],
            "size": pizza["size"],
            "crust_type": pizza["crust_type"],
            "toppings": pizza["toppings"],
            "base_price": pizza["base_price"]
        }
        pizzas_with_toppings.append(PizzaResponse(**pizza_dict))
    
    return OrderResponse(
        id=order.id,
        customer_name=order.customer_name,
        customer_phone=order.customer_phone,
        customer_address=order.customer_address,
        status=order.status,
        total_price=order.total_price,
        pizzas=pizzas_with_toppings,
        created_at=order.created_at,
        updated_at=order.updated_at
    )


@router.post("", response_model=OrderResponse, status_code=status.HTTP_201_CREATED)
def create_new_order(order_data: OrderCreate):
    """
    Create a new pizza order.
    
    - **customer_name**: Customer's full name
    - **customer_phone**: 10-digit phone number
    - **customer_address**: Delivery address
    - **pizzas**: List of pizzas to order (at least one required)
    """
    try:
        order = create_stub_order(order_data)
        return convert_stub_order_to_response(order)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create order: {str(e)}"
        )


@router.get("/phone/{phone_number}", response_model=List[OrderResponse])
def get_orders_by_phone_number(phone_number: str):
    """
    Get all orders for a specific phone number.
    
    - **phone_number**: Customer's phone number (10 digits)
    """
    # Normalize phone number
    phone = phone_number.replace("-", "").replace(".", "").replace(" ", "").replace("(", "").replace(")", "")
    
    if len(phone) != 10 or not phone.isdigit():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Phone number must be 10 digits"
        )
    
    orders = get_stub_orders_by_phone(phone)
    return [convert_stub_order_to_response(order) for order in orders]


@router.get("/open", response_model=List[OrderResponse])
def get_all_open_orders():
    """
    Get all orders with 'open' status.
    
    This endpoint is typically used by the admin dashboard.
    """
    orders = get_stub_open_orders()
    return [convert_stub_order_to_response(order) for order in orders]


@router.get("/{order_id}", response_model=OrderResponse)
def get_order(order_id: UUID):
    """
    Get a specific order by ID.
    
    - **order_id**: UUID of the order
    """
    order = get_stub_order_by_id(order_id)
    
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
    
    return convert_stub_order_to_response(order)


@router.patch("/{order_id}/status", response_model=OrderResponse)
def update_order_status_endpoint(
    order_id: UUID,
    status_update: OrderStatusUpdate
):
    """
    Update the status of an order.
    
    - **order_id**: UUID of the order
    - **status**: New status (open, preparing, out_for_delivery, delivered, cancelled)
    """
    order = update_stub_order_status(order_id, status_update.status)
    
    if not order:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Order not found"
        )
    
    return convert_stub_order_to_response(order)

# Made with Bob
