import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private reportId = new BehaviorSubject<string | null>(null);

  setReportId(id: string | null): void {
    this.reportId.next(id);
  }

  getReportId(): BehaviorSubject<string | null> {
    return this.reportId;
  }
}
