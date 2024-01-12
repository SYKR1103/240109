import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { MovieService } from './movie.service';
import { PageOptionsDto } from '../dtos/page-options.dto';

@Controller('movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post()
  async createMovies() {
    return await this.movieService.createMovies();
  }

  @Get('/all')
  async getAllMovies(@Query() pageOptionDto: PageOptionsDto) {
    return this.movieService.getAllMovies(pageOptionDto);
  }
}
