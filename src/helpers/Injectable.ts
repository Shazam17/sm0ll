// import {diContainer} from "@fastify/awilix";
// import {asClass, Lifetime} from "awilix";
import "reflect-metadata";

interface Type<T> {
    new (...args: any[]): T;
}

export function Injectable() {
    return function <T>(target: Type<T>) {
        // console.log(Reflect.getMetadata("design:paramtypes", target));
    };
}

export class Injector {
    private static container = new Map<string, any>();

    static resolve<T>(target: Type<T>): T {
        if (Injector.container.has(target.name)) {
            return Injector.container.get(target.name);
        }
        const tokens = Reflect.getMetadata("design:paramtypes", target) || [];
        const injections = tokens.map((token: Type<any>): any =>
            Injector.resolve(token)
        );
        const instance = new target(...injections);
        Injector.container.set(target.name, instance);
        return instance;
    }
}

export class DependencyInjection {
    static get<T>(target: any): T {
        const isInjectable = Reflect.getMetadata("injectable", target);
        if (!isInjectable) {
            throw new Error("Target is not injectable");
        }

        const dependencies = Reflect.getMetadata("design:paramtypes", target) || [];
        const instances = dependencies.map((dep: any) => DependencyInjection.get(dep));
        return new target(...instances);
    }
}