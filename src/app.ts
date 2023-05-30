import { FastifyPluginAsync } from 'fastify';
import S from "fluent-json-schema";
import {Injector} from "./helpers/Injectable";
import {ConfigService} from "./services/config-service";
import {mappedControllers} from "./config";

const fastifyEnv = require('@fastify/env')

const schema = S.object()
    .prop('PORT', S.string()).required()
    .prop('MONGO_URL', S.string()).required()
    .prop('MSG', S.string()).required()// }

const options = {
  dotenv: true,
  schema,
  confKey: 'config',
  data: process.env
}

const app: FastifyPluginAsync<any> = async (fastify, opts): Promise<void> => {
  await fastify.register(fastifyEnv, options)
  mappedControllers.forEach(controller => fastify.register(controller))

  const configService = Injector.resolve<ConfigService>(ConfigService);

  configService.setOptions(options)
};

export default app;
export { app, options }
