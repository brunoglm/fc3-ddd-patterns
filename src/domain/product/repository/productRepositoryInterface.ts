import Product from '../entity/product'
import RepositoryInterface from '../../@shared/repository/repositoryInterface'

export default interface ProductRepositoryInterface
  extends RepositoryInterface<Product> {}
