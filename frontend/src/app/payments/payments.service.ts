import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Payment} from '../shared/models';
import {RequestHelperService} from '../core/services';
import {catchError} from 'rxjs/operators';

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
    return self.http
        .get<Payment[]>(`${self.apiUrl}/api/payments?filedatefrom=2019-01-05&filedateto=2019-01-07`)
        .pipe(catchError(RequestHelperService.handleError));
  }
}
