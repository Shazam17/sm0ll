import "reflect-metadata";

interface Type<T> {
    new (...args: any[]): T;
}

export interface ControllerOptions {
    prefix?: string
}

export const controllerOptionsMetadataKey = Symbol("controllerOptions")

export function Controller(options: ControllerOptions) {
    return function <T>(target: Type<T>) {
        Reflect.defineMetadata(controllerOptionsMetadataKey, options, target)
        // console.log(Reflect.getMetadata("design:paramtypes", target));
        // console.log(Reflect.ownKeys(target.prototype))
        // console.log(Reflect.get(target.prototype, 'getTodos'))
    };
}