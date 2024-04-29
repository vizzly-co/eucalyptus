import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Vizzly as VizzlyServices } from '@vizzly/services';
import { getIdentity } from './getVizzlyIdentity';
import { DATASET } from './dashboard.component';
import { v4 as uuidv4 } from 'uuid';
import { CommonModule } from '@angular/common';
import { DashboardService } from './DashboardService';
import { Dashboard } from '@vizzly/services/dist/shared-logic/src/Dashboard';

VizzlyServices.load(
  {
    queryEngine: 'in-browser',
    identity: getIdentity(
      new URLSearchParams(window.location.search).get('userId') ?? 'new_user'
    ),
    dataSets: async () => [],
  },
  { apiHost: 'https://staging.api.vizzly.co' }
);

@Component({
  selector: 'app-dashboard-management',
  standalone: true,
  templateUrl: `./dashboard-management.component.html`,
  imports: [CommonModule],
  styleUrls: ['./dashboard-management.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class VizzlyDashboardManagement implements OnInit {
  dashboards: { version: number; id: string }[] | undefined;
  loading = false;
  userId: string | null = null;

  constructor(private dashboardService: DashboardService) {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get('userId');
    this.userId = userId;
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.getDashboards();
    }, 2_500);
  }

  async getDashboards(): Promise<void> {
    this.loading = true;
    const api = VizzlyServices.use();

    try {
      const response: Dashboard[] = (await api.getDashboards()).filter(
        (d) => d.parentDashboardId !== null
      );

      if (response) {
        this.dashboards = response.slice(0, 5).map((dashboard) => {
          const metadata = dashboard.metadata as { version: number };
          return {
            ...dashboard,
            version: metadata.version ?? 1,
          };
        });
      }
    } catch (error) {
      this.loading = false;
    }
  }

  async createReport(): Promise<void> {
    const api = VizzlyServices.use();
    try {
      const definition = buildDefaultDashboard(this.userId ?? 'new_user');

      await api.createDashboard({
        parentDashboardId: 'dsh_19544ac518ce402bb98564d0db639211',
        definition,
        metadata: { version: 1 },
      });

      await this.getDashboards();
    } catch (error) {
      console.error('Error creating dashboard:', error);
    }
  }

  async updateVersion(reportId: string, version: number) {
    const api = VizzlyServices.use();
    try {
      const metadata = { version: version + 1 };
      await api.updateDashboard({ dashboardId: reportId, metadata });
      await this.getDashboards();
    } catch (error) {
      console.error('Error updating dashboard:', error);
    }
  }

  async deleteReport(reportId: string) {
    const api = VizzlyServices.use();
    try {
      await api.updateDashboard({ dashboardId: reportId, deleted: true });
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
  const barChart = new VizzlyServices.BarChart({ dataSetId: DATASET[0].id });

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
