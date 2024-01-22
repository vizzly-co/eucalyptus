import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Vizzly as VizzlyServices } from '@vizzly/services';
import { getIdentity } from './getVizzlyIdentity';
import { DATASET } from './dashboard.component';
import { v4 as uuidv4 } from 'uuid';
import { CommonModule } from '@angular/common';
import { DashboardService } from './DashboardService';

VizzlyServices.load('in-browser');

@Component({
  selector: 'app-dashboard-management',
  standalone: true,
  templateUrl: `./dashboard-management.component.html`,
  imports: [CommonModule],
  styleUrls: ['./dashboard-management.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class VizzlyDashboardManagement implements OnInit {
  api: any;
  dashboards: { version: number; id: string }[] | undefined;
  loading = false;
  userId: string | null = null;

  constructor(private dashboardService: DashboardService) {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
    this.userId = userId;
    this.api = new VizzlyServices.API(getIdentity(userId ?? 'new_user'), {
      parentDashboardId: 'dsh_19544ac518ce402bb98564d0db639211',
      vizzlyAPIConfig: { host: 'https://staging.api.vizzly.co' },
    });
  }

  ngOnInit(): void {
    this.getDashboards();
  }

  async getDashboards(): Promise<void> {
    this.loading = true;
    try {
      const response = await this.api.getAllChildDashboards();

      if (response) {
        this.dashboards = response
          .slice(0, 5)
          .map((dashboard: { metadata: { version: number } }) => {
            return {
              ...dashboard,
              version: dashboard.metadata.version ?? 1,
            };
          });
      }
    } catch (error) {
      this.loading = false;
    }
  }

  async createReport(): Promise<void> {
    try {
      const definition = buildDefaultDashboard(this.userId ?? 'new_user');

      await this.api.createDashboard({
        definition,
        metadata: { version: 1 },
      });

      await this.getDashboards();
    } catch (error) {
      console.error('Error creating dashboard:', error);
    }
  }

  async updateVersion(reportId: string, version: number) {
    try {
      const metadata = { version: version + 1 };
      await this.api.updateDashboard(reportId, { metadata });
      await this.getDashboards();
    } catch (error) {
      console.error('Error updating dashboard:', error);
    }
  }

  async deleteReport(reportId: string) {
    try {
      await this.api.deleteDashboard(reportId);
      await this.getDashboards();
    } catch (error) {
      console.error('Error deleting dashboard:', error);
    }
  }

  goToReport(reportId: string): void {
    this.dashboardService.setReportId(reportId);
    // window.location.href = `/?userId=${this.userId}&reportId=${reportId}`;
  }
}

function buildDefaultDashboard(userId: string) {
  const id = uuidv4();
  const dashboard = new VizzlyServices.Dashboard(`dsh_${id}`);
  const barChart = new VizzlyServices.BarChart(DATASET[0]);

  barChart.updateAttributes({
    dimension: [{ field: 'fie_2', function: 'none', pivot: 'x' }],
    measure: [{ field: 'fie_1', function: 'count' }],
    displayTitle: 'A programmatically built in-browser dashboard!',
    displaySubject: `For user ${userId}`,
    approxYAxisLabelCount: 0,
    legend: false,
  });

  const row = [
    new VizzlyServices.Cell({
      component: barChart,
      colSpan: 12,
      localFilters: [],
    }),
  ];

  const rowOne = new VizzlyServices.Row(row, 500);

  dashboard.setDisplay([rowOne]);

  const newDashboard = dashboard.build();
  return newDashboard;
}
