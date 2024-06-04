import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import Vizzly from "@vizzly/dashboard";
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
      <Vizzly.Dashboard
        featureToggles={{ disableAutoSave: true }}
        vizzlyApiHost="https://staging.api.vizzly.co"
        queryEngineEndpoint="https://staging.api.vizzly.co/managed/mqe_f69a3d3ad797479492e2f91a25d3add2"
        parentDashboardId="dsh_0c23c9f4146745118fcfaabf5aab5184"
        developerTools={{ viewRawResults: true, viewRawAttributes: true }}
        identity={getIdentity("new_user")}
        customComponents={[
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
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      style={{ width: 48, height: 48 }}
                    >
                      <path d="M11.7 2.805a.75.75 0 0 1 .6 0A60.65 60.65 0 0 1 22.83 8.72a.75.75 0 0 1-.231 1.337 49.948 49.948 0 0 0-9.902 3.912l-.003.002c-.114.06-.227.119-.34.18a.75.75 0 0 1-.707 0A50.88 50.88 0 0 0 7.5 12.173v-.224c0-.131.067-.248.172-.311a54.615 54.615 0 0 1 4.653-2.52.75.75 0 0 0-.65-1.352 56.123 56.123 0 0 0-4.78 2.589 1.858 1.858 0 0 0-.859 1.228 49.803 49.803 0 0 0-4.634-1.527.75.75 0 0 1-.231-1.337A60.653 60.653 0 0 1 11.7 2.805Z" />
                      <path d="M13.06 15.473a48.45 48.45 0 0 1 7.666-3.282c.134 1.414.22 2.843.255 4.284a.75.75 0 0 1-.46.711 47.87 47.87 0 0 0-8.105 4.342.75.75 0 0 1-.832 0 47.87 47.87 0 0 0-8.104-4.342.75.75 0 0 1-.461-.71c.035-1.442.121-2.87.255-4.286.921.304 1.83.634 2.726.99v1.27a1.5 1.5 0 0 0-.14 2.508c-.09.38-.222.753-.397 1.11.452.213.901.434 1.346.66a6.727 6.727 0 0 0 .551-1.607 1.5 1.5 0 0 0 .14-2.67v-.645a48.549 48.549 0 0 1 3.44 1.667 2.25 2.25 0 0 0 2.12 0Z" />
                      <path d="M4.462 19.462c.42-.419.753-.89 1-1.395.453.214.902.435 1.347.662a6.742 6.742 0 0 1-1.286 1.794.75.75 0 0 1-1.06-1.06Z" />
                    </svg>
                    <h2 style={{ fontSize: "1.5rem", color: "#282828" }}>
                      Vizzly Custom Components
                    </h2>
                  </div>
                </div>
              );
            },

            rowIndex: 0,
            cellIndex: 1,
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
      {componentResponse ? JSON.stringify(componentResponse) : "Loading..."}
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
