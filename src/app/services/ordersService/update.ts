import { httpClient } from '../httpClient';


interface UpdateProps {
  orderId: string;
  newStatus: 'IN_PRODUCTION' | 'DONE'

}

export async function update({ orderId, newStatus }: UpdateProps) {
  const { status } = await httpClient.patch(`/orders/${orderId}`, { status: newStatus });

  return status;

}
