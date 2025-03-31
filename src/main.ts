import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function main() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");
  app.enableCors({
    origin: "http://localhost:3000", // Nuxt URL
  });
  await app.listen(process.env.PORT || 5000);
}
void main();
