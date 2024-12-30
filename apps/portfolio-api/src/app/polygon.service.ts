import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InfluxDB, Point, QueryApi } from '@influxdata/influxdb-client';
import {DeleteAPI} from '@influxdata/influxdb-client-apis'
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PolygonService {
  private readonly apiUrl = 'https://api.polygon.io/v3/reference/tickers';
  private readonly apiKey = 'cRYeCVwa6bbN6MYgRSz7UY8G9dTgsR7a';

  private readonly influxClient = new InfluxDB({
    url: 'http://localhost:8086',
    token: 'ntOxTYDetN6F8_aNpijVrDQB2AyHDv4R3RggXJwVJfovpKD33bupABTn8bK8cphZzBvCtkNvir3IH7ugt_l-8g==',
  });
  private readonly org = 'maxqinfotech';
  private readonly bucket = 'portfolio';

  constructor(private readonly httpService: HttpService) {}

  async fetchAndStoreTickers(): Promise<void> {
    let nextUrl: string | null = `${this.apiUrl}?type=CS&market=stocks&limit=2`;

    do {
      const response = await lastValueFrom(
        this.httpService.get(nextUrl, {
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
          },
        }),
      );

      const data = response.data;
      console.log(data);
      if (data && data.results) {
        await this.storeInInflux(data.results);
      }

      nextUrl = data.next_url || null;
      break;
    } while (nextUrl);
  }

  private async storeInInflux(tickers: any[]): Promise<void> {
    const writeApi = this.influxClient.getWriteApi(this.org, this.bucket);
    writeApi.useDefaultTags({ source: 'polygon-api' });

    tickers.forEach((ticker) => {
      const point = new Point('ticker')
        .tag('ticker', ticker.ticker)
        .tag('name', ticker.name)
        .tag('market', ticker.market)
        .tag('locale', ticker.locale)
        .tag('primary_exchange', ticker.primary_exchange)
        .tag('type', ticker.type)
        .stringField('data', JSON.stringify({ // Store other fields in a single 'data' field
            active: ticker.active,
            currency_name: ticker.currency_name,
            cik: ticker.cik,
            composite_figi: ticker.composite_figi,
            share_class_figi: ticker.share_class_figi,
          }))        
        .timestamp(new Date(ticker.last_updated_utc));

      writeApi.writePoint(point);
    });

    await writeApi.close();
  }

  async fetchTickerFromInflux(tickerSymbol: string): Promise<any> {
    const queryApi: QueryApi = this.influxClient.getQueryApi(this.org);
    const fluxQuery = `
      from(bucket: "${this.bucket}")
        |> range(start: -30d)
        |> filter(fn: (r) => r["ticker"] == "${tickerSymbol}")
    `;

    const results: any[] = [];
    return new Promise((resolve, reject) => {
      queryApi.queryRows(fluxQuery, {
        next(row, tableMeta) {
          const rowObject = tableMeta.toObject(row);
          results.push(rowObject);
        },
        error(error) {
          console.error(error);
          reject(error);
        },
        complete() {
          resolve(results);
        },
      });
    });
  } 
  
  async deleteAllTickersData(): Promise<void> {
    const url = "http://localhost:8086";
    const token = "ntOxTYDetN6F8_aNpijVrDQB2AyHDv4R3RggXJwVJfovpKD33bupABTn8bK8cphZzBvCtkNvir3IH7ugt_l-8g==";
    const influxDB = new InfluxDB({ url, token });    
    const deleteAPI = new DeleteAPI(influxDB);
    const start = '1970-01-01T00:00:00Z'; // Start from the beginning of time
    const stop = new Date().toISOString(); // Up to now

    try {
      await deleteAPI.postDelete({
        org: this.org,
        bucket: this.bucket,
        body: {
          start,
          stop,
          predicate: '_measurement="ticker"',
        },
      });
      console.log('All tickers data deleted successfully');
    } catch (error) {
      console.error('Error deleting tickers data:', error);
      throw error;
    }
  }  
}
