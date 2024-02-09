import { useEffect, useState } from 'react';
import socketIo from 'socket.io-client';

import { Order } from '../../../app/types/Order';
import { ordersService } from '../../../app/services/ordersService';


export function useOrdersController() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    async function getAllOrders() {
      const data = await ordersService.getAll();
      setOrders(data);
    }

    getAllOrders();

  }, []);


  useEffect(() => {
    const socket = socketIo(import.meta.env.VITE_API_URL, {
      transports: ['websocket']
    });

    socket.on('orders@new', (order) => {
      setOrders(prevState => prevState.concat(order));
    });

  }, []);




  const waiting = orders.filter(order => order.status === 'WAITING');
  const inProduction = orders.filter(order => order.status === 'IN_PRODUCTION');
  const done = orders.filter(order => order.status === 'DONE');


  function handleCancelOrder(orderId: string) {
    setOrders((prevState) => prevState.filter(order => order._id !== orderId));
  }

  function handleOrderStatusChange({ orderId, status }: { orderId: string, status: Order['status'] }) {

    setOrders((prevState) => prevState.map(order => (order._id === orderId
      ? { ...order, status }
      : order
    )));
  }


  return {
    waiting,
    inProduction,
    done,
    handleCancelOrder,
    handleOrderStatusChange
  };

}
