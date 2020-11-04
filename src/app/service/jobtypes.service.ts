import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IJobType } from '../pojo/jobTyp';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class JobtypesService {

  constructor(private http: HttpClient) { }
  private _urlGetJos = 'http://localhost:3000/products';

  getJobTypes(): Observable <IJobType[]> {
    return this.http.get<IJobType[]>(this._urlGetJos);
  }


  public addJobTypes(job: string) {
    let jobT = {Name: job};
    return this.http.post(this._urlGetJos, jobT).toPromise().then(data => {
      console.log(data);
    });
  }
}
