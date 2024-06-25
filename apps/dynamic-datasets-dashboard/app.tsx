import * as React from "react";
import { createRoot } from "react-dom/client";
import Vizzly from "@vizzly/dashboard";
import fetch from 'isomorphic-fetch'

function App() {
  return (
    <Vizzly.Dashboard
        vizzlyApiHost="https://staging.api.vizzly.co"
        // Hit the node-smart-proxy app
        queryEngineEndpoint="https://example.vizzly.co:9010"
        parentDashboardId="dsh_7a675e99ce7b40f1a35fd87f04565803"
        identity={async () => {
          // Hit the auth app
          const response = await fetch('https://example.vizzly.co:9012/identity', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              projectId: 'prj_e46e7d3179bf4462884fc38544b7ddb3',
              secureFilters: {},
              dataSetIds: '*',
              userReference: 'a user id - 2874924832',
              scope: 'read_write'
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
