import { PipeTransform, ArgumentMetadata, BadRequestException } from "@nestjs/common";
import { TaskStatus } from '../task.model';

export class TaskStatusValidationPipe implements PipeTransform {

    readonly allowedStatuses = [
        TaskStatus.OPEN,
        TaskStatus.IN_PROCESS,
        TaskStatus.DONE,
    ]

    transform(value: any) {
        value = value.toUpperCase();

        if(!this.isSatusValid(value)) {
            throw new BadRequestException(`"${value}" is an invalid status`)
        }

        return value;
    }

    private isSatusValid(status: any) {
        const index = this.allowedStatuses.indexOf(status);

        // if index === -1 return false
        return index !== -1;
    }
    
}