import * as React from "react";
import { createRoot } from "react-dom/client";
import Vizzly from "@vizzly/dashboard";
import fetch from 'isomorphic-fetch'

function App() {
  const getQueryParam = (name: string, defaultValue?: string) => {
    return new URLSearchParams(window.location.search).get(name) ?? defaultValue;
  };

  // EXAMPLE ENDPOINT: /?projectId=prj_add0100d8e7b42df8eaa00c86cadab27&parentDashboardId=dsh_4c616b59f4fe41419364722c0b833f32&authToken=abc

  const parentDashboardId = getQueryParam('parentDashboardId');
  const projectId = getQueryParam('projectId');
  const userReference = getQueryParam('userReference', 'default');
  const scope = getQueryParam('scope', 'read_write');
  const authToken = getQueryParam('authToken');

  return (
    <Vizzly.Dashboard
      vizzlyApiHost="https://staging.api.vizzly.co"
      queryEngineEndpoint={{
        endpoint: `https://example.vizzly.co:4001`,
        customHeaders: authToken ? () =>  ({
          'Auth-Remote-Config-Token': authToken
        }) : undefined,
      }}
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
