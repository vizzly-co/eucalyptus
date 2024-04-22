import * as React from "react";
import { createRoot } from "react-dom/client";
import Vizzly, { useVizzly } from "@vizzly/dashboard";
import { Component } from "@vizzly/dashboard/dist/shared-logic/src/Component/types";

const ALLOWED_OPERATORS = [
  "=",
  "!=",
  ">",
  "<",
  ">=",
  "<=",
  "is_one_of",
  "is_not_one_of",
];

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
          allowedOperators: ALLOWED_OPERATORS,
        },
        {
          dataType: "string" as const,
          publicName: "Game",
          id: "fie_2",
          canBeDimension: true,
          canBeMeasure: false,
          allowedOperators: ALLOWED_OPERATORS,
        },
        {
          dataType: "number" as const,
          publicName: "Score",
          id: "fie_3",
          canBeDimension: false,
          canBeMeasure: true,
          allowedOperators: ALLOWED_OPERATORS,
        },
        {
          dataType: "date_time" as const,
          publicName: "Recorded at",
          id: "fie_4",
          canBeDimension: false,
          canBeMeasure: true,
          allowedGranularities: ["month", "year"],
          allowedOperators: ALLOWED_OPERATORS,
        },
        Vizzly.DataSetField.InBrowser.stringArray("fie_5", "Arcades"),
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
        fie_5: [],
      },
      {
        fie_1: 12,
        fie_2: "Space invaders",
        fie_3: 54,
        fie_4: "2023-02-13T08:21:25.459Z",
        fie_5: ["Arcade 8", "Arcade 2"],
      },
      {
        fie_1: 9,
        fie_2: "Space invaders",
        fie_3: 4,
        fie_4: "2023-03-13T08:21:25.459Z",
        fie_5: ["Arcade 8", "Arcade 9"],
      },
      {
        fie_1: 19,
        fie_2: "Space invaders",
        fie_3: 140,
        fie_4: "2023-04-07T08:21:25.459Z",
        fie_5: ["Arcade 0"],
      },
      {
        fie_1: 90,
        fie_2: "Tetris",
        fie_3: 7,
        fie_4: "2023-03-13T08:21:25.459Z",
        fie_5: ["Arcade 98"],
      },
      {
        fie_1: 73,
        fie_2: "Tetris",
        fie_3: 68,
        fie_4: "2023-04-07T08:21:25.459Z",
        fie_5: ["Arcade abc"],
      },
    ];
  } else {
    throw "Unknown data set.";
  }
};

const identity = async () => {
  // Hit the auth app
  const response = await fetch("http://koala-tree.vizzly.co:9012/identity", {
    method: "post",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      projectId: "prj_8d2f3aef91e74b57ace56843eff11332",
      secureFilters: {},
      dataSetIds: "*",
      userReference: "user_1",
      scope: "read_write",
      accessType: "standard",
    }),
  });

  const { accessTokens } = await response.json();

  return accessTokens;
};

function App() {
  const [libraryView, setLibraryView] = React.useState<Component | null>(null);

  const { loading, globalLibraries } = useVizzly(
    {
      queryEngine: "in-browser",
      identity: identity,
      dataSets,
    },
    {
      apiHost: "https://staging.api.vizzly.co",
    }
  );

  const selectLibraryItem = (index: number) => {
    if (globalLibraries[1].library.views) {
      setLibraryView(globalLibraries[1].library.views[index]);
    }
  };
  return (
    <>
      <div style={{ display: "flex" }}>
        <div style={{ width: 420 }}>
          {loading && <p>Loading...</p>}
          {globalLibraries && (
            <ul>
              {globalLibraries[1]?.library?.views?.map((view, index) => {
                return (
                  <li key={index} onClick={() => selectLibraryItem(index)}>
                    {view?.attributes.displayTitle}
                  </li>
                );
              })}
              {globalLibraries[1]?.library?.views?.length === 0 && (
                <p>No views found</p>
              )}
            </ul>
          )}
          <button
            onClick={() => setLibraryView(null)}
            disabled={libraryView === null}
          >
            Create global view
          </button>
        </div>
        <div style={{ flex: 1 }}>
          <Vizzly.Editor
            vizzlyApiHost="https://staging.api.vizzly.co"
            theme={{ rowLimit: 1 }}
            dataSets={dataSets}
            data={data}
            identity={identity}
            view={libraryView}
            onSave={(view) => console.log(view)}
          />
        </div>
      </div>
    </>
  );
}

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
