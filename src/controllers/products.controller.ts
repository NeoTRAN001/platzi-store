import {
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Body,
  Delete,
  HttpStatus,
  HttpCode,
  ParseIntPipe,
} from '@nestjs/common';

import { ProductsService } from '../services/products.service';
import { CreateProductDto, UpdateProductDto } from '../dtos/products.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProducts(@Query() params: any) {
    const { limit, offset, brand } = params;
    return this.productsService.findAll();
  }

  @Get('filter')
  getProductsFilter() {
    return {
      message: `Yo soy un filter`,
    };
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    return {
      message: id,
      body: this.productsService.update(id, payload),
    };
  }

  @Delete(':id')
  detele(@Param('id', ParseIntPipe) id: number) {
    return {
      message: this.productsService.delete(id),
    };
  }
}
