import { FieldPacket } from "mysql2";
import { AdEntity, NewAdEntity } from "../types";
import { pool } from "../utils/db";
import { ValidationError } from "../utils/errors";

type AdRecordResult = [AdEntity[], FieldPacket[]];

export class AdRecord implements AdEntity {
  id: string;
  name: string;
  price: number;
  url: string;
  lat: number;
  lon: number;
  description: string;

  constructor(obj: NewAdEntity) {
    if (!obj.name || obj.name.length > 100) {
      throw new ValidationError('Nazwa ogłoszenia nie może być pusta ani przekraczać 100 znaków');
    }
    if (obj.description.length > 1000) {
      throw new ValidationError('Treść ogłoszenia nie może przekraczać 1000 znaków');
    }
    if (obj.price < 0 || obj.price > 9999999) {
      throw new ValidationError('Cena nie może być mniejsza niż 0 lub większa niż 9999999');
    }
    if (!obj.url || obj.url.length > 100) {
      throw new ValidationError('Adres url ogłoszenia nie może być pusty ani przekraczać 100 znaków');
    }
    if (typeof obj.lat !== 'number' || typeof obj.lon !== 'number') {
      throw new ValidationError('Nie można zlokalizować ogłoszenia')
    }

    this.id = obj.id
    this.name = obj.name;
    this.description = obj.description;
    this.price = obj.price;
    this.url = obj.url;
    this.lat = obj.lat;
    this.lon = obj.lon;
  }
  static async getOne(id: string): Promise<AdRecord | null> {
    const [result] = await pool.execute("SELECT * FROM `ads` WHERE `id` = :id", {
      id,
    }) as AdRecordResult;

    return result.length === 0 ? null : new AdRecord(result[0])
  } 
}