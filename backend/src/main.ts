import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import * as fs from 'fs';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import * as winston from 'winston';
import { AppModule } from './app.module';

async function bootstrap() {
    console.log(process.cwd());
    const app = await NestFactory.create(AppModule, {
        httpsOptions: {
            key: fs.readFileSync('certs/server.key'),
            cert: fs.readFileSync('certs/server.crt'),
            ca: fs.readFileSync('certs/rootCA.pem')
        },
        logger: WinstonModule.createLogger({
            transports: [
                new winston.transports.Console({
                    format: winston.format.combine(
                        winston.format.timestamp(),
                        winston.format.ms(),
                        nestWinstonModuleUtilities.format.nestLike('NestHomeBackend', { prettyPrint: true })
                    )
                })
            ]
        })
    });
    app.enableCors();
    app.enableShutdownHooks();
    const configService = app.get(ConfigService);
    await app.listen(configService.get('PORT'), configService.get('HOST'));
}

bootstrap();
