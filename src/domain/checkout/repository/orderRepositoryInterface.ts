import RepositoryInterface from '../../@shared/repository/repositoryInterface'
import Order from '../entity/order'

export default interface OrderRepositoryInterface
  extends RepositoryInterface<Order> {}
