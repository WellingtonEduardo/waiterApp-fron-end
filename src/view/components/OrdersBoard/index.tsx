import { OrderModal } from '../OrderModal';
import { Board, OrdersContainer } from './styles';
import { Order } from '../../../app/types/Order';
import { useOrdersBoardModalController } from './useOrdersBoardModalController';

interface OrdersBoardProps {
  icon: string;
  title: string;
  orders: Order[]
}


export function OrdersBoard({ icon, title, orders }: OrdersBoardProps) {

  const {
    isModalVisible,
    selectedOrder,
    handleOpenModal,
    handleCloseModal
  } = useOrdersBoardModalController();

  return (
    <Board>

      <OrderModal
        visible={isModalVisible}
        order={selectedOrder}
        onCloseModal={handleCloseModal}
      />

      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>

      {orders.length > 0 && (
        <OrdersContainer>
          {orders.map(order => (
            <button type='button' key={order._id} onClick={() => handleOpenModal(order)}>
              <strong>Mesa {order.table}</strong>
              <span>{order.products.length} itens</span>
            </button>
          ))}
        </OrdersContainer>
      )}
    </Board>
  );
}
