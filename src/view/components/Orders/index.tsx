import { OrdersBoard } from '../OrdersBoard';
import { Container } from './styles';
import { useOrdersController } from './useOrdersController';


export function Orders() {

  const {
    waiting,
    inProduction,
    done,
    handleCancelOrder,
    handleOrderStatusChange
  } = useOrdersController();


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
