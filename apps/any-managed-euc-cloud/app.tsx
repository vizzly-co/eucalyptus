import * as React from "react";
import { createRoot } from "react-dom/client";
import Vizzly from "@vizzly/dashboard";
import fetch from 'isomorphic-fetch'

function App() {
  const getQueryParam = (name: string, defaultValue?: string) => {
    return new URLSearchParams(window.location.search).get(name) ?? defaultValue;
  };

  const managedQueryEngineId = getQueryParam('managedQueryEngineId');
  const parentDashboardId = getQueryParam('parentDashboardId');
  const projectId = getQueryParam('projectId');
  const userReference = getQueryParam('userReference', 'default');
  const scope = getQueryParam('scope', 'read_write');

  return (
    <Vizzly.Dashboard
      vizzlyApiHost="https://staging.api.vizzly.co"
      queryEngineEndpoint={`https://staging.api.vizzly.co/managed/${managedQueryEngineId}`}
      parentDashboardId={parentDashboardId}
      developerTools={{ viewRawResults: true, viewRawAttributes: true }}
      identity={async () => {
        // Hit the auth app
        const response = await fetch('https://example.vizzly.co:9012/identity', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            projectId,
            secureFilters: {},
            dataSetIds: '*',
            scope,
            userReference
          }),
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
