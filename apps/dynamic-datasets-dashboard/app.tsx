import * as React from "react";
import { createRoot } from "react-dom/client";
import Vizzly from "@vizzly/dashboard";
import fetch from 'isomorphic-fetch'

function App() {
  return (
    <Vizzly.Dashboard
        vizzlyApiHost="https://api.staging.vizzly.co"
        queryEngineEndpoint="http://koala-tree.vizzly.co:9010/dynamic"
        parentDashboardId="dsh_e3ce5f6fba9947d1ad798a5f09b31f7b"
        identity={async () => {
          const response = await fetch('http://koala-tree.vizzly.co:9012/identity', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              projectId: 'prj_7a314cbcb0944a8e915d484625ff46af',
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
