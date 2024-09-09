import React from "react";
import Vizzly, { VizzlyState } from "@vizzly/dashboard";
import fetch from "isomorphic-fetch";

const originals = {
  salary_greater_than: { value: 80000 },
  rule_one_job_title: { value: "Software Engineer" },
  rule_two_job_title: { value: "Network Engineer" },
  department: { value: "Engineering" },
  goalLine: { value: 16 },
};

export const VariablesComponent = () => {
  return (
    <React.StrictMode>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div style={{ width: 200 }}>
          <h3>Drilldown Actions</h3>
          <ul>
            <span>Percentage</span>
            <hr />
            <li>
              <button
                onClick={() => {
                  VizzlyState.set("dashboard-id", {
                    variables: { salary_greater_than: { value: 90000 } },
                  });
                }}
              >
                Set Salary to 90000
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  VizzlyState.set("dashboard-id", {
                    variables: { salary_greater_than: { value: 100000 } },
                  });
                }}
              >
                Set Salary to 100000
              </button>
            </li>
            <br />
            <br />
            <span>Conditional</span>
            <hr />
            <li>
              <button
                onClick={() => {
                  VizzlyState.set("dashboard-id", {
                    variables: { department: { value: "Operations" } },
                  });
                }}
              >
                Set Department to Operations
              </button>
            </li>
            <br />
            <br />
            <span>Rules</span>
            <hr />
            <li>
              <button
                onClick={() => {
                  VizzlyState.set("dashboard-id", {
                    variables: {
                      rule_one_job_title: { value: "Senior Software Engineer" },
                    },
                  });
                }}
              >
                Set Job Title 1 to "Senior Software Engineer"
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  VizzlyState.set("dashboard-id", {
                    variables: {
                      rule_two_job_title: { value: "Product Manager" },
                    },
                  });
                }}
              >
                Set Job Title 2 to "Product Manager"
              </button>
            </li>
            <br />
            <br />
            <span>Goal Line</span>
            <hr />
            <li>
              <button
                onClick={() => {
                  VizzlyState.set("dashboard-id", {
                    variables: {
                      goalLine: { value: 21 },
                    },
                  });
                }}
              >
                Set Goal line to 21
              </button>
            </li>
            <br />
            <br />
            <hr />
            <li>
              <button
                onClick={() => {
                  VizzlyState.set("dashboard-id", {
                    variables: originals,
                  });
                }}
              >
                Reset
              </button>
            </li>
          </ul>
        </div>
        <div style={{ flex: 1 }}>
          <Vizzly.Dashboard
            id="dashboard-id"
            featureToggles={{ disableAutoSave: true }}
            vizzlyApiHost="https://staging.api.vizzly.co"
            queryEngineEndpoint="https://staging.api.vizzly.co/managed/mqe_f69a3d3ad797479492e2f91a25d3add2"
            parentDashboardId="dsh_2e5fd9f491754e92aa8fcb34962414e0"
            developerTools={{ viewRawResults: true, viewRawAttributes: true }}
            identity={getIdentity(getQueryVariable("user") ?? "new_user")}
            variables={() => {
              return originals;
            }}
          />
        </div>
      </div>
    </React.StrictMode>
  );
};

export function getIdentity(userReference: string) {
  return async () => {
    const scope = getQueryVariable("scope") ?? "read_write";
    // Hit the auth app
    const response = await fetch("https://example.vizzly.co:9012/identity", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        projectId: "prj_c474157d00824a6cb304ab76f947355f",
        secureFilters: {},
        dataSetIds: "*",
        scope,
        userReference,
        accessType: "admin",
      }),
    });

    const { accessTokens } = await response.json();

    return accessTokens;
  };
}

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (decodeURIComponent(pair[0]) === variable) {
      return decodeURIComponent(pair[1]);
    }
  }
}
