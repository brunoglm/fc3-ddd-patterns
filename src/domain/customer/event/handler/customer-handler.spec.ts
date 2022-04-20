import Address from '../../value-object/address'
import Customer from '../../../customer/entity/customer'
import CustomerCreatedEvent from '../customer-created-event'
import SendEmailWhenCustomerAddressIsChangedHandler from './send-email-when-customer-address-is-changed-handler'
import SendEmailWhenCustomerIsCreatedHandler from './send-email-when-customer-is-created-handler'
import SendToCloudWhenCustomerIsCreatedHandler from './send-to-cloud-when-customer-is-created-handler'

describe('Customer Handler Unit Tests', () => {
  let spyConsoleLog: any

  beforeEach(() => {
    spyConsoleLog = jest.spyOn(console, 'log')
  })

  afterEach(() => {
    spyConsoleLog.mockRestore()
  })

  test('Send Email When Customer Is Created Handler', () => {
    const customer = new Customer('1', 'Customer 1')
    const customerCreatedEvent = new CustomerCreatedEvent(customer)

    new SendEmailWhenCustomerIsCreatedHandler().handler(customerCreatedEvent)

    expect(spyConsoleLog).toHaveBeenCalledWith(
      'Esse é o primeiro console.log do evento: CustomerCreated'
    )
  })

  test('Send To Cloud When Customer Is Created Handler', () => {
    const customer = new Customer('1', 'Customer 1')
    const customerCreatedEvent = new CustomerCreatedEvent(customer)

    new SendToCloudWhenCustomerIsCreatedHandler().handler(customerCreatedEvent)

    expect(spyConsoleLog).toHaveBeenCalledWith(
      'Esse é o segundo console.log do evento: CustomerCreated'
    )
  })

  test('Send Email When Customer Address Is Changed Handler', () => {
    const customer = new Customer('1', 'Customer 1')
    const address = new Address('Street 1', 123, '13350-250', 'São Paulo')
    customer.changeAddress(address)
    const customerCreatedEvent = new CustomerCreatedEvent({
      id: customer.id,
      name: customer.name,
      address: customer.address.toString(),
    })

    new SendEmailWhenCustomerAddressIsChangedHandler().handler(
      customerCreatedEvent
    )

    expect(spyConsoleLog).toHaveBeenCalledWith(
      `Endereço do cliente: ${customer.id}, ${
        customer.name
      } alterado para: ${customer.address.toString()}`
    )
  })
})
