import { Overlay, ModalBody, OrderDetails, OrderItems, Actions } from './styles';
import close from '../../../assets/images/close-icon.svg';


import { Order } from '../../../app/types/Order';
import { formatCurrency } from '../../../app/utils/formatCurrency';
import { calculateOrderTotal } from '../../../app/utils/calculateOrderTotal';
import { useOrderModalController } from './useOrderModalController';

interface OrderModalProps {
  visible: boolean
  order: Order | null
  onCloseModal(): void
}

export function OrderModal({ visible, order, onCloseModal }: OrderModalProps) {

  useOrderModalController({ onCloseModal });

  if (!visible || !order) {
    return null;
  }

  return (
    <Overlay>
      <ModalBody>
        <header>
          <strong>Mesa {order.table}</strong>
          <button type="button" onClick={onCloseModal}>
            <img src={close} alt="close" />
          </button>
        </header>

        <div className='status-container'>
          <small>Status do Pedido</small>
          <div>
            <span>
              {order.status === 'WAITING' && '🕒'}
              {order.status === 'IN_PRODUCTION' && '👨‍🍳'}
              {order.status === 'DONE' && '✔'}
            </span>

            <strong>
              {order.status === 'WAITING' && 'Fila de espera'}
              {order.status === 'IN_PRODUCTION' && 'Em preparação'}
              {order.status === 'DONE' && 'Pronto!'}
            </strong>
          </div>
        </div>

        <OrderDetails>
          <strong>Itens</strong>

          <OrderItems>
            {order.products.map(({ _id, product, quantity }) => (
              <div className="item" key={_id}>
                <img
                  src={`http://localhost:3001/uploads/${product.imagePath}`}
                  alt={product.name}
                  width='56'
                  height='28.51'
                />

                <span className="quantity">
                  {quantity}x
                </span>

                <div className="product-details">
                  <strong>{product.name}</strong>
                  <span>{formatCurrency(product.price)}</span>
                </div>
              </div>
            ))}
          </OrderItems>

          <div className="total">
            <span>Total</span>
            <strong>{formatCurrency(calculateOrderTotal(order))}</strong>
          </div>
        </OrderDetails>

        <Actions>
          <button type='button' className='primary'>
            <span>👨‍🍳</span>
            <strong>Iniciar Produção</strong>
          </button>
          <button type='button' className='secondary'>
            <strong>Cancelar Pedido</strong>
          </button>
        </Actions>
      </ModalBody>
    </Overlay>
  );
}
