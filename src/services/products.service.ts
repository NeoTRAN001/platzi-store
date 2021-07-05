import { Injectable } from '@nestjs/common';
import { throwError } from 'rxjs';
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
    return this.products.find((item) => item.id === id);
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
    const found = this.products.findIndex((item) => item.id === id);

    if (found !== -1) return throwError('Product not found');

    this.products[found] = { id, ...payload };
    return this.products[found];
  }

  delete(id: number) {
    const found = this.products.findIndex((item) => item.id === id);

    if (found === -1) return throwError('Product not found');

    this.products.splice(found, 1);
    return 'Product deleted';
  }
}
