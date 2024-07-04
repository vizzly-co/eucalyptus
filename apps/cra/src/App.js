import React, { Fragment } from 'react';
import Vizzly from '@vizzly/dashboard';

function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) === variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  console.log('Query variable %s not found', variable);
}

const getDashboardId = () => {
  return getQueryVariable('dashboardId');
};

const getApiEnvironment = () => {
  const apiEnvironment = getQueryVariable('apiEnvironment');

  switch (apiEnvironment) {
    case 'staging':
      return 'staging';
    default:
      return 'live';
  }
};

const getApiEnvironmentHost = () => {
  const apiEnvironment = getApiEnvironment();

  switch (apiEnvironment) {
    case 'staging':
      console.log('Using staging Vizzly API');
      return 'https://staging.api.vizzly.co';

    default:
      console.log('Using live Vizzly API');
      return 'https://api.vizzly.co';
  }
};

const getIdentitySetupId = () => {
  switch (getIntegration()) {
    case 'staging-managed-snowflake':
      return 'm1';

    case 'staging-managed-bigquery':
      return 'm2';

    case 'staging-api-backed':
      return 's1';

    case 'postgres-vizzly-config-backed':
      return 'v1';

    default:
      return 'default';
  }
};

const getIntegration = () => {
  const queryEngineId = getQueryVariable('queryEngine');

  switch (queryEngineId) {
    case 'mariadb':
      return 'mariadb';

    case 'mysql':
      return 'mysql';

    case 'snowflake':
      return 'snowflake';

    case 'bigquery':
      return 'bigquery';

    case 'postgres-vizzly-config-backed':
      return 'postgres-vizzly-config-backed';

    case 'staging-managed-snowflake':
      return 'staging-managed-snowflake';

    case 'staging-managed-bigquery':
      return 'staging-managed-bigquery';

    case 'staging-api-backed':
      return 'staging-api-backed';

    default:
      console.warn('Defaulting to postgres');
      return 'postgres';
  }
};

const getQueryEngineEndpoint = () => {
  switch (getIntegration()) {
    case 'staging-managed-snowflake':
      return 'https://staging.api.vizzly.co/managed/mqe_5f346f06c1d046db995110c4a249d7ff';

    case 'staging-managed-bigquery':
      return 'https://staging.api.vizzly.co/managed/mqe_71c7f42be3f14f6b86abb83f90553ff4';

    case 'mariadb':
      return 'https://example.vizzly.co/mariadb';

    case 'mysql':
      return 'https://example.vizzly.co/mysql';

    case 'snowflake':
      return 'https://example.vizzly.co/snowflake';

    case 'bigquery':
      return 'https://query-engine-unstable-w2dtpp7jeq-nw.a.run.app';

    case 'postgres':
      // Postgres, the original...
      return 'https://example.vizzly.co/query-engine';

    case 'postgres-vizzly-config-backed':
      return 'https://example.vizzly.co/vizzly-backed-config';

    case 'staging-api-backed':
      return 'https://example.vizzly.co/staging-api-backed';

    default:
      return 'https://example.vizzly.co/query-engine';
  }
};

const getParentDashboardId = () => {
  const explicitParentDashboardId = getQueryVariable('parentDashboardId');
  if (explicitParentDashboardId) {
    console.log('overriding parent dashboard ID to become', explicitParentDashboardId);
    return explicitParentDashboardId;
  }

  switch (getIntegration()) {
    case 'mariadb':
      return 'dsh_172b731ac3a9426f829603402a39ee33';

    case 'mysql':
      return 'dsh_4d62a91a3442482a8a7bc113b1baec5d';

    case 'snowflake':
      return 'dsh_4810e5ed0840424c810a5051b7d8e066';

    case 'bigquery':
      return 'dsh_c0695308847740e490b7d1a6ae567eed';

    case 'postgres':
      return 'dsh_51285c81ff0545348a67fde1d73bc193';

    case 'postgres-vizzly-config-backed':
      return 'dsh_f0be7e76a3f64258a43f35d683c59695';

    case 'staging-managed-bigquery':
      return 'dsh_47643658eca4477a8e66adfd4048d501';

    case 'staging-managed-snowflake':
      return 'dsh_004e0b7b93924632b2f7450a91a30ff0';

    case 'staging-api-backed':
      return 'dsh_855273f195a941eb96cdc6fd76ccd5c1';

    default:
      return undefined;
  }
};

function App() {
  const [state, setState] = React.useState('dashboard');
  const userId = window.location.hash.slice(1);

  return (
    <>
      {userId === '' && <a href="./#some-user">Load as some-user</a>}
      {userId !== '' && (
        <Fragment>
          <div>
            <button onClick={() => setState('dashboard')}>dashboard</button>
            <button onClick={() => setState('editor')}>editor</button>
          </div>
          {state === 'dashboard' && (
            <Vizzly.Dashboard
              parentDashboardId={getParentDashboardId()}
              dashboardId={getDashboardId()}
              vizzlyApiHost={getApiEnvironmentHost()}
              onViewClick={clickEvent => console.log('Received click event', clickEvent)}
              reportScheduleOptions={[
                { cron: '0 09-17/2 * * *', description: 'Every two hours between 9 and 5' },
                { cron: '* * * * *', description: 'Every minute' },
                { cron: '10 * * * *', description: 'Every Hour' },
              ]}
              queryEngineEndpoint={getQueryEngineEndpoint()}
              identity={identity()}
            />
          )}
          {state === 'editor' && (
            <Vizzly.Editor
              developerTools={{
                viewRawAttributes: true,
              }}
              vizzlyApiHost={getApiEnvironmentHost()}
              queryEngineEndpoint={getQueryEngineEndpoint()}
              identity={identity()}
              view={async () => null}
              theme={{
                detail: 'minimal',
                rowLimit: 6,
                forms: {
                  input: {
                    color: 'rgb(55, 65, 81)',
                  },
                },
                section: {
                  panel: {
                    background: 'rgb(255, 255, 255)',
                    padding: '0.5rem 1rem 1rem',
                    border: '1px solid rgb(229, 231, 235)',
                    borderRadius: 4,
                  },
                  title: {
                    fontWeight: '500',
                  },
                },
                editor: {
                  settings: {
                    padding: '1rem 0.5rem 0.5rem',
                    border: '1px solid rgb(229, 231, 235)',
                  },
                  gap: '1.5rem',
                  component: {
                    background: 'rgb(255, 255, 255)',
                    border: '1px solid rgb(229, 231, 235)',
                    borderRadius: 4,
                  },
                },
              }}
            />
          )}
        </Fragment>
      )}
    </>
  );

  function identity() {
    return async () => {
      let identityEndpoint = `https://example.vizzly.co/api/identity?identitySetupId=${getIdentitySetupId()}`;

      if (window.location.hash) {
        identityEndpoint = `${identityEndpoint}&userId=${userId}`;
      }

      const response = await fetch(identityEndpoint);

      if (response.ok) {
        const tokens = await response.json();

        return getApiEnvironment() === 'live' ? tokens.liveTokens : tokens.stagingTokens;
      }

      return null;
    };
  }
}

export default App;
