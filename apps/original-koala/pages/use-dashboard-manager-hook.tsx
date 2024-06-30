import React, { useState } from 'react';
import type { NextPage } from 'next'
import {useVizzly, Dashboard as VizzlyDashboard} from '@vizzly/dashboard';

const PARENT_DASHBOARD_ONE = 'dsh_f6021680dc4d44189c21825616682814';
const PARENT_DASHBOARD_TWO = 'dsh_4da877a0b4204eb581912eda124bf56d';
const PARENT_DASHBOARD_IDs = [PARENT_DASHBOARD_ONE, PARENT_DASHBOARD_TWO].join(',')

// Staging API backed...
const PROJECT_ID = 'prj_d9884781755243f5a64c3444640fb241';

const STAGING_VIZZLY_API_HOST = 'https://staging.api.vizzly.co';
const identity = (userReference: string) => async () => {
  console.log('userReference', userReference);
  const resp = await fetch(`/api/customizable-staging-identity?projectId=${PROJECT_ID}&parentDashboardIds=${PARENT_DASHBOARD_IDs}&userReference=${userReference}`);

  if(resp.ok) {
    return (await resp.json()).tokens;
  }
};

const QUERY_ENGINE_ENDPOINT = 'https://example.vizzly.co/staging-api-backed';

const Dashboard: NextPage = () => {
  const userReference = typeof window === 'object' ? (window.location.hash).replace('#', '') : 'default user';
  const identityFn = identity(userReference);

  const [parentDashboardId, setParentDashboardId] = useState<string>()
  const [dashboardId, setDashboardId] = useState<string | undefined>(undefined);

  const dashboardManager = useVizzly({
    identity: identityFn,
    queryEngine: QUERY_ENGINE_ENDPOINT,
  }, {
    apiHost: STAGING_VIZZLY_API_HOST
  });

  const parentDashboards = dashboardManager.loading ? [] : dashboardManager.filterDashboards(dashboardManager.dashboards, {onlyParentDashboards: true});
  const childDashboards = dashboardManager.loading ? [] : dashboardManager.filterDashboards(dashboardManager.dashboards, {onlyChildDashboards: true});

  return (
    <>
      <header style={{background: "#174082", position: "relative", width: "100%", height: "50px"}} />
      <h2>Parent dashboards</h2>
      <ul>
        {parentDashboards.map(parentDashboard => (
          <li key={`parent_${parentDashboard.id}`} onClick={() => setParentDashboardId(parentDashboard.id)}>PARENT {parentDashboard.id}</li>
        ))}
      </ul>

      <h2>Child dashboards</h2>
      <ul>
        {childDashboards.map(childDashboard => (
          <li key={`child_${childDashboard.id}`} onClick={() => setDashboardId(childDashboard.id)}>CHILD {childDashboard.id}</li>
        ))}
      </ul>
      <h2>The dashboard</h2>
      <p>child: {dashboardId === undefined ? 'undefined' : dashboardId}</p>
      <p>isAdmin: {dashboardManager.accessType === 'admin' ? 'YES' : 'NO'}</p>
      <br />
      {/* @ts-ignore */}
      <VizzlyDashboard
        vizzlyApiHost={STAGING_VIZZLY_API_HOST}
        parentDashboardId={parentDashboardId}
        dashboardId={dashboardId}
        queryEngineEndpoint={QUERY_ENGINE_ENDPOINT}
        identity={identityFn}
      />
    </>
  )
}

export default Dashboard
