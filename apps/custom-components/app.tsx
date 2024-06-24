import React, { Fragment, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import Vizzly, { VizzlyState } from "@vizzly/dashboard";
import fetch from "isomorphic-fetch";

import { QueryResponse, Vizzly as VizzlyServices } from "@vizzly/services";
// Replace the attributes from any `app.tsx` project in the eucalyptus to have a local environment that hot-updates!

const App = () => {
  const [vizzlyLoaded, setVizzlyLoaded] = useState<boolean>(false);

  useEffect(() => {
    async function initializeVizzly() {
      try {
        await VizzlyServices.load(
          {
            queryEngine:
              "https://staging.api.vizzly.co/managed/mqe_f69a3d3ad797479492e2f91a25d3add2",
            identity: getIdentity("new_user"),
          },
          { apiHost: "https://staging.api.vizzly.co" }
        );
        const instance = await VizzlyServices.waitToUse();
        setVizzlyLoaded(!!instance);
      } catch (err) {
        console.error(err);
      }
    }

    initializeVizzly();
  }, []);

  if (!vizzlyLoaded) {
    return <div>Loading...</div>;
  }

  return <Component />;
};

const Component = () => {
  const [componentResponse, setComponentResponse] =
    useState<QueryResponse | null>(null);

  useEffect(() => {
    const doSomething = async () => {
      const vizzly = VizzlyServices.use();
      const response = await vizzly.query([
        {
          filter: [],
          measure: [
            {
              field: "vizzly_field_13blvsg",
              function: "count",
            },
          ],
          dimension: [
            {
              field: "vizzly_field_13blvsg",
              function: "none",
              pivot: "x",
            },
          ],
          timeDimension: null,
          dataSetId: "vizzly_data_set_1vd4gau",
          order: [],
        },
      ]);
      setComponentResponse(response);
    };

    doSomething();
  }, []);

  return (
    <React.StrictMode>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ width: 200 }}>
          <h3>Actions</h3>
          <ul>
            <li>
              <b>TimeDimension Chart</b>
            </li>
            <li>
              <button
                onClick={() =>
                  VizzlyState.drilldown("dashboard-id", {
                    viewId: "view_3cab0022-0f16-43f7-93d0-909aeb6fa439",
                    existingField: {
                      field: "vizzly_field_1ko27d",
                      function: "year",
                      value: "2015-01-01T00:00:00.000Z",
                    },
                    newField: {
                      field: "vizzly_field_1ko27d",
                      function: "month",
                    },
                  })
                }
              >
                timeDimension to timeDimension
              </button>
            </li>
            <li>
              <button
                onClick={() =>
                  VizzlyState.drilldown("dashboard-id", {
                    viewId: "view_3cab0022-0f16-43f7-93d0-909aeb6fa439",
                    existingField: {
                      field: "vizzly_field_1ko27d",
                      function: "year",
                      value: "2015-01-01T00:00:00.000Z",
                    },
                    newField: {
                      field: "vizzly_field_1i21bbz",
                      function: "none",
                    },
                  })
                }
              >
                timeDimension to dimension
              </button>
            </li>
            <li>
              <b>Dimension Chart</b>
            </li>
            <li>
              <button
                onClick={() =>
                  VizzlyState.drilldown("dashboard-id", {
                    viewId: "view_ebb7aba6-af15-4a5c-82e7-384d2ed9df9f",
                    existingField: {
                      field: "vizzly_field_6ufsfs",
                      function: "none",
                      value: "HR Manager",
                    },
                    newField: {
                      field: "vizzly_field_1ko27d",
                      function: "month",
                    },
                  })
                }
              >
                dimension to timeDimension
              </button>
            </li>
            <li>
              <button
                onClick={() =>
                  VizzlyState.drilldown("dashboard-id", {
                    viewId: "view_ebb7aba6-af15-4a5c-82e7-384d2ed9df9f",
                    existingField: {
                      field: "vizzly_field_6ufsfs",
                      function: "none",
                      value: "HR Manager",
                    },
                    newField: {
                      field: "vizzly_field_1i21bbz",
                      function: "none",
                    },
                  })
                }
              >
                dimension to dimension
              </button>
            </li>
          </ul>
        </div>
        <div style={{ flex: 1 }}>
          <h3>
            This app tests the <code>customViews</code>,{" "}
            <code>customOverrides</code> and drilldown features.
          </h3>
          <Vizzly.Dashboard
            id="dashboard-id"
            featureToggles={{ disableAutoSave: true }}
            vizzlyApiHost="https://staging.api.vizzly.co"
            queryEngineEndpoint="https://staging.api.vizzly.co/managed/mqe_f69a3d3ad797479492e2f91a25d3add2"
            parentDashboardId="dsh_0c23c9f4146745118fcfaabf5aab5184"
            developerTools={{ viewRawResults: true, viewRawAttributes: true }}
            identity={getIdentity("new_user")}
            renderDownloadIcon={(props) => <div>JSX Download Icon</div>}
            renderResetIcon={(props) => `<div>string Reset Icon</div>`}
            customViews={[
              {
                id: "string",
                Component: () => {
                  return (
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        height: "100%",
                        alignItems: "center",
                      }}
                    >
                      <div
                        style={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          flexDirection: "column",
                          padding: "2rem",
                          textAlign: "center",
                          gap: "1rem",
                        }}
                      >
                        {componentResponse && componentResponse.results ? (
                          <Fragment>
                            <div>
                              <h3>Content</h3>
                              <p>
                                {JSON.stringify(
                                  componentResponse.results[0] &&
                                    "content" in componentResponse.results[0]
                                    ? componentResponse.results[0].content
                                    : componentResponse.results[0]
                                )}
                              </p>
                            </div>
                            <div>
                              <h3>Fields</h3>
                              <p>
                                {JSON.stringify(
                                  componentResponse.results[0] &&
                                    "fields" in componentResponse.results[0]
                                    ? componentResponse.results[0].fields
                                    : undefined
                                )}{" "}
                              </p>
                            </div>
                          </Fragment>
                        ) : (
                          "Loading..."
                        )}
                      </div>
                    </div>
                  );
                },
                rowIndex: 0,
                cellIndex: 1,
                attributes: {
                  displayTitle: "Query Response",
                },
              },
              {
                id: "four-candles",
                Component: () => (
                  <div style={{ width: 200, height: 200 }}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="#67AB49"
                    >
                      <path d="M6 12a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 1 1 1.5 0v7.5A.75.75 0 0 1 6 12ZM18 12a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 0 1 1.5 0v7.5A.75.75 0 0 1 18 12ZM6.75 20.25v-1.5a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0ZM18.75 18.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 1.5 0ZM12.75 5.25v-1.5a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0ZM12 21a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 0 1 1.5 0v7.5A.75.75 0 0 1 12 21ZM3.75 15a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0ZM12 11.25a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5ZM15.75 15a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0Z" />
                    </svg>
                  </div>
                ),
                title: "Candle Sticks",
                Icon: () => (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{ width: 20, height: 20 }}
                  >
                    <path d="M6 12a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 1 1 1.5 0v7.5A.75.75 0 0 1 6 12ZM18 12a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 0 1 1.5 0v7.5A.75.75 0 0 1 18 12ZM6.75 20.25v-1.5a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0ZM18.75 18.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 1.5 0ZM12.75 5.25v-1.5a.75.75 0 0 0-1.5 0v1.5a.75.75 0 0 0 1.5 0ZM12 21a.75.75 0 0 1-.75-.75v-7.5a.75.75 0 0 1 1.5 0v7.5A.75.75 0 0 1 12 21ZM3.75 15a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0ZM12 11.25a2.25 2.25 0 1 1 0-4.5 2.25 2.25 0 0 1 0 4.5ZM15.75 15a2.25 2.25 0 1 0 4.5 0 2.25 2.25 0 0 0-4.5 0Z" />
                  </svg>
                ),
                options: {
                  raw: true,
                },
              },
            ]}
          />
        </div>
      </div>
    </React.StrictMode>
  );
};

export function getIdentity(userReference: string) {
  return async () => {
    // Hit the auth app
    const response = await fetch("http://koala-tree.vizzly.co:9012/identity", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        projectId: "prj_c474157d00824a6cb304ab76f947355f",
        secureFilters: {},
        dataSetIds: "*",
        scope: "read_write",
        userReference,
      }),
    });

    const { accessTokens } = await response.json();

    return accessTokens;
  };
}

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
