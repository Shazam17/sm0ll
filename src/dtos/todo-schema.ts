import S from "fluent-json-schema";

export const TodoSchema = S.object()
    .prop('title', S.string()).required()
    .prop('description', S.string()).required()