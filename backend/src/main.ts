import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule, {
        logger: console
    });
    app.enableCors();
    app.enableShutdownHooks();
    const configService = app.get(ConfigService);
    await app.listen(configService.get('PORT'), configService.get('HOST'));
}

bootstrap();
