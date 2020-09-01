import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) {}

    async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
        return this.taskRepository.getTasks(filterDto);
    }

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne({ where: { id }} );

        if(!found) {
            throw new NotFoundException(`Task with id "${id}" not found`); 
        }

        return found;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
       return await this.taskRepository.createTask(createTaskDto);
    }

    async deleteTask(id: number): Promise<void> {
        const result = await this.taskRepository.delete({ id });  

        if(result.affected === 0) {
            throw new NotFoundException(`Task with id "${id}" not found`);
        }       
    }

    async updateTaskStatus(id: number, status: TaskStatus) : Promise<Task> {
        const task = await this.getTaskById(id);

        task.status = status;
        await task.save();

        return task;
    } 

    /* public updateTask(id: string, updateTaskDto: IUpdateTaskDto): Task {
        let task = this.getTaskById(id)
        task = { ...task, ...updateTaskDto }
        return task;
    } */

}
