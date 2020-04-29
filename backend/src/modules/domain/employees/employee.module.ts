import { Module, OnModuleInit } from '@nestjs/common';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { CommonModule } from '../../common';
import { SyncCommandDispatcher } from '../../common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../../auth/auth.module';
import { AppLogger } from '../../app/app.logger';
import { ModuleRef } from '@nestjs/core';
import { EmployeeRepository } from './repositories/employees.repository';
import { EmployeeController } from './employee.controller';
import { Employee } from './entities/employee.entity';
import { CommandValidators } from './commands/validators';
import {PassportModule} from "@nestjs/passport";

@Module({
  imports: [CommonModule, TypeOrmModule.forFeature([Employee]), AuthModule, PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [EmployeeController],
  providers: [
    EmployeeRepository,
    ...CommandHandlers,
    ...EventHandlers,
    ...CommandValidators,
    AppLogger,
  ],
})
export class EmployeeModule implements OnModuleInit {
  constructor(
    private readonly moduleRef: ModuleRef,
    private readonly command$: SyncCommandDispatcher,
  ) {}

  onModuleInit() {
    this.command$.setModuleRef(this.moduleRef);
    this.command$.registerValidators(CommandValidators);
  }
}
