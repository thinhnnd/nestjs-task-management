import { Controller, Get, Post, Body, Query, Param, Delete, Patch, Put } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task, TaskStatus } from './tasks.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { IUpdateTaskDto } from './dto/update-task.dto';
import { stringify } from 'querystring';

@Controller('tasks')
export class TasksController {
    constructor(private tasksService: TasksService) {}

    @Get()
    getAllTasks(): Task[] {
        return this.tasksService.getAllTasks();
    }

    @Get('/:id')
    getTaskById(@Param('id') id: string): Task {
        return this.tasksService.getTaskById(id);
    }

    @Post()
    createTask(@Body() createTaskDto: CreateTaskDto): Task {
        return this.tasksService.createTask(createTaskDto);
    }

    @Put('/:id')
    updateTask(
        @Param('id') id: string, 
        @Body() updateTaskDto: IUpdateTaskDto
        ): Task {
        return this.tasksService.updateTask(id, updateTaskDto);
    }

    @Patch('/:id/status')
    updateTaskStatus(  
        @Param('id') id: string,
        @Body('status') status: TaskStatus,
        ) : Task {
      return this.tasksService.updateTaskStatus(id, status);
    }

    @Delete('/:id')
    deleteTask(@Param('id') id: string): void {
        this.tasksService.deleteTask(id);
    }
}
