import {TodoService} from "../services/todo-service";
import {Controller} from "../helpers/controller";
import {METHOD, RequestMapping} from "../helpers/RequestMapping";
import {Body, Param, Query} from "../helpers/body-decorator";

@Controller({prefix: '/api'})
export class TodoController {

    constructor(private readonly todoService: TodoService) {}

    @RequestMapping(METHOD.GET, '/test')
    getTodos() {
        return this.todoService.getTodos();
    }

    @RequestMapping(METHOD.POST, '/create-todo/:name/:id')
    createTodo(@Body body: any, @Query query: any, @Param('name') name: string, @Param('id') id: string) {
        console.log(body)
        console.log(query)
        console.log(name)
        return name + '_' + id
    }
}

