import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private booksRepository: Repository<Book>,
  ) {}

  async getAllBooks(): Promise<Book[]> {
    return this.booksRepository.find();
  }

  async getBookById(id: number): Promise<Book> {
    const book = await this.booksRepository.findOneBy({ id });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async addBook(createBookDto: CreateBookDto): Promise<Book> {
    const newBook = this.booksRepository.create(createBookDto);
    return this.booksRepository.save(newBook);
  }

  async updateBook(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.booksRepository.preload({
      id,
      ...updateBookDto,
    });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return this.booksRepository.save(book);
  }

  async deleteBook(id: number): Promise<{message: string}> {
    const result = await this.booksRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return { message: 'Delete Successfully'}
  }

  async findAvailableBooks(): Promise<Book[]> {
    return  this.booksRepository.find({ where: { isAvailable: true } });
  }

  async updateAvailability(id: number, isAvailable: boolean): Promise<Book> {
    const book = await this.booksRepository.findOneBy({ id });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    book.isAvailable = isAvailable;
    return this.booksRepository.save(book);
  }
}
