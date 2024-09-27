import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { CreateCateDtoType } from './dto/create-cat.dto';
import { UpdateCateDtoInterface } from './dto/update-cat.dto';

/**
 * @tags 梦想家/小伙伴
 *
 * @summary 猫咪管理
 */
@Controller('cats')
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  /**
   * @summary 添加一只猫咪
   *
   * @param createCatDto
   */
  @Post()
  create(@Body() createCatDto: CreateCateDtoType) {
    return this.catsService.create(createCatDto);
  }

  /**
   * @summary 获取所有猫咪
   */
  @Get()
  findAll() {
    return this.catsService.findAll();
  }

  /**
   * @summary 获取一只猫咪
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.catsService.findOne(id);
  }

  /**
   * @summary 更新一只猫咪
   */
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCatDto: UpdateCateDtoInterface,
  ) {
    return this.catsService.update(id, updateCatDto);
  }

  /**
   * @summary 删除一只猫咪
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.catsService.remove(id);
  }
}
