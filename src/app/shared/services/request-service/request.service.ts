import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { environment } from 'environments/environment';

export interface IErrorResponse {
  status: number;
  statusText: string;
}

export interface ISuccessResponse {
  data: any;
  errors: string[];
  isSuccess: boolean;
}


@Injectable()
export class RequestService {

  constructor(
    private http: HttpClient
  ) {
  }

  private getApiUrl(url): string {
    return '/api' + url;
  }

  private getErrorFromResponse(response): IErrorResponse {
    if (response instanceof HttpErrorResponse) {
      return response.status === 0 ?
        { status: 0, statusText: 'No connection'} :
        { status: response.status, statusText: response.error ? response.error.errors.join() : response.statusText }
      ;
    }
    return { status: 0, statusText: 'Unknown error' };
  }

  private request<T>(url: string, method: string, body?: any): Observable<T> {

    return new Observable(observer => {

      this.http.request(method, this.getApiUrl(url), !body ? undefined : { body: body  })
      .subscribe(
        result => {
          observer.next((<any>result).data || result);
          observer.complete();
        },
        error => observer.error()
      );
    });
  }


  public get<T>(url: string): Observable<T> {
    return this.request(url, 'GET');
  }

  public post<T>(url: string, body?: T): Observable<T> {
    return this.request(url, 'POST', body);
  }

  public put<T>(url: string, body: T): Observable<T> {
    return this.request(url, 'PUT', body);
  }

  public delete<T>(url: string, body: T): Observable<T> {
    return this.request(url, 'DELETE', body);
  }

}
