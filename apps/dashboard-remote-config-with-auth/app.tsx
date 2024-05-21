import * as React from "react";
import { createRoot } from "react-dom/client";
import Vizzly from "@vizzly/dashboard";
import fetch from 'isomorphic-fetch'

function App() {
  return (
    <Vizzly.Dashboard
        vizzlyApiHost="https://staging.api.vizzly.co"
        // Hit dynamic query engine for remote configs
        queryEngineEndpoint={{
          endpoint: "http://koala-tree.vizzly.co:2121",
          customHeaders: () => ({
            'Auth-Remote-Config-Token': '1'
          })
        }}
        parentDashboardId="dsh_78f5b281ae614344ad658cc885a127a6"
        identity={async () => {
          // Hit the auth app
          const response = await fetch('http://koala-tree.vizzly.co:9012/identity', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              projectId: 'prj_ccb21c52e567489bb776b4fc2b6cfa3c',
              secureFilters: {},
              dataSetIds: '*',
              scope: 'read_write',
              userReference: window.location.hash || 'a user id - 2874924832'
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
