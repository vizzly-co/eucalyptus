import {
  Component,
  OnInit,
  CUSTOM_ELEMENTS_SCHEMA,
  AfterViewInit,
  SimpleChanges,
} from '@angular/core';
import { getIdentity } from './getVizzlyIdentity';
import { CommonModule } from '@angular/common';
import { DashboardService } from './DashboardService';
import { DataSet } from '@vizzly/services/dist/shared-logic/src/DataSet/types';

type Dashboard = {
  vizzlyApiHost: string;
  dataSets: () => Promise<DataSet[]>;
  data: (dataSet: {
    id: string;
  }) => Promise<{ [key: string]: string | number }[]>;
  dashboardId: string | null;
  identity: () => Promise<any>;
};

declare var dashboard: {
  render?: (args: Dashboard) => void;
};

const ALLOWED_OPERATORS = [
  '=',
  '!=',
  '>',
  '<',
  '>=',
  '<=',
  'is_one_of',
  'is_not_one_of',
];

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: `./dashboard.component.html`,
  styleUrls: ['./dashboard.component.css'],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class VizzlyDashboard implements OnInit, AfterViewInit {
  reportId: string | null = null; // Private property for reportId
  userId: string | null = null;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit() {
    this.dashboardService.getReportId().subscribe((id) => {
      this.reportId = id;
      this.waitForDashboard().then(() => this.initializeDashboard());
    });
    const urlParams = new URLSearchParams(window.location.search);
    this.userId = urlParams.get('userId');
  }

  ngAfterViewInit(): void {
    this.waitForDashboard().then(() => this.initializeDashboard());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dashboard'] && changes['dashboard'].currentValue) {
      this.waitForDashboard().then(() => this.initializeDashboard());
    }
  }

  private waitForDashboard(): Promise<void> {
    return new Promise((resolve) => {
      if (typeof dashboard !== 'undefined' && dashboard.render) {
        resolve();
      } else {
        const observer = new MutationObserver((_, obs) => {
          if (typeof dashboard !== 'undefined' && dashboard.render) {
            resolve();
            obs.disconnect();
          }
        });
        observer.observe(document, { childList: true, subtree: true });
      }
    });
  }

  private initializeDashboard() {
    if (dashboard.render !== undefined) {
      dashboard.render({
        vizzlyApiHost: 'https://staging.api.vizzly.co',
        dataSets: async () => {
          return DATASET;
        },

        data: async (dataSet: { id: string }) => {
          if (dataSet.id == 'data_set_1') {
            return [
              {
                fie_1: 16,
                fie_2: 'Space invaders',
                fie_3: 54,
                fie_4: '2023-01-30T08:21:25.459Z',
              },
              {
                fie_1: 12,
                fie_2: 'Space invaders',
                fie_3: 54,
                fie_4: '2023-02-13T08:21:25.459Z',
              },
              {
                fie_1: 9,
                fie_2: 'Space invaders',
                fie_3: 4,
                fie_4: '2023-03-13T08:21:25.459Z',
              },
              {
                fie_1: 19,
                fie_2: 'Space invaders',
                fie_3: 140,
                fie_4: '2023-04-07T08:21:25.459Z',
              },
              {
                fie_1: 90,
                fie_2: 'Tetris',
                fie_3: 7,
                fie_4: '2023-03-13T08:21:25.459Z',
              },
              {
                fie_1: 73,
                fie_2: 'Tetris',
                fie_3: 68,
                fie_4: '2023-04-07T08:21:25.459Z',
              },
            ];
          } else {
            throw 'Unknown data set.';
          }
        },
        dashboardId: this.reportId,
        identity: getIdentity(this.userId ?? 'new_user'),
      });
    }
  }
}

export const DATASET = [
  {
    id: 'data_set_1',
    name: 'My first data set',
    fields: [
      {
        dataType: 'number' as const,
        publicName: 'Player age',
        id: 'fie_1',
        canBeDimension: false,
        canBeMeasure: true,
        allowedOperators: ALLOWED_OPERATORS,
      },
      {
        dataType: 'string' as const,
        publicName: 'Game',
        id: 'fie_2',
        canBeDimension: true,
        canBeMeasure: false,
        allowedOperators: ALLOWED_OPERATORS,
      },
      {
        dataType: 'number' as const,
        publicName: 'Score',
        id: 'fie_3',
        canBeDimension: false,
        canBeMeasure: true,
        allowedOperators: ALLOWED_OPERATORS,
      },
      {
        dataType: 'date_time' as const,
        publicName: 'Recorded at',
        id: 'fie_4',
        canBeDimension: false,
        canBeMeasure: true,
        allowedGranularities: ['month', 'year'],
        allowedOperators: ALLOWED_OPERATORS,
      },
    ],
  },
];
