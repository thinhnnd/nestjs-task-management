import { Test } from "@nestjs/testing";
import { TasksService } from '../../src/tasks/tasks.service';
import { TaskRepository } from '../../src/tasks/task.repository';
import { GetTasksFilterDto } from '../../src/tasks/dto/get-tasks-filter.dto';
import { TaskStatus } from '../../src/tasks/task-status.enum';
import { async } from "rxjs";
import { NotFoundException, InternalServerErrorException } from "@nestjs/common";

const mockUser = {
    id: 1,
    username: 'test_user'
}

const mockTask = {
    title: 'Test Title', 
    description: 'Test Desc' 
}

const mockTaskRepository = () => ({
    getTasks: jest.fn(),
    findOne: jest.fn(),
    createTask: jest.fn(),
    delete: jest.fn(),
});

describe('TaskService', () => {
    let tasksService;
    let taskRepository;

    beforeEach( async () => {
        let module = await Test.createTestingModule({
            providers: [
                TasksService,
                {
                    provide: TaskRepository,
                    useFactory: mockTaskRepository
                }
            ],
        }).compile();

        tasksService = await module.get<TasksService>(TasksService);
        taskRepository = await module.get<TaskRepository>(TaskRepository);
    });

    describe('getTasks', () => {
        it('get all tasks from the repository', async () => {
            taskRepository.getTasks.mockResolvedValue('someValue');

            expect(taskRepository.getTasks).not.toHaveBeenCalled();
            const filter: GetTasksFilterDto = { 
                status: TaskStatus.IN_PROCESS, 
                search: 'test search query'
            };
            const result = await tasksService.getTasks(filter, mockUser);
            expect(result).toEqual('someValue');
        });
    });

    describe('getTaskById', () => {
        it('calls taskRepository.findOne() and successfuly retrive and return task ', async () => {     
            taskRepository.findOne.mockResolvedValue(mockTask);

            expect(taskRepository.findOne).not.toHaveBeenCalled();

            const task = await tasksService.getTaskById(1, mockUser);

            expect(taskRepository.findOne).toHaveBeenCalledWith({
                where: {
                    id: 1,
                    userId: mockUser.id
                },
            });    
            expect(task).toEqual(mockTask);

        });

        it('throw an error as task not found', async () => {
            taskRepository.findOne.mockResolvedValue(null);
            expect(tasksService.getTaskById(1, mockUser)).rejects.toThrow(NotFoundException);
        })
    });

    describe('createTask', () => {
        const mockTaskDto = {
            title: 'Test Title',
            description: 'Test Description'
        };

        it('call taskRepository.create() and return a new task', async () => {
            taskRepository.createTask.mockResolvedValue(mockTask);
            expect(taskRepository.createTask).not.toHaveBeenCalled();
            const task = await tasksService.createTask(mockTaskDto, mockUser); 
            expect(taskRepository.createTask).toHaveBeenCalledWith(mockTaskDto, mockUser);
            expect(task).toEqual(mockTask);
        });

        it('create task fail and throw Internal Server Error', () => {
            taskRepository.createTask.mockResolvedValue(null);
            expect(tasksService.createTask(mockTaskDto, mockUser)).rejects.toThrow(InternalServerErrorException);
        });
    });

    describe('deleteTask', () => {
        it('call taskRepository.delete and delete successfuly', async () => {
            taskRepository.delete.mockResolvedValue({ affected: 1});
            expect(taskRepository.delete).not.toHaveBeenCalled();
            await tasksService.deleteTask(12, mockUser);
            expect(taskRepository.delete).toHaveBeenCalledWith({id: 12, userId: mockUser.id }) 
        });

        it('call taskRepository.delete fail, throw a Not Found Error', async () => {
            taskRepository.delete.mockResolvedValue({ affected: 0});
            expect(tasksService.deleteTask(1, mockUser)).rejects.toThrow(NotFoundException);
            
        })
    })
});