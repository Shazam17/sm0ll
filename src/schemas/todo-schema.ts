import mongodb from "mongodb";

export class TodoSchema {
    public readonly _id: mongodb.ObjectId;
    public readonly title: string;
    public readonly description: string;

    constructor(id: mongodb.ObjectId, title: string, description: string) {
        this._id = id
        this.title = title
        this.description = description
    }
}