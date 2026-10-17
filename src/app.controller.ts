import { Body, Controller, Get, Post, Query, Render } from '@nestjs/common';
import { AppService } from './app.service.js';
import { UjJatekDTO } from './ujJatek.dto.js';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  getHello() {
    return {
      title: 'My First NestJS App'
    }
  }


  @Get("macskaTabla")
  @Render("macskaTabla")
  async macskak() {
    const macskak = await this.appService.getMacskak()
    return { macskak }
  }

  @Get("jatekLista")
  @Render("jatekLista")
  async jatekok() {
    const jatekok = await this.appService.getJatekok()
    return { jatekok }
  }

  @Get("macskaKereses")
  @Render("macskaKereses")
  async getMacska(@Query("szemszin") szemszin: string) {
    let macskak = [] as any;
    if (szemszin) {
      macskak = await this.appService.getMacskaBySzemSzin(szemszin);
    }
    return {
      macskak,
      szemszin: szemszin || ""
    }
  }

  @Get('jatekform')
  @Render('jatekform')
  async ujJatekForm() {
    //
  }

  @Post('jatekform')
  @Render('jatekform')
  async ujJatek(@Body() body: UjJatekDTO) {
    const nev = body.nev;

    if (!nev || nev.trim() === '') {
      return {
        hiba: 'A játék neve nem lehet üres!',
        jatek: null,
      };
    }

    const jatek = await this.appService.UjJatek(nev.trim());

    return {
      hiba: '',
      jatek,
    };
  }
}




