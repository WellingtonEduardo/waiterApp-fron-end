import { httpClient } from '../httpClient';


interface RemoveProps {
  orderId: string;
}

export async function remove({ orderId }: RemoveProps) {
  const { status } = await httpClient.delete(`/orders/${orderId}`);

  return status;

}
