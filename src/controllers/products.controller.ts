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
  HttpCode
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  @Get()
  getProducts(@Query() params: any) {
    const { limit, offset, brand } = params;
    return {
      message: `limit: ${limit}, offset: ${offset}, brand: ${brand}`,
    };
  }

  @Get('filter')
  getProductsFilter() {
    return {
      message: `Yo soy un filter`,
    };
  }

  @Get(':productId')
  @HttpCode(HttpStatus.ACCEPTED)
  getOne(@Param('productId') productId: string) {
    return {
      message: `product ${productId}`,
    };
  }

  @Post()
  create(@Body() payload: any) {
    return {
      message: 'Create action',
      body: payload,
    };
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
    return {
      message: `Update ${id}`,
      body: payload,
    };
  }

  @Delete(':id')
  detele(@Param('id') id: number) {
    return {
      message: `Delte ${id}`,
    };
  }
}
