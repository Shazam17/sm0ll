import {TodoDomainModel} from "../domain-models/todo-domain-model";
import {Collection, MongoClient} from "mongodb";
import {TodoSchema} from "../schemas/todo-schema";
import {ConfigService} from "../services/config-service";
import {TodoSchemaFactory} from "../schema-factories/todo-schema-factory";
import {Injectable} from "../helpers/Injectable";

@Injectable()
export class TodoRepository {
    private mongoClient: MongoClient;
    private todoCollection: Collection<TodoSchema>;

    constructor(configService: ConfigService) {
        this.mongoClient = new MongoClient(configService.options.data.MONGO_URL)
        this.todoCollection = this.mongoClient.db('test').collection('todos');
    }

    public async getTodos(): Promise<TodoDomainModel[]> {
        const schemas = await this.todoCollection.find().toArray()
        return this.toModels(schemas)
    }

    public async insert(todo: TodoDomainModel) {
        await this.todoCollection.insertOne(TodoSchemaFactory.ModelToSchema(todo))
    }

    public editTodo() {

    }

    public getById() {

    }

    public removeById(id: string) {

    }

    toModels(schemas: TodoSchema[]) {
        return schemas.map((s) => TodoSchemaFactory.SchemaToModel(s));
    }

    toModel(schema: TodoSchema) {
        return TodoSchemaFactory.SchemaToModel(schema);
    }

    dispose() {

    }
}

export interface TodoRepositorySchema {
    todoRepository: TodoRepository
}