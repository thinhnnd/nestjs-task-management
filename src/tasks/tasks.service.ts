import { Injectable } from '@nestjs/common';
import { Task } from './tasks.model';
import { TaskStatus } from './tasks.model';
import { v1 as uuidv1 } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { IUpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
    private tasks: Task[] = [];

    public getAllTasks(): Task[] {
        return this.tasks;
    }

    getTaskById(id: string): Task {
        return this.tasks.find( task => task.id === id);
    }

    public createTask(createTaskDto: CreateTaskDto): Task {
        const { title, description } = createTaskDto;

        const task: Task = {
            id: uuidv1(),
            title,
            description,
            status: TaskStatus.OPEN,
        };

        this.tasks.push(task);
        return task;
    }

    public updateTask(id: string, updateTaskDto: IUpdateTaskDto): Task {
        let index = this.tasks.findIndex( task => task.id === id); 
        this.tasks[index] = { ...this.tasks[index], ...updateTaskDto }
        return this.tasks[index];
    }

    public updateTaskStatus(id: string, status: TaskStatus) : Task {
        const task = this.getTaskById(id);
        task.status = status;
        return task;
    } 

    public deleteTask(id: string): void {
        this.tasks = this.tasks.filter( task => task.id != id)
        // return { success: true, message: "Delete succesfully"};
    }
}
