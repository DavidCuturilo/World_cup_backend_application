import { Test, TestingModule } from '@nestjs/testing';
import { WorldCupController } from './world-cup.controller';

describe('WorldCupController', () => {
  let controller: WorldCupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorldCupController],
    }).compile();

    controller = module.get<WorldCupController>(WorldCupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
