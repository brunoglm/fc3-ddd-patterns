import { Sequelize } from 'sequelize-typescript'
import CustomerModel from '../db/sequelize/model/customerModel'
import OrderModel from '../db/sequelize/model/orderModel'
import OrderItemModel from '../db/sequelize/model/orderItemModel'
import ProductModel from '../db/sequelize/model/productModel'
import CustomerRepository from './customerRepository'
import Customer from '../../domain/entity/customer'
import OrderItem from '../../domain/entity/order_item'
import Address from '../../domain/entity/address'
import ProductRepository from './productRepository'
import Product from '../../domain/entity/product'
import Order from '../../domain/entity/order'
import OrderRepository from './orderRepository'

describe('Order repository test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([
      CustomerModel,
      OrderModel,
      OrderItemModel,
      ProductModel,
    ])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a new order', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product('123', 'Product 1', 10)
    await productRepository.create(product)

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2
    )
    const order = new Order('123', '123', [orderItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    })

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total(),
      items: [
        {
          id: orderItem.id,
          name: orderItem.name,
          price: orderItem.price,
          quantity: orderItem.quantity,
          order_id: order.id,
          product_id: orderItem.productId,
        },
      ],
    })
  })

  it('should update a product', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('123', 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product('123', 'Product 1', 10)
    await productRepository.create(product)

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2
    )
    const order = new Order('123', '123', [orderItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const orderItem2 = new OrderItem(
      '2',
      product.name,
      product.price,
      product.id,
      2
    )
    order.items.push(orderItem2)

    await orderRepository.update(order)

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ['items'],
    })

    expect(orderModel.toJSON()).toStrictEqual({
      id: order.id,
      customer_id: customer.id,
      total: order.total(),
      items: order.items.map((orderItem) => ({
        id: orderItem.id,
        name: orderItem.name,
        price: orderItem.price,
        quantity: orderItem.quantity,
        order_id: order.id,
        product_id: orderItem.productId,
      })),
    })
  })

  it('should find a order', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('456', 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product('456', 'Product 1', 10)
    await productRepository.create(product)

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2
    )
    const order = new Order('456', customer.id, [orderItem])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order)

    const orderFound = await orderRepository.find(order.id)

    expect(orderFound).toStrictEqual(order)
  })

  it('should find all orders', async () => {
    const customerRepository = new CustomerRepository()
    const customer = new Customer('456', 'Customer 1')
    const address = new Address('Street 1', 1, 'Zipcode 1', 'City 1')
    customer.changeAddress(address)
    await customerRepository.create(customer)

    const productRepository = new ProductRepository()
    const product = new Product('456', 'Product 1', 10)
    await productRepository.create(product)

    const orderItem = new OrderItem(
      '1',
      product.name,
      product.price,
      product.id,
      2
    )
    const order1 = new Order('123', customer.id, [orderItem])

    const orderItem2 = new OrderItem(
      '2',
      product.name,
      product.price,
      product.id,
      2
    )
    const order2 = new Order('456', customer.id, [orderItem2])

    const orderRepository = new OrderRepository()
    await orderRepository.create(order1)
    await orderRepository.create(order2)

    const foundOrders = await orderRepository.findAll()
    const orders = [order1, order2]

    expect(foundOrders).toEqual(orders)
  })
})
