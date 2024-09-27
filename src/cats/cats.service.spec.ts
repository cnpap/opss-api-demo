import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { registerImport } from '../register';

describe('CatsService', () => {
  let service: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...registerImport()],
      providers: [CatsService],
    }).compile();

    service = module.get<CatsService>(CatsService);
  });

  afterEach(async () => {
    const redis = service['redis'];
    await redis.flushall();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a new cat', async () => {
      const createCatDto: CreateCatDto = {
        name: '喵喵',
        age: 3,
        breed: '橘猫',
      };

      const result = await service.create(createCatDto);
      expect(result).toMatchObject(createCatDto);
      expect(result.id).toBeDefined();
    });
  });

  describe('findAll', () => {
    it('should return an array of cats', async () => {
      const cat1 = await service.create({
        name: '喵喵1',
        age: 3,
        breed: '橘猫',
      });
      const cat2 = await service.create({
        name: '喵喵2',
        age: 2,
        breed: '黑猫',
      });

      const result = await service.findAll();
      expect(result).toHaveLength(2);
      expect(result).toEqual(expect.arrayContaining([cat1, cat2]));
    });
  });

  describe('findOne', () => {
    it('should return a cat if it exists', async () => {
      const createCatDto = { name: '喵喵', age: 3, breed: '橘猫' };
      const createdCat = await service.create(createCatDto);

      const result = await service.findOne(createdCat.id);
      expect(result).toEqual(createdCat);
    });

    it('should return null if cat does not exist', async () => {
      const result = await service.findOne('non-existent-id');
      expect(result).toBeNull();
    });
  });

  describe('update', () => {
    it('should update a cat if it exists', async () => {
      const createCatDto = { name: '喵喵', age: 3, breed: '橘猫' };
      const createdCat = await service.create(createCatDto);

      const updateCatDto: UpdateCatDto = { name: '新喵喵', age: 4 };
      const result = await service.update(createdCat.id, updateCatDto);

      expect(result).toMatchObject({ ...createdCat, ...updateCatDto });
    });

    it('should return null if cat does not exist', async () => {
      const result = await service.update('non-existent-id', {
        name: '新喵喵',
      });
      expect(result).toBeNull();
    });
  });

  describe('remove', () => {
    it('should remove a cat if it exists', async () => {
      const createCatDto = { name: '喵喵', age: 3, breed: '橘猫' };
      const createdCat = await service.create(createCatDto);

      const result = await service.remove(createdCat.id);
      expect(result).toBe(true);

      const removedCat = await service.findOne(createdCat.id);
      expect(removedCat).toBeNull();
    });

    it('should return false if cat does not exist', async () => {
      const result = await service.remove('non-existent-id');
      expect(result).toBe(false);
    });
  });
});
