import * as React from "react";
import { createRoot } from "react-dom/client";
import Vizzly from "@vizzly/dashboard";
import fetch from 'isomorphic-fetch'

function App() {
  return (
    <Vizzly.Dashboard
        vizzlyApiHost="https://staging.api.vizzly.co"
        // Hit dynamic query engine for remote configs
        queryEngineEndpoint="https://staging.api.vizzly.co/managed/mqe_2366962f5f354df3a6fce9ac1b68eb47"
        parentDashboardId="dsh_08d75fc72c4e4bcf970ce90d234f926d"
        // featureToggles={{disableAutoSave: true}}
        developerTools={{viewRawResults: true}}
        identity={async () => {
          // Hit the auth app
          const response = await fetch('http://koala-tree.vizzly.co:9012/identity', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              projectId: 'prj_719ed637834e4605be0c19fe25a38ed5',
              secureFilters: {},
              dataSetIds: '*',
              scope: 'read',
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
