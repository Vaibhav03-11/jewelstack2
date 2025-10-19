
import { Product, Purity, Order, OrderStatus, Customer } from './types';

export const mockProducts: Product[] = [
  { id: 1, name: 'Classic Gold Bangle', category: 'Bangle', purity: Purity.TWENTY_TWO_K, weight: 15.5, stock: 8, price: 85250, priceChange: 1.2, imageUrl: `https://picsum.photos/seed/p1/200` },
  { id: 2, name: 'Elegant Diamond Ring', category: 'Rings', purity: Purity.EIGHTEEN_K, weight: 4.2, stock: 12, price: 55000, priceChange: -0.5, imageUrl: `https://picsum.photos/seed/p2/200` },
  { id: 3, name: 'Royal Ruby Necklace', category: 'Necklace', purity: Purity.TWENTY_TWO_K, weight: 25.0, stock: 3, price: 180000, priceChange: 2.1, imageUrl: `https://picsum.photos/seed/p3/200` },
  { id: 4, name: '24K Gold Coin', category: 'Coin', purity: Purity.TWENTY_FOUR_K, weight: 10.0, stock: 25, price: 65000, priceChange: 0.8, imageUrl: `https://picsum.photos/seed/p4/200` },
  { id: 5, name: 'Studded Earrings', category: 'Earrings', purity: Purity.EIGHTEEN_K, weight: 6.8, stock: 0, price: 42000, priceChange: -1.1, imageUrl: `https://picsum.photos/seed/p5/200` },
];

export const mockOrders: Order[] = [
    { id: 'JS-1024', customerName: 'Rohan Sharma', date: '2 days ago', total: 55000, status: OrderStatus.Shipped },
    { id: 'JS-1023', customerName: 'Priya Mehta', date: '5 days ago', total: 180000, status: OrderStatus.Delivered },
    { id: 'JS-1022', customerName: 'Anjali Desai', date: '1 week ago', total: 85250, status: OrderStatus.Delivered },
    { id: 'JS-1025', customerName: 'Vikram Singh', date: 'Upcoming', total: 42000, status: OrderStatus.Pending },
];

export const mockCustomers: Customer[] = [
  { id: 1, name: 'Rohan Sharma', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026704d', lastPurchase: '2 days ago', totalOrders: 5 },
  { id: 2, name: 'Priya Mehta', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026705d', lastPurchase: '5 days ago', totalOrders: 8 },
  { id: 3, name: 'Anjali Desai', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026706d', lastPurchase: '1 week ago', totalOrders: 3 },
  { id: 4, name: 'Vikram Singh', avatarUrl: 'https://i.pravatar.cc/150?u=a042581f4e29026707d', lastPurchase: '1 month ago', totalOrders: 2 },
];
