import { Test, TestingModule } from '@nestjs/testing';
import { WebappController } from './webapp.controller';

describe('WebappController', () => {
  let controller: WebappController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebappController],
    }).compile();

    controller = module.get<WebappController>(WebappController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
