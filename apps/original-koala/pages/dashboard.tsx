import React from 'react';
import type { NextPage } from 'next'
import Vizzly from '@vizzly/dashboard';

const Dashboard: NextPage = () => {
  return (
    <>
      <header style={{background: "#174082", position: "relative", width: "100%", height: "50px"}} />
      <Vizzly.Dashboard
        queryEngineEndpoint='https://example.vizzly.co/query-engine'
        identity={async () => {
          const resp = await fetch("/api/identity");

          if(resp.ok) {
            return (await resp.json()).liveTokens;
          }
        }}
      />
    </>
  )
}

export default Dashboard
