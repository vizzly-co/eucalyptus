import * as React from "react";
import { createRoot } from "react-dom/client";
import Vizzly from "@vizzly/dashboard";
import fetch from 'isomorphic-fetch'
import {Vizzly as VizzlyServices} from "@vizzly/services";
import { SaveableDashboardDefinition } from "@vizzly/dashboard/dist/shared-logic/src/Dashboard";

const QUERY_ENGINE_ENDPOINT = 'https://staging.api.vizzly.co/managed/mqe_c5d1bee83f1a464fa84522ed60097901';

VizzlyServices.load(QUERY_ENGINE_ENDPOINT);

function App() {
  const [aggregateToUse, setAggregateToUse] = React.useState<'mean' | 'sum'>('mean');

  return (
    <>
    <button onClick={() => {
      setAggregateToUse('sum');
    }}>Set aggregate to sum</button>

    <Vizzly.Dashboard
        key={`${aggregateToUse}`}
        queryEngineEndpoint={QUERY_ENGINE_ENDPOINT}
        parentDashboardId="dsh_aca6424f5f9244a3a688c17df901d771"
        parentDashboard={async (dataSets) => {
          const dashboard = new VizzlyServices.Dashboard<SaveableDashboardDefinition>('dsh_aca6424f5f9244a3a688c17df901d771');
          const dataSet = dataSets[0];
          const barChart = new VizzlyServices.BarChart(dataSet);

          // Use first string field as dimension
          const dimensionField = dataSet.fields.find(field => field.dataType === 'string')!;

          // Use first number field as dimension
          const metricField = dataSet.fields.find(field => field.dataType === 'number')!;
          

            barChart.updateAttributes({
              dimension: [{ field: dimensionField.id, function: 'none', pivot: 'x' }],
              measure: [{ field: metricField.id, function: aggregateToUse }],
              displayTitle: `Using aggregate ${aggregateToUse}!`,
              approxYAxisLabelCount: 0,
              legend: false,
            });

            const row = [
              new VizzlyServices.Cell({
                component: barChart,
                colSpan: 12,
                localFilters: [],
              }),
            ];

            const rowOne = new VizzlyServices.Row(row, 500);

          dashboard.setDisplay([rowOne]);

          console.log(dashboard.build());
          return [dashboard.build()];
        }}
        identity={async () => {
          // Hit the auth app
          const response = await fetch('https://example.vizzly.co:9012/identity', {
            method: 'post',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
            body: JSON.stringify({
              projectId: 'prj_179d556343f0434e83f5ed30ca5b9cdf',
              secureFilters: {},
              dataSetIds: '*',
              scope: 'read',
              userReference: 'external view changes'
            })
          });

          const { accessTokens } = await response.json();

          return accessTokens;
        }}
        vizzlyApiHost="https://staging.api.vizzly.co"
      />
    </>
  );
}

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
