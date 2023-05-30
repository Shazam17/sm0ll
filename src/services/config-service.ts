import {Injectable} from "../helpers/Injectable";

@Injectable()
export class ConfigService {
    public options: any;
    constructor() {

    }

    setOptions(options: any) {
        this.options = options
    }

    dispose() {

    }
}