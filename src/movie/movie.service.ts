import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entities/movie.entity';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { query } from 'express';
import { PageOptionsDto } from '../dtos/page-options.dto';
import { PageMetaDto } from '../dtos/page-meta.dto';
import { PageDto } from '../dtos/page.dto';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepo: Repository<Movie>,
    private httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async createMovies() {
    const { data, status } = await this.httpService
      .get(this.configService.get('TMDB_URL'), {
        headers: { Authorization: this.configService.get('TMDB_KEY') },
      })
      .toPromise();

    if (status === 200) {
      const datas = data.results;
      const moviedata = [];

      datas?.map((data) =>
        moviedata.push({
          title: data['title'],
          overview: data['overview'],
          release_date: data['release_date'],
          adult: data['adult'],
          vote_average: data['vote_average'],
        }),
      );
      return await this.movieRepo.save(moviedata);
    }
  }

  async getAllMovies(pageOptionDto: PageOptionsDto) {
    const queryBuilder = await this.movieRepo.createQueryBuilder('movie');
    await queryBuilder
      .orderBy('movie.createdAt', pageOptionDto.order)
      .skip(pageOptionDto.skip)
      .take(pageOptionDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMega = new PageMetaDto({ pageOptionDto, itemCount });

    return new PageDto(entities, pageMega);
  }
}
