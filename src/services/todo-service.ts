import {TodoRepository} from "../repositories/todo-repository";
import {TodoDomainModel} from "../domain-models/todo-domain-model";
import {CreateTodoRequestDto} from "../dtos/create-todo-request-dto";
import {ObjectId} from "mongodb";
import {Injectable} from "../helpers/Injectable";

@Injectable()
export class TodoService {

    constructor(private readonly todoRepository: TodoRepository) {}

    async getTodos(): Promise<TodoDomainModel[]> {
        return this.todoRepository.getTodos();
    }

    createTodo(createTodoRequestDto: CreateTodoRequestDto) {
        const todoDomainModel = new TodoDomainModel(
            new ObjectId().toString(),
            createTodoRequestDto.title,
            createTodoRequestDto.description);
        return this.todoRepository.insert(todoDomainModel)
    }

    dispose() {

    }
}

export interface TodoServiceSchema {
    todoService: TodoService;
}
