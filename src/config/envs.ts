import "dotenv/config";
import * as joi from "joi";

interface EnvVars{
    APP_PORT: number;
    DATABASE_URL: string;
    NATS_SERVERS:string[];
}

const envsSchema = joi.object({
    APP_PORT: joi.number().required(),
    DATABASE_URL: joi.string().required(),
    NATS_SERVERS: joi.array().items(joi.string()).required()
}).unknown(true);

const {error, value} = envsSchema.validate({
    ...process.env,
    NATS_SERVERS: process.env.NATS_SERVERS?.split(',')
});

if(error){
    throw new Error(`Config validation error: ${ error.message }`);
}
const envVars:EnvVars = value;

export const envs = {
    appPort: envVars.APP_PORT,
    dbUrl: envVars.DATABASE_URL,
    natsServers: envVars.NATS_SERVERS
}