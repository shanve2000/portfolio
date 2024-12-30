import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PolygonController } from "./polygon.controller";
import { PolygonService } from "./polygon.service";
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [AppController, PolygonController],
  providers: [AppService, PolygonService],
})
export class AppModule {}
