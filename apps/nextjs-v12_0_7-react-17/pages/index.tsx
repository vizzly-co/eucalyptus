import type { NextPage } from 'next'

import Vizzly from "@vizzly/dashboard";

export function getIdentity(userReference: string) {
  return async () => {
    // Hit the auth app
    const response = await fetch("https://example.vizzly.co:9012/identity", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        projectId: "prj_c474157d00824a6cb304ab76f947355f",
        secureFilters: {},
        dataSetIds: "*",
        // Sharing the same project as the other NEXTJS example app.
        scope: "read",
        userReference,
      }),
    });

    const { accessTokens } = await response.json();

    return accessTokens;
  };
}


const Home: NextPage = () => {
  return (
    <div>
      <Vizzly.Dashboard
        id="dashboard-id"
        featureToggles={{ disableAutoSave: true }}
        vizzlyApiHost="https://staging.api.vizzly.co"
        queryEngineEndpoint="https://staging.api.vizzly.co/managed/mqe_f69a3d3ad797479492e2f91a25d3add2"
        parentDashboardId="dsh_0c23c9f4146745118fcfaabf5aab5184"
        identity={getIdentity("nextjs-v12_0_7-react-17")}
      />
    </div>
  )
}

export default Home
