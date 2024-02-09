import { toast } from 'react-toastify';
import { Order } from '../../../app/types/Order';
import { useCallback, useState } from 'react';
import { ordersService } from '../../../app/services/ordersService';


interface useOrdersBoardControllerProps {
  onCancelOrder(orderId: string): void;
  onOrderStatusChange({ orderId, status }: { orderId: string, status: Order['status'] }): void

}


export function useOrdersBoardController({ onCancelOrder, onOrderStatusChange }: useOrdersBoardControllerProps) {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<null | Order>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleOpenModal(order: Order) {
    setSelectedOrder(order);
    setIsModalVisible(true);
  }

  const handleCloseModal = useCallback(() => {
    setSelectedOrder(null);
    setIsModalVisible(false);
  }, []);



  async function handleChangeOrderStatus() {
    setIsLoading(true);

    const newStatus = selectedOrder?.status === 'WAITING'
      ? 'IN_PRODUCTION'
      : 'DONE';

    await ordersService.update({
      orderId: selectedOrder!._id,
      newStatus,
    });

    toast.success(`O pedido da mesa ${selectedOrder?.table} teve o status alterado!`);
    onOrderStatusChange({ orderId: selectedOrder!._id, status: newStatus });
    setIsLoading(false);
    handleCloseModal();

  }



  async function handleCancelOrder() {
    setIsLoading(true);

    await ordersService.remove({
      orderId: selectedOrder!._id,
    });
    toast.success(`O pedido da mesa ${selectedOrder?.table} foi cancelado!`);
    onCancelOrder(selectedOrder!._id);
    setIsLoading(false);
    handleCloseModal();
  }

  return {
    isModalVisible,
    selectedOrder,
    isLoading,
    handleOpenModal,
    handleCloseModal,
    handleCancelOrder,
    handleChangeOrderStatus
  };

}
