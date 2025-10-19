
export enum OrderStatus {
  Pending = 'Pending',
  Shipped = 'Shipped',
  Delivered = 'Delivered',
}

export enum Purity {
  EIGHTEEN_K = '18K Gold',
  TWENTY_TWO_K = '22K Gold',
  TWENTY_FOUR_K = '24K Gold',
}

export interface Product {
  id: number;
  name: string;
  category: string;
  purity: Purity;
  weight: number;
  stock: number;
  price: number;
  priceChange: number;
  imageUrl: string;
}

export interface OrderItem {
  productId: number;
  quantity: number;
  pricePerItem: number;
}

export interface Order {
  id: string;
  customerId: number;
  customerName: string;
  date: string;
  items: OrderItem[];
  total: number;
  status: OrderStatus;
}

export interface Customer {
  id: number;
  name: string;
  avatarUrl: string;
  lastPurchase: string;
  totalOrders: number;
  phone?: string;
  email?: string;
}
