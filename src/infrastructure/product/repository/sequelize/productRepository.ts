import Product from '../../../../domain/product/entity/product'
import product from '../../../../domain/product/entity/product'
import ProductRepositoryInterface from '../../../../domain/product/repository/productRepositoryInterface'
import ProductModel from './productModel'

export default class ProductRepository implements ProductRepositoryInterface {
  async create(entity: product): Promise<void> {
    await ProductModel.create({
      id: entity.id,
      name: entity.name,
      price: entity.price,
    })
  }

  async update(entity: product): Promise<void> {
    await ProductModel.update(
      {
        name: entity.name,
        price: entity.price,
      },
      {
        where: {
          id: entity.id,
        },
      }
    )
  }

  async find(id: string): Promise<product> {
    const productModel = await ProductModel.findOne({ where: { id } })

    return new Product(productModel.id, productModel.name, productModel.price)
  }

  async findAll(): Promise<product[]> {
    const productModels = await ProductModel.findAll()
    return productModels.map(
      (productModel) =>
        new Product(productModel.id, productModel.name, productModel.price)
    )
  }
}
