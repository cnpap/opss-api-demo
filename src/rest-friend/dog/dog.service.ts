import { Inject, Injectable } from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schemas from '../../entity/drizzle';
import { eq } from 'drizzle-orm';

@Injectable()
export class DogService {
  constructor(@Inject('db') private db: NodePgDatabase<typeof schemas>) {}

  /**
   * @param createDogDto
   */
  async create(createDogDto: CreateDogDto) {
    const newDog = await this.db
      .insert(schemas.dog)
      .values(createDogDto)
      .returning();
    return newDog[0];
  }

  async findAll() {
    return this.db.select().from(schemas.dog);
  }

  async findOne(id: number) {
    const dog = await this.db
      .select()
      .from(schemas.dog)
      .where(eq(schemas.dog.id, id));
    return dog[0];
  }

  async update(id: number, updateDogDto: UpdateDogDto) {
    const updatedDog = await this.db
      .update(schemas.dog)
      .set(updateDogDto)
      .where(eq(schemas.dog.id, id))
      .returning();
    return updatedDog[0];
  }

  async remove(id: number) {
    await this.db.delete(schemas.dog).where(eq(schemas.dog.id, id));
    return { message: `Dog with id ${id} has been removed` };
  }
}
