import * as React from "react";
import { createRoot } from "react-dom/client";
import Vizzly from "@vizzly/dashboard";
import fetch from 'isomorphic-fetch'

function App() {
  return (
    <Vizzly.Dashboard
        vizzlyApiHost="https://staging.api.vizzly.co"
        // Hit dynamic query engine for remote configs
        queryEngineEndpoint="http://koala-tree.vizzly.co:9021"
        parentDashboardId="dsh_10ccd531d5d949deaec6183740df468e"
        identity={async () => {
          // Hit the auth app
          const response = await fetch('http://koala-tree.vizzly.co:9012/identity', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              projectId: 'prj_64ad10208e024edda174aa0436ebf590',
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
