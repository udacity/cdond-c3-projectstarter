import { BaseRepository } from '../../../common/entities';
import { SyncEventDispatcher } from '../../../common/events';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Employee } from '../entities/employee.entity';

@Injectable()
export class EmployeeRepository extends BaseRepository<number, Employee> {
  constructor(
    @InjectEntityManager()
    manager: EntityManager,
    eventDispatcher: SyncEventDispatcher,
  ) {
    super(manager.getRepository(Employee), eventDispatcher);
  }
  
  async findByNames(firstName, middleName, lastName, secondLastName) : Promise<Employee>{
    const emp = await this.repository.createQueryBuilder("employee")
        .where("employee.firstName = :firstName AND employee.middleName = :middleName " +
            "AND employee.lastName = :lastName AND employee.secondLastName = :secondLastName",
            {firstName:firstName,middleName:middleName,lastName:lastName,secondLastName:secondLastName})
        .getOne();    
    return emp;
  }
}
