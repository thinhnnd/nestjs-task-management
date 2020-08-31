import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { IUpdateTaskDto } from './dto/update-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks-filter.dto';

@Injectable()
export class TasksService {
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

    // getTaskById(id: string): Task {
    //     const found = this.tasks.find( task => task.id === id);

    //     //Not found task
    //     if(!found) {
    //         throw new NotFoundException(`Task with id "${id}" not found`); 
    //     }

    //     //Found task
    //     return found;
    // }

    // public createTask(createTaskDto: CreateTaskDto): Task {
    //     const { title, description } = createTaskDto;

    //     const task: Task = {
    //         id: uuidv1(),
    //         title,
    //         description,
    //         status: TaskStatus.OPEN,
    //     };

    //     this.tasks.push(task);
    //     return task;
    // }

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
