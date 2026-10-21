import { Injectable } from '@nestjs/common';
import mysql from 'mysql2/promise';
import { Macska } from './macskak.js';
import { Jatekok } from './jatekok.js';

const mysqlConnection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'macska',
});


@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  async getMacskak() {
    const [result] = await mysqlConnection.execute(
      'SELECT id, suly, szem_szin, gazdi_id, jatek_id FROM macskak'
    );
    const rows = result as Macska[];
    return rows;

  }

  async getJatekok() {
    const [result] = await mysqlConnection.execute(
      'SELECT id, nev FROM jatekok'
    );
    const rows = result as Jatekok[];
    return rows;
  }

  async getMacskaBySzemSzin(szemszin: string) {
    const [result] = await mysqlConnection.execute(
      'SELECT id, suly, szem_szin, gazdi_id, jatek_id FROM macskak WHERE szem_szin LIKE ?',
      [szemszin]
    )
    const rows = result as Macska[];
    return rows;
  }

  async UjJatek(nev:string){
    const [result] = await mysqlConnection.execute(
      'INSERT INTO jatekok(nev) VALUES(?)',
      [nev]
    );
    const rows = result as any;
    return{
      id: rows.insertId,
      nev
    }as Jatekok
  }









}
