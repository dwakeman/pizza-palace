export enum PizzaSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large',
}

export enum OrderStatus {
  OPEN = 'open',
  PREPARING = 'preparing',
  OUT_FOR_DELIVERY = 'out_for_delivery',
  DELIVERED = 'delivered',
  CANCELLED = 'cancelled',
}

export interface ToppingItem {
  name: string;
  display_name: string;
  price: number;
}

export interface CrustItem {
  name: string;
  display_name: string;
  price_modifier: number;
}

export interface SizeItem {
  name: string;
  display_name: string;
  base_price: number;
}

export interface Pizza {
  id?: string;
  size: PizzaSize;
  crust_type: string;
  toppings: string[];
  base_price?: number;
}

export interface Order {
  id?: string;
  customer_name: string;
  customer_phone: string;
  customer_address: string;
  status?: OrderStatus;
  total_price?: number;
  pizzas: Pizza[];
  created_at?: string;
  updated_at?: string;
}

export interface MenuData {
  toppings: Record<string, ToppingItem>;
  crusts: Record<string, CrustItem>;
  sizes: Record<string, SizeItem>;
}

// Made with Bob
