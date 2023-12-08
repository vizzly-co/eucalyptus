import * as React from "react";
import { createRoot } from "react-dom/client";
import Vizzly from "@vizzly/dashboard";
import {Vizzly as VizzlyServices} from "@vizzly/services";
import { SaveableDashboardDefinition } from "@vizzly/dashboard/dist/shared-logic/src/Dashboard";

const ALLOWED_OPERATORS = ['=', '!=', '>', '<', '>=', '<=', 'is_one_of', 'is_not_one_of'];

VizzlyServices.load('in-browser');

function App() {
  return (
    <Vizzly.Dashboard
        vizzlyApiHost="https://staging.api.vizzly.co"
        parentDashboardId="dsh_ba16afe31482425fadbc2c56d42374f1"
        dashboardId="dsh_ba16afe31482425fadbc2c56d42374f1"
        dataSets={async () => {
          return [
            {
              id: "data_set_1",
              name: "My first data set",
              fields: [
                {
                  dataType: "number" as const,
                  publicName: "Player age",
                  id: "fie_1",
                  canBeDimension: false,
                  canBeMeasure: true,
                  allowedOperators: ALLOWED_OPERATORS
                },
                {
                  dataType: "string" as const,
                  publicName: "Game",
                  id: "fie_2",
                  canBeDimension: true,
                  canBeMeasure: false,
                  allowedOperators: ALLOWED_OPERATORS
                },
                {
                  dataType: "number" as const,
                  publicName: "Score",
                  id: "fie_3",
                  canBeDimension: false,
                  canBeMeasure: true,
                  allowedOperators: ALLOWED_OPERATORS
                },
                {
                  dataType: "date_time" as const,
                  publicName: "Recorded at",
                  id: "fie_4",
                  canBeDimension: false,
                  canBeMeasure: true,
                  allowedGranularities: ["month", "year"],
                  allowedOperators: ALLOWED_OPERATORS
                },
              ],
            },
          ];
        }}
        data={async (dataSet) => {
          if (dataSet.id == "data_set_1") {
            return [
              {
                fie_1: 16,
                fie_2: "Space invaders",
                fie_3: 54,
                fie_4: "2023-01-30T08:21:25.459Z",
              },
              {
                fie_1: 12,
                fie_2: "Space invaders",
                fie_3: 54,
                fie_4: "2023-02-13T08:21:25.459Z",
              },
              {
                fie_1: 9,
                fie_2: "Space invaders",
                fie_3: 4,
                fie_4: "2023-03-13T08:21:25.459Z",
              },
              {
                fie_1: 19,
                fie_2: "Space invaders",
                fie_3: 140,
                fie_4: "2023-04-07T08:21:25.459Z",
              },
              {
                fie_1: 90,
                fie_2: "Tetris",
                fie_3: 7,
                fie_4: "2023-03-13T08:21:25.459Z",
              },
              {
                fie_1: 73,
                fie_2: "Tetris",
                fie_3: 68,
                fie_4: "2023-04-07T08:21:25.459Z",
              },
            ];
          } else {
            throw "Unknown data set.";
          }
        }}

        parentDashboard={async (dataSets) => {
          const dashboard = new VizzlyServices.Dashboard<SaveableDashboardDefinition>('dsh_ba16afe31482425fadbc2c56d42374f1');
          const barChart = new VizzlyServices.BarChart(dataSets[0]);

            barChart.updateAttributes({
              dimension: [{ field: 'fie_2', function: 'none', pivot: 'x' }],
              measure: [{ field: 'fie_1', function: 'count' }],
              displayTitle: 'A programmatically built in-browser dashboard!',
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

          console.log(dashboard.build());
          return [dashboard.build()];
        }}
        identity={async () => {
          // Hit the auth app
          const response = await fetch('http://koala-tree.vizzly.co:9012/identity', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              projectId: 'prj_03871e9efc4545abbeff44e1a72975b8',
              secureFilters: {},
              dataSetIds: '*',
              userReference: 'a user id - 287492483',
              scope: 'read'
            })
          });

          const { accessTokens } = await response.json();

          return accessTokens;
        }}
      />
  );
}

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
