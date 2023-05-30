import {RouteShorthandOptions} from "fastify";
import {TodoSchema} from "./todo-schema";

export interface CreateTodoRequestDto {
    title: string;
    description: string;
}

export const createTodoRequestSchema = {
    schema: {
        body: TodoSchema
    }
} as RouteShorthandOptions