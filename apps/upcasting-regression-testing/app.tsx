import * as React from "react";
import { createRoot } from "react-dom/client";
import Vizzly from "@vizzly/dashboard";

const ALLOWED_OPERATORS = ['=', '!=', '>', '<', '>=', '<=', 'is_one_of', 'is_not_one_of'];

const ALL_SETTINGS = {
  '#conditional-formatting': {
    parentDashboardId: 'dsh_dc007ceae2c34abdb58a4181b0611669'
  }
};

function App() {
  const settings = ALL_SETTINGS[window.location.hash];

  if(! settings) throw `Please set the hashtag to one of ${Object.keys(ALL_SETTINGS).join(', ')}`;

  return (
    <Vizzly.Dashboard
        vizzlyApiHost="https://staging.api.vizzly.co"
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
        parentDashboardId={settings.parentDashboardId}
        dashboardId={settings.parentDashboardId}
        identity={async () => {
          // Hit the auth app
          const response = await fetch('https://example.vizzly.co:9012/identity', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              projectId: 'prj_844c4a7bc80e43c586f453a02b8da32d',
              secureFilters: {},
              dataSetIds: '*',
              userReference: 'foo bar',
              scope: 'read',
              accessType: 'standard'
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
