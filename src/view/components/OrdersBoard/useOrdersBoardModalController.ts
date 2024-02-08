import { Order } from '../../../app/types/Order';
import { useCallback, useState } from 'react';



export function useOrdersBoardModalController() {

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<null | Order>(null);

  function handleOpenModal(order: Order) {
    setSelectedOrder(order);
    setIsModalVisible(true);
  }

  const handleCloseModal = useCallback(() => {
    setSelectedOrder(null);
    setIsModalVisible(false);
  }, []);

  return {
    isModalVisible,
    selectedOrder,
    handleOpenModal,
    handleCloseModal
  };

}
