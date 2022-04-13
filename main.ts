import Address from './src/entity/address';
import Customer from './src/entity/customer'
import OrderItem from './src/entity/order_item'
import Order from './src/entity/order'
let customer = new Customer("123", "Bruno");
const address = new Address("Rua dois", 2, "123434343", "São Paulo")
customer.changeAddress(address);
customer.activate();

const item1 = new OrderItem("1", "Item 1", 10);
const item2 = new OrderItem("2", "Item 2", 15);

const order = new Order("1", "123", [item1, item2]);