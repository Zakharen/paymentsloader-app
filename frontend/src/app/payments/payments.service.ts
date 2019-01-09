import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Payment} from '../shared/models';
import {RequestHelperService} from '../core/services';
import {catchError} from 'rxjs/operators';
import {FileDates} from '../shared/components/dates-range/models';

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
  public getPayments(dates?: FileDates) {
    const self = this;
    let paramsString = '';
    if (dates) {
      const params: any = dates;
      paramsString = `?filedatefrom=${params.filedatefrom}&filedateto=${params.filedateto}`;
    }
    return self.http
        .get<Payment[]>(`${self.apiUrl}/api/payments${paramsString}`)
        .pipe(catchError(RequestHelperService.handleError));
  }
}
