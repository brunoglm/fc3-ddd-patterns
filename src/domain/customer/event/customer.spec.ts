import Customer from '../../customer/entity/customer'
import CustomerChangedAddressEvent from './customer-changed-address-event'
import CustomerCreatedEvent from './customer-created-event'

describe('Customer Unit Tests', () => {
  test('constructor of customer created event', () => {
    const customer = new Customer('1', 'Customer 1')
    const customerCreatedEvent = new CustomerCreatedEvent(customer)

    expect(customerCreatedEvent.eventData).toStrictEqual(customer)
    expect(customerCreatedEvent.dataTimeOccurred).toBeInstanceOf(Date)
  })

  test('constructor of customer changed address event', () => {
    const customer = new Customer('1', 'Customer 1')
    const customerCreatedEvent = new CustomerChangedAddressEvent(customer)

    expect(customerCreatedEvent.eventData).toStrictEqual(customer)
    expect(customerCreatedEvent.dataTimeOccurred).toBeInstanceOf(Date)
  })
})
