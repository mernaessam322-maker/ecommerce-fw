import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { ProductsDataResponse } from '../../../models/products-data.interface';
import { ProductsDetailsResponse } from '../../../models/product-details.interface';

@Service()
export class ProductsService {
    private readonly httpClient = inject(HttpClient);

    getAllProducts():Observable<ProductsDataResponse> {
        return this.httpClient.get<ProductsDataResponse>(`${environment.baseUrl}/api/v1/products`);
    }
    getSpecificProduct(productId: string):Observable<ProductsDetailsResponse> {
        return this.httpClient.get<ProductsDetailsResponse>(`${environment.baseUrl}/api/v1/products/${productId}`);
    }
}
