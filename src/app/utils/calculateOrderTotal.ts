import { Order } from '../types/Order';

export function calculateOrderTotal (order: Order){
  return order.products.reduce((total, {product, quantity})=>{
    return total + (product.price * quantity);
  }, 0);
}
