import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.development';
import { CategoryDataResponse } from '../../../models/catgery-data.interface';

@Injectable({
  providedIn: 'root'
})
export class CatogeriesService {
    private readonly httpClient = inject(HttpClient);

   
   getAllCatogeries():Observable<CategoryDataResponse> {
    return this.httpClient.get<CategoryDataResponse>(`${environment.baseUrl}/api/v1/categories`);
   }
   getSpecficCatogery(catogeryId: string):Observable<any> {
    return this.httpClient.get<any>(`${environment.baseUrl}/api/v1/categories/${catogeryId}`);
   }

}
