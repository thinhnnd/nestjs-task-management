import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { IUpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';
import { TaskRepository } from './task.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private taskRepository: TaskRepository,
    ) {}
    // public getAllTasks(): Task[] {
    //     return this.tasks;
    // }

    // getTaskWithFilters(filterDto: GetTasksFilterDto): Task[] {
    //     const { status, search } = filterDto;
    //     let tasks = this.getAllTasks();

    //     if(status) {
    //         tasks = tasks.filter( task => task.status === status);
    //     }
        
    //     if(search) {
    //         tasks = tasks.filter( task => 
    //             task.title.includes(search) || 
    //             task.description.includes(search)
    //         );
    //     }

    //     return tasks;
    // }

    async getTaskById(id: number): Promise<Task> {
        const found = await this.taskRepository.findOne(id);

        if(!found) {
            throw new NotFoundException(`Task with id "${id}" not found`); 
        }

        return found;
    }

    async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
       return await this.taskRepository.createTask(createTaskDto);
    }

    // public updateTask(id: string, updateTaskDto: IUpdateTaskDto): Task {
    //     let task = this.getTaskById(id)
    //     task = { ...task, ...updateTaskDto }
    //     return task;
    // }

    // public updateTaskStatus(id: string, status: TaskStatus) : Task {
    //     const task = this.getTaskById(id);
    //     task.status = status;
    //     return task;
    // } 

    // public deleteTask(id: string): void {
    //     const found = this.getTaskById(id);
    //     this.tasks = this.tasks.filter( task => task.id != found.id);
    //     // return { success: true, message: "Delete succesfully"};
    // }
}
