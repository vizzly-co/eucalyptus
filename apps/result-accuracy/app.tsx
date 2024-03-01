import * as React from "react";
import { createRoot } from "react-dom/client";
import Vizzly from "@vizzly/dashboard";
import fetch from 'isomorphic-fetch'

function App() {
  return (
    <Vizzly.Dashboard
        vizzlyApiHost="https://staging.api.vizzly.co"
        // Hit dynamic query engine for remote configs
        queryEngineEndpoint="https://staging.api.vizzly.co/managed/mqe_f69a3d3ad797479492e2f91a25d3add2"
        parentDashboardId="dsh_0c23c9f4146745118fcfaabf5aab5184"
        developerTools={{ viewRawResults: true, viewRawAttributes: true }}
        identity={async () => {
          // Hit the auth app
          const response = await fetch('http://koala-tree.vizzly.co:9012/identity', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              projectId: 'prj_c474157d00824a6cb304ab76f947355f',
              secureFilters: {},
              dataSetIds: '*',
              scope: 'read_write',
              userReference: window.location.hash || 'a basic user'
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
