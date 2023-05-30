import {TodoSchema} from "../schemas/todo-schema";
import {TodoDomainModel} from "../domain-models/todo-domain-model";
import {ObjectId} from "mongodb";

export class TodoSchemaFactory {
    static SchemaToModel(schema: TodoSchema) {
        return new TodoDomainModel(
            schema._id.toString(),
            schema.title,
            schema.description
        )
    }

    static ModelToSchema(model: TodoDomainModel) {
        return new TodoSchema(
            new ObjectId(model.id),
            model.title,
            model.description
        )
    }
}