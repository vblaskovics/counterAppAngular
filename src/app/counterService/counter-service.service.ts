import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { createClient } from "@libsql/client";

@Injectable({
  providedIn: 'root'
})
export class CounterServiceService {

  constructor(private http: HttpClient) { }

  client = createClient({
    url: "libsql://counter-szankdav.turso.io",
    authToken: "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3MTA3NjE4MTgsImlkIjoiNWJhYmIwOTItODk0Mi00NTU1LWI3NDAtYWM3OTE0OWI1MTNjIn0.tuaOahYx0A4DoDyGkbXoRUg-YS8_flmeeYzU7vlSYMTO1KDT86jV6EzjEmozYtdui1mhBg-rXydKA5_zatmCCQ",
  });

  getNumberFromServer(): Promise<number> {
    return new Promise(async (res, rej) => {
      try {
        const result = await this.client.execute("SELECT countedNumber FROM countedNumbers");
        const numberFromServer = result.rows[0]['countedNumber'];
        res(Number(numberFromServer))
      } catch (error) {
        console.error("Error while fetching the data:\n", error)
      }
    })
  }

  increaseNumberOnServer(): Promise<number> {
    return new Promise(async (res, rej) => {
      try {
        await this.client.execute("UPDATE countedNumbers SET countedNumber = countedNumber + 1");
        res(this.getNumberFromServer())
      } catch (error) {
        console.error("Error while increasing the number:", error);
      }
    })
  }

  decreaseNumberOnServer(): Promise<number> {
    return new Promise(async (res, rej) => {
      try {
        await this.client.execute("UPDATE countedNumbers SET countedNumber = countedNumber - 1");
        res(this.getNumberFromServer())
      } catch (error) {
        console.error("Error while decreasing the number:", error);
      }
    })
  }
}
