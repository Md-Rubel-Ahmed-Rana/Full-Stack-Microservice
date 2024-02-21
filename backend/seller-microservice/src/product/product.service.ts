/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.model';
import { Model } from 'mongoose';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
    @Inject('SELLER_SERVICE') private sellerClient: ClientKafka
  ) {}

  async getAllProducts() {
    const products = await this.productModel.find({});
    return products;
  }

  async addProduct(product: Product) {
    const newProduct = await this.productModel.create(product);

    // emit new data to admin microservice
    this.sellerClient.emit('new-product', newProduct);
    return newProduct;
  }

  async getBySellerId(sellerId: string) {
    const products = await this.productModel.find({ seller: sellerId });
    return products;
  }

  async getSingleProduct(productId: string) {
    const product = await this.productModel.findById(productId);
    return product;
  }

  async updateProduct(productId: string, data: Product) {
    const product = await this.productModel.findByIdAndUpdate(
      productId,
      {
        $set: { ...data }
      },
      { new: true }
    );

    // send message to admin microservice to review product update
    this.sellerClient.emit('updated-product', product);
    return product;
  }

  async deleteProduct(productId: string) {
    const product = await this.productModel.findByIdAndDelete(productId);

    // send message to admin microservice to delete product
    this.sellerClient.emit('deleted-product', productId);

    return product;
  }
}