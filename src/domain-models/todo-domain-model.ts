export class TodoDomainModel {
    public readonly id: string;
    public readonly description: string;
    public readonly title: string;
    constructor(id: string, title: string, description: string) {
        this.id = id
        this.title = title;
        this.description = description;
    }
}