import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
  ViewChild
} from '@angular/core';

import { NgForm } from '@angular/forms';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import {
  IJobModel,
  ICreateJobRequest,
  StoreService
} from 'app/core';


@Component({
  selector: 'app-new-job-popup',
  templateUrl: './new-job-popup.component.pug',
  styleUrls: ['./new-job-popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewJobPopupComponent {

  private _busy: boolean;

  public request: ICreateJobRequest;
  public errorText: string;

  @ViewChild('newJobForm')
  public newJobForm: NgForm;

  constructor(
    private storeService: StoreService,
    private activeModal: NgbActiveModal
  ) {
    this.request = <any>{};
  }

  public createJob(): void {

    if (!this.canCreateJob()) {
      return;
    }

    this._busy = true;

    this.storeService
    .createJob(this.request)
    .subscribe((job: IJobModel) => {

      this.activeModal.close({ job: job });
      this._busy = false;

    }, (error: any) => {

      this.errorText = error.statusText;
      this._busy = false;

    });

  }

  public dismiss(): void {
    this.activeModal.dismiss();
  }

  public canCreateJob(): boolean {
    return this.newJobForm && this.newJobForm.valid;
  }

}
