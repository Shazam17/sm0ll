export const bodyMetadataKey = Symbol("body");
export const paramMetadataKey = Symbol("param");
export const queryMetadataKey = Symbol("query");

export function Body(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    let bodyParamsIndexes: number[] = Reflect.getOwnMetadata(bodyMetadataKey, target, propertyKey) || [];
    bodyParamsIndexes.push(parameterIndex);
    Reflect.defineMetadata( bodyMetadataKey, bodyParamsIndexes, target, propertyKey);
}

export function Param(name: string) {
    return function Param(target: Object, propertyKey: string | symbol, parameterIndex: number) {
        let paramsIndexes: Map<string, number> = Reflect.getOwnMetadata(paramMetadataKey, target, propertyKey) || new Map<string, number>;
        paramsIndexes.set(name, parameterIndex);
        Reflect.defineMetadata(paramMetadataKey, paramsIndexes, target, propertyKey);
    }
}

export function Query(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    let queryParamsIndexes: number[] = Reflect.getOwnMetadata(queryMetadataKey, target, propertyKey) || [];
    queryParamsIndexes.push(parameterIndex);
    Reflect.defineMetadata( queryMetadataKey, queryParamsIndexes, target, propertyKey);
}