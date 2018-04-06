import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { Subject } from 'rxjs/Subject';

import { environment } from 'environments/environment';
import { RequestService } from 'app/shared';


export interface IJobModel {
  id: string;
  name: string;
  createDate: Date;
  updateDate: Date;
  xmlContent: string;
  svgContent: string;
}

export interface ICreateJobRequest {
  name: string;
}

export interface IDeleteJobRequest {
  name: string;
}


@Injectable()
export class StoreService {

  constructor(
    private requestService: RequestService
  ) {
  }

  public createJob(request: ICreateJobRequest): Observable<any> {
    return this.requestService.post('/design/process', request);
  }

  public deleteJob (request: IDeleteJobRequest): Observable<any> {
    return this.requestService.delete ('/design/process/' + request.name, request);
  }

  public getJobModelList(): Observable<IJobModel[]> {
    return this.requestService.get('/design/process');
  }

}
