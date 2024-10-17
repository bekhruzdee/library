import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getAllBooks() {
    return this.booksService.getAllBooks();
  }

  @Post()
  addBook(@Body() createBookDto: CreateBookDto) {
    return this.booksService.addBook(createBookDto);
  }

  @Put(':id')
  updateBook(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto) {
    return this.booksService.updateBook(+id, updateBookDto);
  }

  @Delete(':id')
  deleteBook(@Param('id') id: number) {
    return this.booksService.deleteBook(+id);
  }

  @Get('available')
  findAvailableBooks() {
    return this.booksService.findAvailableBooks();
  }

  @Patch(':id/availability')
  updateAvailability(
    @Param('id') id: number,
    @Body('isAvailable') isAvailable: boolean,
  ) {
    return this.booksService.updateAvailability(+id, isAvailable);
  }
}
