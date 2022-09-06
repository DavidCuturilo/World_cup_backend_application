import { Test, TestingModule } from '@nestjs/testing';
import { WebappService } from './webapp.service';

describe('WebappService', () => {
  let service: WebappService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WebappService],
    }).compile();

    service = module.get<WebappService>(WebappService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
