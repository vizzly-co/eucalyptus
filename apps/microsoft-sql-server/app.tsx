import * as React from "react";
import { createRoot } from "react-dom/client";
import Vizzly from "@vizzly/dashboard";
import fetch from 'isomorphic-fetch'

function App() {
  return (
    <Vizzly.Dashboard
        vizzlyApiHost="https://staging.api.vizzly.co"
        // Hit dynamic query engine for remote configs
        queryEngineEndpoint="https://staging.api.vizzly.co/managed/mqe_a08d4054b75646d5b5fdcc2b5b47eb4a"
        parentDashboardId="dsh_c3fe6a6ec1454f26858112c005446f90"
        // featureToggles={{disableAutoSave: true}}
        identity={async () => {
          // Hit the auth app
          const response = await fetch('http://koala-tree.vizzly.co:9012/identity', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              projectId: 'prj_be163620e3a04a2ab9dd80c53534276c',
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
