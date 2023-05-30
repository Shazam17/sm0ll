import {FastifyPluginAsync} from "fastify";
import {Injector} from "./helpers/Injectable";
import {MethodMetadata} from "./helpers/RequestMapping";
import {TodoController} from "./controllers/todo-controller";
import {ControllerOptions, controllerOptionsMetadataKey} from "./helpers/controller";

export const config = {
    controllers: [
        TodoController
    ]
}

const wrapEmptyReturnValue = async (f: any, args: any) => {
    // console.log(args.body)
    const result = await f()
    return result ?? undefined
}

export const mappedControllers: FastifyPluginAsync[] = config.controllers.map((controllerClass) => {
    return async (fastify, opts): Promise<void> => {
        // @ts-ignore
        const controller = Injector.resolve<typeof controllerClass>(controllerClass);

        const methods = Reflect.ownKeys(controllerClass.prototype).filter(i => i !== 'constructor')
        methods.forEach((method) => {
            const controllerOptions = Reflect.getMetadata(controllerOptionsMetadataKey, controllerClass) as ControllerOptions
            const methodMetadata = Reflect.getMetadata('custom:annotation', controller, method) as MethodMetadata
            const f = Reflect.get(controllerClass.prototype, method)
            fastify.route({
                url: controllerOptions.prefix + methodMetadata.path,
                method:  methodMetadata.method,
                handler: (args) => wrapEmptyReturnValue(() => f.apply(controller, [args]), args)
            })
        })
    }
})