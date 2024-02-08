
import { useEffect, useState } from 'react';
import socketIo from 'socket.io-client';

import { OrdersBoard } from '../OrdersBoard';
import { Container } from './styles';
import { Order } from '../../../app/types/Order';
import { httpClient } from '../../../app/services/httpClient';



export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    httpClient.get('/orders')
      .then(({ data }) => {
        setOrders(data);
      });

  }, []);


  useEffect(() => {
    const socket = socketIo('http://localhost:3001', {
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

  return (
    <Container>
      <OrdersBoard
        icon='🕒'
        title='Fila de espera'
        orders={waiting}
        onCancelOrder={handleCancelOrder}
        onOrderStatusChange={handleOrderStatusChange}
      />
      <OrdersBoard
        icon='👨‍🍳'
        title='Em preparação'
        orders={inProduction}
        onCancelOrder={handleCancelOrder}
        onOrderStatusChange={handleOrderStatusChange}

      />

      <OrdersBoard
        icon='✔'
        title='Pronto!'
        orders={done}
        onCancelOrder={handleCancelOrder}
        onOrderStatusChange={handleOrderStatusChange}

      />

    </Container>
  );
}
