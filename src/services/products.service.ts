import { Injectable, NotFoundException } from '@nestjs/common';
import { throws } from 'assert';
import { Product } from '../entities/product.entity';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Bla bla bla',
      price: 122,
      stock: 12,
      image: '',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id === id);

    if (!product) throw new NotFoundException('Product Not Found');

    return product;
  }

  create(payload: any) {
    this.counterId++;

    const newProduct = {
      id: this.counterId,
      ...payload,
    };

    this.products.push(newProduct);

    return newProduct;
  }

  update(id: number, payload: any) {
    const index = this.products.findIndex((item) => item.id === id);

    if (index === -1) throw new NotFoundException('Product Not Found');

    this.products[index] = { ...this.products[index], ...payload };
    return this.products[index];
  }

  delete(id: number) {
    const index = this.products.findIndex((item) => item.id === id);

    if (index === -1) throw new NotFoundException('Product Not Found');

    this.products.splice(index, 1);
    return 'Product deleted';
  }
}
