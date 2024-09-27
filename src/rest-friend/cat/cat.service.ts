import { Injectable } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import Redis from 'ioredis';
import { RedisService } from '@liaoliaots/nestjs-redis';
import { v4 as uuidv4 } from 'uuid';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatService {
  private readonly redis: Redis;

  constructor(private readonly redisService: RedisService) {
    this.redis = this.redisService.getOrThrow();
  }

  async create(createCatDto: CreateCatDto) {
    const id = uuidv4();
    const cat = {
      id,
      ...createCatDto,
    };
    await this.redis.hmset(`cat:${id}`, this.serialize(cat));
    return await this.findOne(id);
  }

  async findAll() {
    const keys = await this.redis.keys('cat:*');
    const cats = await Promise.all(keys.map((key) => this.redis.hgetall(key)));
    return cats.map(this.deserialize) as Cat[];
  }

  async findOne(id: string) {
    const cat = await this.redis.hgetall(`cat:${id}`);
    if (Object.keys(cat).length === 0) {
      return null;
    }
    return this.deserialize(cat) as Cat;
  }

  async update(id: string, updateCatDto: UpdateCatDto) {
    const exists = await this.redis.exists(`cat:${id}`);
    if (!exists) {
      return null;
    }
    await this.redis.hmset(`cat:${id}`, this.serialize(updateCatDto));
    return this.findOne(id);
  }

  async remove(id: string) {
    const result = await this.redis.del(`cat:${id}`);
    return result === 1;
  }

  private serialize(obj: Record<string, any>): Record<string, string> {
    return Object.entries(obj).reduce(
      (acc, [key, value]) => {
        acc[key] = typeof value === 'number' ? value.toString() : value;
        return acc;
      },
      {} as Record<string, string>,
    );
  }

  private deserialize(obj: Record<string, any>): Record<string, any> {
    return Object.entries(obj).reduce(
      (acc, [key, value]) => {
        acc[key] = key === 'age' ? parseInt(value, 10) : value;
        return acc;
      },
      {} as Record<string, any>,
    );
  }
}
