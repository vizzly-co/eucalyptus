import * as React from "react";
import { createRoot } from "react-dom/client";
import { useDashboardManager } from "@vizzly/dashboard";

const identity = async () => {
  const userReference = window.location.hash || 'default user';

  // Hit the auth app
  const response = await fetch('http://koala-tree.vizzly.co:9012/identity', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      projectId: 'prj_716b32cc83b74ccf834cc15265d235da',
      secureFilters: {},
      dataSetIds: '*',
      userReference: userReference,
      scope: 'read_write'
    })
  });

  const { accessTokens } = await response.json();

  return accessTokens;

};

function App() {
  const queryEngineEndpoint = 'https://staging.api.vizzly.co/managed/mqe_454b10ff78fc44a0be7efde4642004c4';
  const parentDashboardId = 'dsh_0ec51fad1014400da0665eb8bfce849b';
  const { dashboards, VizzlySDK, createDashboard, deleteDashboard, updateDashboardMeta } = useDashboardManager(identity, queryEngineEndpoint, parentDashboardId, {host: 'https://staging.api.vizzly.co'});

  if(! VizzlySDK) return null;

  return (
    <>
      <button onClick={() => {
          createDashboard({});
      }} data-testid="create-empty-dashboard-btn">Create empty dashboard</button>
      <ul data-testid="dashboards-list">
        {dashboards.map((dashboard) => {
          return (
            <li data-testid="dashboards-list-item" style={{ marginBottom: '20px' }}>
              <pre>META: {JSON.stringify(dashboard.metadata)}</pre>
              <pre>id: {dashboard.id}</pre>
              <button onClick={() => deleteDashboard(dashboard.id)}>Delete</button>
              <button onClick={() => updateDashboardMeta(dashboard.id, { number: 1 })}>Update</button>
            </li>
          );
        })}
      </ul>
    </>
  );
}

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
