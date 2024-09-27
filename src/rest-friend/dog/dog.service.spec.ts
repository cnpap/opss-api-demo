import { Test, TestingModule } from '@nestjs/testing';
import { DogService } from './dog.service';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schemas from '../../entity/drizzle';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { registerImport } from '../../register';
import { DogModule } from './dog.module';

describe('DogService', () => {
  let service: DogService;
  let db: NodePgDatabase<typeof schemas>;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...registerImport(), DogModule],
      providers: [DogService],
    }).compile();

    service = module.get<DogService>(DogService);
    db = module.get<NodePgDatabase<typeof schemas>>('db');
  });

  afterAll(async () => {
    await db.delete(schemas.dog);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new dog', async () => {
      const createDogDto: CreateDogDto = {
        name: 'Buddy',
        age: 3,
        breed: 'Golden Retriever',
      };
      const newDog = await service.create(createDogDto);
      expect(newDog).toHaveProperty('id');
      expect(newDog.name).toBe(createDogDto.name);
      expect(newDog.age).toBe(createDogDto.age);
      expect(newDog.breed).toBe(createDogDto.breed);
    });
  });

  describe('findAll', () => {
    it('should return an array of dogs', async () => {
      const dogs = await service.findAll();
      expect(Array.isArray(dogs)).toBe(true);
      expect(dogs.length).toBeGreaterThan(0);
    });
  });

  describe('findOne', () => {
    it('should return a dog by id', async () => {
      const dogs = await service.findAll();
      const testDog = dogs[0];
      const foundDog = await service.findOne(testDog.id);
      expect(foundDog).toEqual(testDog);
    });
  });

  describe('update', () => {
    it('should update a dog', async () => {
      const dogs = await service.findAll();
      const testDog = dogs[0];
      const updateDogDto: UpdateDogDto = {
        name: 'Updated Buddy',
        age: 4,
        breed: 'Labrador',
      };
      const updatedDog = await service.update(testDog.id, updateDogDto);
      expect(updatedDog.id).toBe(testDog.id);
      expect(updatedDog.name).toBe(updateDogDto.name);
      expect(updatedDog.age).toBe(updateDogDto.age);
      expect(updatedDog.breed).toBe(updateDogDto.breed);
    });
  });

  describe('remove', () => {
    it('should remove a dog', async () => {
      const dogs = await service.findAll();
      const testDog = dogs[0];
      const result = await service.remove(testDog.id);
      expect(result.message).toBe(`Dog with id ${testDog.id} has been removed`);
      const remainingDogs = await service.findAll();
      expect(
        remainingDogs.find((dog) => dog.id === testDog.id),
      ).toBeUndefined();
    });
  });
});
