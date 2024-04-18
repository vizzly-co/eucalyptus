import * as React from "react";
import { createRoot } from "react-dom/client";
import { useVizzly } from "@vizzly/dashboard";
import { Vizzly } from "@vizzly/services";

const parentDashboardId = 'dsh_0ec51fad1014400da0665eb8bfce849b';

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
      parentDashboardIds: [parentDashboardId],
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
  const vizzly = useVizzly({
    queryEngine: queryEngineEndpoint, identity
  }, {apiHost: 'https://staging.api.vizzly.co'});

  if(vizzly.loading) return null;
  const { dashboards, updateDashboard } = vizzly;

  const deleteDashboard = async (dashboardId: string) => {
    await updateDashboard({
      dashboardId,
      deleted: true
    })
  } 

  const updateDashboardMeta = async (dashboardId: string, meta?: Object) => {
    await updateDashboard({
      dashboardId,
      metadata: meta
    })
  }

  return (
    <>
      <button onClick={() => {
          vizzly.createDashboard({parentDashboardId, definition: new Vizzly.Dashboard().build()});
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
