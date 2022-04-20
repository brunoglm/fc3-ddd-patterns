import RepositoryInterface from '../../@shared/repository/repositoryInterface'
import Customer from '../entity/customer'

export default interface CustomerRepositoryInterface
  extends RepositoryInterface<Customer> {}
