import Hallo from './Hallo'
import ShoppingList from './ShoppingList'
import OrderStatus from './OrderStatus.jsx'
function Homework2() {

  const shoppingItems = [
    'Хліб',
    'Молоко',
    'Яйця',
    'Сир',
    'Кава',
    'Піца (на всяк випадок)',
    'Шоколад',
    'Банани',
    'Кетчуп',
    'Настрій купити неможливо, але спробуємо'
  ];
  const orders = [
    { orderId: 101, status: 'processed' },
    { orderId: 102, status: 'on the way' },
    { orderId: 103, status: 'delivered' },
    { orderId: 104, status: 'waiting for payment' },
    { orderId: 105, status: 'cancelled' }
  ];

  return (
    <div>
      <Hallo name="Алік" />
      <ShoppingList items={shoppingItems} />
      {orders.map(order => (
        <OrderStatus key={order.orderId} orderId={order.orderId} status={order.status} />
      ))}
    </div>
  )
}

export default Homework2;