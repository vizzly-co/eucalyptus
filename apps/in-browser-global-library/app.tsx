import * as React from "react";
import { createRoot } from "react-dom/client";
import Vizzly from "@vizzly/dashboard";

const ALLOWED_OPERATORS = ['=', '!=', '>', '<', '>=', '<=', 'is_one_of', 'is_not_one_of'];

const dataSets = async () => {
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
        Vizzly.DataSetField.InBrowser.stringArray('fie_5', 'Arcades')
      ],
    },
  ];
};
const data = async (dataSet) => {
  if (dataSet.id == "data_set_1") {
    return [
      {
        fie_1: 16,
        fie_2: "Space invaders",
        fie_3: 54,
        fie_4: "2023-01-30T08:21:25.459Z",
        fie_5: []
      },
      {
        fie_1: 12,
        fie_2: "Space invaders",
        fie_3: 54,
        fie_4: "2023-02-13T08:21:25.459Z",
        fie_5: ['Arcade 8', 'Arcade 2']
      },
      {
        fie_1: 9,
        fie_2: "Space invaders",
        fie_3: 4,
        fie_4: "2023-03-13T08:21:25.459Z",
        fie_5: ['Arcade 8', 'Arcade 9']
      },
      {
        fie_1: 19,
        fie_2: "Space invaders",
        fie_3: 140,
        fie_4: "2023-04-07T08:21:25.459Z",
        fie_5: ['Arcade 0']
      },
      {
        fie_1: 90,
        fie_2: "Tetris",
        fie_3: 7,
        fie_4: "2023-03-13T08:21:25.459Z",
        fie_5: ['Arcade 98']
      },
      {
        fie_1: 73,
        fie_2: "Tetris",
        fie_3: 68,
        fie_4: "2023-04-07T08:21:25.459Z",
        fie_5: ['Arcade abc']
      },
    ];
  } else {
    throw "Unknown data set.";
  }
};

const identity = async () => {
  // Hit the auth app
  const response = await fetch('http://koala-tree.vizzly.co:9012/identity', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      projectId: 'prj_d4fb430fd1fa4fdfb24a755bbfa482f2',
      secureFilters: {},
      dataSetIds: '*',
      userReference: window.location.hash,
      scope: 'read_write',
      accessType: 'standard'
    })
  });

  const { accessTokens } = await response.json();

  return accessTokens;
};

function App() {
  return (
    <>
      <h1>DASHBOARD ONE</h1>
      <p>dsh_219a89daff004526a42631d015a35b87</p>
      <div id="dash_1">
        <Vizzly.Dashboard
          vizzlyApiHost="https://staging.api.vizzly.co"
          parentDashboardId="dsh_219a89daff004526a42631d015a35b87"
          theme={{rowLimit: 1}}
          dataSets={dataSets}
          data={data}
          identity={identity}
        />
      </div>
    <hr /> <hr /> <hr /> <hr />
    <h1>DASHBOARD TWO</h1>
    <p>dsh_55e11612cf8f4b42bf29b3356dd60e11</p>
    <div id="dash_2">
      <Vizzly.Dashboard
        vizzlyApiHost="https://staging.api.vizzly.co"
        parentDashboardId="dsh_55e11612cf8f4b42bf29b3356dd60e11"
        theme={{rowLimit: 1}}
        dataSets={dataSets}
        data={data}
        identity={identity}
      />
      </div>
    </>
  );
}

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
