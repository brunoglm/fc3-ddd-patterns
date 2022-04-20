import customerFactory from './customer-factory'
import Address from '../value-object/address'

describe('Customer factory unit test', () => {
  it('should create a customer', () => {
    let customer = customerFactory.create('John')

    expect(customer.id).toBeDefined()
    expect(customer.name).toBe('John')
    expect(customer.address).toBeUndefined()
  })

  it('should create a customer with an address', () => {
    const address = new Address('Street', 1, 'Zip', 'City')
    let customer = customerFactory.createWithAddress('John', address)

    expect(customer.id).toBeDefined()
    expect(customer.name).toBe('John')
    expect(customer.address).toStrictEqual(address)
  })
})
