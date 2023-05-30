import {bodyMetadataKey, paramMetadataKey, queryMetadataKey} from "./body-decorator";

export enum METHOD {
    GET = 'GET',
    POST = 'POST'
}

export interface MethodMetadata {
    method: METHOD,
    path: string
}

export function RequestMapping(method: METHOD, path: string) {
    return function (
        target: Object,
        propertyName: string | symbol,
        descriptor: PropertyDescriptor
    ) {
        Reflect.defineMetadata('custom:annotation', {
            method,
            path
        } as MethodMetadata, target, propertyName)

        let methodFunc = descriptor.value;

        descriptor.value = function () {
            let bodyParameters: number[] = Reflect.getOwnMetadata(bodyMetadataKey, target, propertyName);
            let queryParametersIndexes: number[] = Reflect.getOwnMetadata(queryMetadataKey, target, propertyName);
            let paramParametersIndexesMap: Map<string, number> = Reflect.getOwnMetadata(paramMetadataKey, target, propertyName);

            const requestObject = arguments[0]
            const newArguments = [{}, {}, {}]
            newArguments[bodyParameters[0]] = requestObject.body
            newArguments[queryParametersIndexes[0]] = requestObject.query
            const entries = [...paramParametersIndexesMap.entries()]
            entries.map(([key, index]) => {
                const params = requestObject.params
                console.log(params[key])
                newArguments[index] = params[key]
            })

            return methodFunc.apply(this, newArguments);
        }
        return descriptor;
    };
}