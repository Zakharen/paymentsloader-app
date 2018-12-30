import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymentsService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
  ) {
  }

  /**
   * Get all payments data
   */
  public getPayments() {
    const self = this;
    return self.http.get(`${self.apiUrl}/payments`);
  }
}
