import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DogService } from './dog.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';

/**
 * @tags 梦想家/小伙伴
 *
 * @summary 旺财管理
 */
@Controller('dog')
export class DogController {
  constructor(private readonly dogService: DogService) {}

  /**
   * @summary 添加一只旺财
   */
  @Post()
  create(@Body() createDogDto: CreateDogDto) {
    return this.dogService.create(createDogDto);
  }

  /**
   * @summary 获取所有旺财
   */
  @Get()
  findAll() {
    return this.dogService.findAll();
  }

  /**
   * @summary 获取一只旺财
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dogService.findOne(+id);
  }

  /**
   * @summary 更新一只旺财
   */
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDogDto: UpdateDogDto) {
    return this.dogService.update(+id, updateDogDto);
  }

  /**
   * @summary 领养一只旺财
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dogService.remove(+id);
  }
}
