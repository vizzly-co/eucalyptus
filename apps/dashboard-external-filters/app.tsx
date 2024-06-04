import * as React from "react";
import { createRoot } from "react-dom/client";
import Vizzly, { VizzlyState } from "@vizzly/dashboard";
import fetch from "isomorphic-fetch";

function App() {
  return (
    <>
      <button
        onClick={() =>
          VizzlyState.set("dashboard-id", {
            updateFilter: {
              properties: {
                value: "San Antonio",
                appliesToFields: [
                  {
                    dataSetId: "vizzly_data_set_1m591a9",
                    fieldId: "vizzly_field_coy7il",
                  },
                ],
              },
            },
          })
        }
      >
        San Antonio
      </button>
      <Vizzly.Dashboard
        id="dashboard-id"
        featureToggles={{ disableAutoSave: true }}
        vizzlyApiHost="https://staging.api.vizzly.co"
        // Hit dynamic query engine for remote configs
        queryEngineEndpoint="https://staging.api.vizzly.co/managed/mqe_c5d1bee83f1a464fa84522ed60097901"
        parentDashboardId="dsh_cf4284ad9da14477a2a14af03ebb961e"
        // featureToggles={{disableAutoSave: true}}
        dashboardId="dsh_5ebdf5fe6e45429ba231ddfa277ceb79"
        dashboardFilters={(dataSets) => {
          const dataSetToFilterOn = dataSets[0]!;
          return [
            {
              type: "singleSelectFilter",
              hidden: true,
              value: null,
              requiresValue: false,
              appliesToFields: [
                {
                  dataSetId: dataSetToFilterOn.id,
                  fieldId: "vizzly_field_coy7il",
                },
              ],
            },
          ];
        }}
        identity={async () => {
          // Hit the auth app
          const response = await fetch(
            "http://koala-tree.vizzly.co:9012/identity",
            {
              method: "post",
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
              },
              body: JSON.stringify({
                projectId: "prj_179d556343f0434e83f5ed30ca5b9cdf",
                secureFilters: {},
                dataSetIds: "*",
                scope: "read",
                userReference: window.location.hash || "a user id - 2874924832",
              }),
            }
          );

          const { accessTokens } = await response.json();

          return accessTokens;
        }}
      />
    </>
  );
}

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
