import {
  Component,
  OnInit,
  CUSTOM_ELEMENTS_SCHEMA,
  AfterViewInit,
  SimpleChanges,
  ChangeDetectorRef,
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
  onDashboardLoad: (dashboard: {
    id: string;
    metadata: {
      name: string;
    };
    scope: string;
    dataSets: DataSet[];
  }) => void;
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
  reportName: string | null = null;
  userId: string | null = null;

  // Injecting dependencies for DashboardService and ChangeDetectorRef
  // DashboardService is used for any service calls required by the dashboard component.
  // ChangeDetectorRef is used for manually triggering change detection within Angular.
  // This is particularly useful for updating the view when data changes occur outside of Angular's detection mechanisms.
  constructor(
    private dashboardService: DashboardService,
    private cdRef: ChangeDetectorRef
  ) {}

  // ngOnInit is called after Angular initializes the component's data-bound properties.
  ngOnInit() {
    this.dashboardService.getReportId().subscribe((id) => {
      this.reportId = id;
      // Waits for the external 'dashboard' script to be loaded and ready.
      // This is crucial because the external script might not be immediately available
      // after the component is initialized, especially if it's loaded asynchronously.
      this.waitForDashboard().then(() => this.initializeDashboard());
    });
    const urlParams = new URLSearchParams(window.location.search);
    this.userId = urlParams.get('userId');
  }

  // ngAfterViewInit is called after Angular fully initializes the component's view.
  // This hook is often used for DOM manipulations or for operations that depend on the template rendering.
  ngAfterViewInit(): void {
    this.waitForDashboard().then(() => this.initializeDashboard());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dashboard'] && changes['dashboard'].currentValue) {
      this.waitForDashboard().then(() => this.initializeDashboard());
    }
  }

  // Waits for the external 'dashboard' script to load and be ready for use.
  // Since external scripts are loaded asynchronously, this ensures that any attempt to use the
  // 'dashboard' object only occurs after it has been fully loaded and defined.
  private waitForDashboard(): Promise<void> {
    return new Promise((resolve) => {
      // Immediately resolves the promise if 'dashboard' is already available.
      if (typeof dashboard !== 'undefined' && dashboard.render) {
        resolve();
      } else {
        // Sets up a MutationObserver to listen for changes in the DOM.
        // This is useful if the 'dashboard' object is expected to be attached to the DOM
        // as a result of the external script loading and executing.
        const observer = new MutationObserver((_, obs) => {
          // Checks for the availability of 'dashboard' after any DOM change.
          if (typeof dashboard !== 'undefined' && dashboard.render) {
            resolve();
            obs.disconnect(); // Disconnects the observer once 'dashboard' is ready.
          }
        });
        observer.observe(document, { childList: true, subtree: true });
      }
    });
  }

  private initializeDashboard() {
    // Checks if the 'dashboard.render' method is defined before attempting to call it.
    if (dashboard.render !== undefined) {
      dashboard.render({
        vizzlyApiHost: 'https://staging.api.vizzly.co',
        dataSets: async () => {
          return DATASET;
        },
        onDashboardLoad: (loadedDashboard) => {
          this.reportId = loadedDashboard.id;
          this.reportName = `bob ${loadedDashboard.scope}`;

          // Manually trigger Angular's change detection to update the view with new data.
          // This is necessary because the update to properties happen outside of Angular's usual detection cycle,
          // such as an asynchronous callback or a DOM event handler.
          this.cdRef.detectChanges();
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
