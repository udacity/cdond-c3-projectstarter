import { Test, TestingModule } from '@nestjs/testing';
import { StatusController } from './status.controller';
import { ConfigService } from '../config/config.service';

describe('Status Controller', () => {
  let module: TestingModule;
  let controller: StatusController;
  beforeAll(async () => {
    const configServiceMock = jest.fn(() => ({
      about: { version: 'test', environment: 'testing' },
    }))();
    module = await Test.createTestingModule({
      controllers: [StatusController],
      providers: [
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
      ],
    }).compile();
    controller = module.get<StatusController>(StatusController);
  });
  it('should return ok status', async () => {
    const status = await controller.status();
    expect(status).toEqual({
      status: 'ok',
      version: 'test',
      environment: 'testing',
    });
  });
});
