import { Controller, Get, Query, HttpException, HttpStatus, Delete } from '@nestjs/common';
import { PolygonService } from './polygon.service';

@Controller("polygon")
export class PolygonController {
    
    constructor(private readonly polygonService: PolygonService) {} 

    @Get('tickers')
    async getTickers() {
      return await this.polygonService.fetchAndStoreTickers();
    }

    @Get('fetch-ticker')
    async fetchTickerFromInflux(@Query('ticker') ticker: string): Promise<any> {
      if (!ticker) {
        throw new HttpException('Ticker symbol is required', HttpStatus.BAD_REQUEST);
      }
  
      try {
        const result = await this.polygonService.fetchTickerFromInflux(ticker);
        return result;
      } catch (error) {
        console.error('Error fetching ticker from InfluxDB:', error);
        throw new HttpException('Failed to fetch ticker data', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
    
    @Delete('delete-all-tickers')
    async deleteAllTickersData(): Promise<string> {
      try {
        await this.polygonService.deleteAllTickersData();
        return 'All tickers data deleted successfully';
      } catch (error) {
        console.error('Error deleting tickers data:', error);
        throw new HttpException('Failed to delete tickers data', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }           
}
