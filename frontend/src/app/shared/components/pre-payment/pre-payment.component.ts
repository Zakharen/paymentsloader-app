import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PrePaymentService} from './pre-payment.service';
import {Account} from '../../models';

@Component({
  selector: 'app-pre-payment',
  templateUrl: './pre-payment.component.html',
  styleUrls: ['./pre-payment.component.scss']
})
export class PrePaymentComponent implements OnInit {

  public form: FormGroup;
  public accounts: Account[] = [];
  public accountsList: any[] = [];

  constructor(
      private formBuilder: FormBuilder,
      private prePaymentService: PrePaymentService,
  ) { }

  ngOnInit() {
    this.initPrePaymentForm();
    this.getPaymentsAccounts();
  }

  private getPaymentsAccounts() {
    const self = this;
    self.prePaymentService.getAccounts()
        .subscribe((res: Account[]) => {
          self.accounts = res;
          try {
            self.accountsList = res.map((account: Account) => {
              return {
                account: account.Account,
                templateId: account.Id,
              };
            });
          } catch (e) {
            console.log('ERROR: Parsing accounts select list data source.');
          }
        });
  }

  private initPrePaymentForm() {
    const self = this;
    self.form = self.formBuilder.group({
      narrative: ['', Validators.required],
      templateId: ['', Validators.required],
    });
  }

}
