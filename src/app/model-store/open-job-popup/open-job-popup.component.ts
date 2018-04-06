import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation
} from '@angular/core';

import { ISubscription } from 'rxjs/Subscription';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import {
  IJobModel,
  StoreService,
  ManagerService
} from '../../core';


@Component({
  selector: 'app-open-job-popup',
  templateUrl: './open-job-popup.component.pug',
  styleUrls: ['./open-job-popup.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OpenJobPopupComponent implements OnInit, OnDestroy {

  private storeSubscription: ISubscription;
  private selectedJob: IJobModel;

  public jobs: IJobModel[];

  constructor(
    private storeService: StoreService,
    private activeModal: NgbActiveModal,
    private managerService: ManagerService
  ) {
  }

  public ngOnInit(): void {

    this.storeSubscription = this.storeService.getJobModelList().subscribe((jobs) => {
      this.jobs = jobs;
    });

  }

  /**
   * Set given job as selected
   */
  public selectJob(job: IJobModel): void {
    this.selectedJob = job;
  }

  /**
   * Returns true if given job is selected
   */
  public isSelectedJob(job: IJobModel): boolean {
    return this.selectedJob === job;
  }

  /**
   * Returns true if there is any job selected
   */
  public hasAnyJobSelected(): boolean {
    return this.selectedJob != null;
  }

  /**
   * Open given job or selected one
   */
  public openJob(job: IJobModel): void {
    if (!job && !this.hasAnyJobSelected()) {
      return;
    }

    this.activeModal.close({job: job || this.selectedJob});
  }

  /**
   * Delete a selected job
   */
  public deleteJob (): void {
    if (!this.hasAnyJobSelected()) {
      return;
    }

    this.storeService.deleteJob (this.selectedJob)
    .subscribe((job: IJobModel) => {

      this.activeModal.close({ job: job });

    }, (error: any) => {
     console.log ('job Delete Error ' + error.statusText);
    });
  }

  public dismiss(): void {
    this.activeModal.dismiss();
  }

  /**
   * Clean up resources
   */
  public ngOnDestroy(): void {
    this.storeSubscription.unsubscribe();
  }

}
