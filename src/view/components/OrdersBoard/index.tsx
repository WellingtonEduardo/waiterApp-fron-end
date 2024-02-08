import { OrderModal } from '../OrderModal';
import { Board, OrdersContainer } from './styles';
import { Order } from '../../../app/types/Order';
import { useOrdersBoardController } from './useOrdersBoardController';

interface OrdersBoardProps {
  icon: string;
  title: string;
  orders: Order[];
  onCancelOrder(orderId: string): void;
  onOrderStatusChange({ orderId, status }: { orderId: string, status: Order['status'] }): void
}


export function OrdersBoard({ icon, title, orders, onCancelOrder, onOrderStatusChange }: OrdersBoardProps) {

  const {
    isModalVisible,
    selectedOrder,
    isLoading,
    handleOpenModal,
    handleCloseModal,
    handleCancelOrder,
    handleChangeOrderStatus
  } = useOrdersBoardController({ onCancelOrder, onOrderStatusChange });

  return (
    <Board>

      <OrderModal
        visible={isModalVisible}
        order={selectedOrder}
        isLoading={isLoading}
        onCloseModal={handleCloseModal}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleChangeOrderStatus}
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
