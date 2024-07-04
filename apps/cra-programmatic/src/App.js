import React from 'react';
import Vizzly from '@vizzly/dashboard';
import { Vizzly as VizzlyServices } from '@vizzly/services';

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

const getApiEnvironment = () => {
  const apiEnvironment = getQueryVariable('apiEnvironment');

  switch (apiEnvironment) {
    case 'staging':
      return 'staging';
    default:
      return 'live';
  }
};

const identity = async () => {
  let identityEndpoint = 'https://example.vizzly.co/api/identity';

  if (window.location.hash) {
    identityEndpoint = `${identityEndpoint}?userId=${window.location.hash.slice(1)}`;
  }

  const response = await fetch(identityEndpoint);

  if (response.ok) {
    const tokens = await response.json();

    return getApiEnvironment() === 'live' ? tokens.liveTokens : tokens.stagingTokens;
  }

  return null;
};

function App() {
  const userId = window.location.hash.slice(1);

  return (
    <>
      {userId !== '' && (
        <Vizzly.Dashboard
          onViewClick={clickEvent => console.log('Received click event', clickEvent)}
          queryEngineEndpoint={'https://example.vizzly.co/query-engine'}
          identity={identity}
          parentDashboard={async dataSets => {
            const dataSetId = dataSets[0].id;

            const barChart = new VizzlyServices.BarChart({ dataSetId });

            barChart.updateAttributes({
              dimension: [{ field: 'fie_3', function: 'none', pivot: 'x' }],
              measure: [{ field: 'cc5327b537d34f6d903466f32e7f2cab', function: 'count' }],
              displayTitle: 'New title',
              approxYAxisLabelCount: 0,
              legend: false,
            });
            const singleStat = new VizzlyServices.SingleStat({ dataSetId });
            singleStat.updateAttributes(getSingleStatAttributes());

            const row = [
              new VizzlyServices.Cell({
                component: singleStat,
                colSpan: userId === 'user-one' ? 7 : 12,
                localFilters: [
                  {
                    type: 'multiSelectFilter',
                    appliesToFields: [{ dataSetId: 'data_set_1', fieldId: 'fie_6' }],
                    title: 'Department',
                    value: null,
                    managedByConfiguration: false,
                    requiresValue: false,
                  },
                ],
              }),
            ];

            if (userId === 'user-one') {
              row.push(new VizzlyServices.Cell({ component: barChart, colSpan: 5 }));
            }
            const rowOne = new VizzlyServices.Row(row, 214);
            const dataTable = new VizzlyServices.PivotTable({ dataSetId });
            dataTable.updateAttributes(getDataTableAttributes(userId));
            const cellForDataTable = new VizzlyServices.Cell({ component: dataTable, colSpan: 12 });


            const comboChart = new VizzlyServices.ComboChart(buildComboChart(dataSets[1]));

            const library = new VizzlyServices.Library();

            library.addComponent(comboChart, 'combo_chart');

            const dashboard = new VizzlyServices.Dashboard('dsh_15fdd3b681d6491eba1fd9dbaa3745e9', {
              display: [
                new VizzlyServices.Header(`${userId}'s programmatic dashboard in Examples/Programmatic`),
                rowOne,
                new VizzlyServices.Row([cellForDataTable], 530),
              ],
              customFields: buildCustomFields(),
              library,
            });

            return [dashboard.build()];
          }}
        />
      )}
    </>
  );
}

export default App;

function buildComboChart(dataSet) {
  return {
    dataSetId: dataSet.id,
    displayTitle: "Combo chart's title",
    displaySubject: 'Uses a different dataset',
    lineDimension: [{ field: 'fie_10', function: 'none', pivot: 'x' }],
    lineMeasure: [{ field: 'fie_8', function: 'mean' }],
    barDimension: [{ field: 'fie_10', function: 'none', pivot: 'x' }],
    barMeasure: [{ field: 'fie_6', function: 'mean' }],
    protectedByOrganisation: true,
  };
}

function buildCustomFields() {
  return {
    data_set_1: [
      {
        id: '0027a5673f0140928ecbcb3bb7655af8',
        canBeDimension: false,
        canBeMeasure: true,
        dataType: 'number',
        denominatorAggregate: 'count',
        denominatorFieldId: 'fie_3',
        publicName: 'Gender = Female',
        allowedOperators: ['>', '<', '=', '!=', '>=', '<=', 'is_one_of', 'is_not_one_of'],
        numeratorFilter: [[{ field: 'fie_3', op: '=', value: 'Female' }]],
      },
      {
        allowedOperators: [
          '=',
          '!=',
          'is_one_of',
          'is_not_one_of',
          'starts_with',
          'ends_with',
          'contains_substring',
          'does_not_contain_substring',
        ],
        canBeDimension: true,
        canBeMeasure: true,
        dataType: 'string',
        id: 'cc5327b537d34f6d903466f32e7f2cab',
        publicName: 'Test Rule For Deleting',
        rules: [
          {
            name: 'Finance/Ops',
            rule: [
              [
                {
                  field: 'fie_6',
                  op: '=',
                  value: 'Operations',
                },
              ],
            ],
          },
          {
            name: 'Engineering',
            rule: [
              [
                {
                  field: 'fie_6',
                  op: '=',
                  value: 'Engineering',
                },
              ],
            ],
          },
        ],
      },
    ],
  };
}

function getDataTableAttributes(userId) {
  let measure = [
    { field: 'fie_1', function: 'mean' },
    { field: 'fie_2', function: 'count' },
    { field: 'fie_3', function: 'count' },
    { field: 'fie_6', function: 'count' },
  ];

  if (userId === 'user-one') {
    measure.push({ field: 'fie_7', function: 'count' });
  }
  return {
    dateTimeFormat: 'DD MMMM YYYY, hh:mm',
    dimension: [
      { field: 'fie_6', function: 'none', pivot: 'x' },
      { field: 'fie_3', function: 'none', pivot: 'x' },
    ],
    measure,
    tableDrilldown: [{ subsetDimension: 'fie_5_year' }],
    sizing: {
      fie_3: { width: 188 },
      fie_6: { width: 188 },
      '{"dimensionKeys":[],"dimensionValues":[],"fieldId":"fie_1","function":"mean"}': { width: 193 },
    },
  };
}

function getSingleStatAttributes() {
  return {
    viewId: 'overview_stats',
    deltaTimeDimension: { truncate: 'year', field: 'fie_5', bucketFill: false },
    formatter: {
      '0027a5673f0140928ecbcb3bb7655af8_mean': '_vizzly_to_percentage',
      fie_1_count: '_vizzly_compact',
      fie_8_mean: '_vizzly_to_eur',
    },
    measure: [
      { field: '0027a5673f0140928ecbcb3bb7655af8', function: 'mean' },
      { field: 'fie_8', function: 'mean' },
      { field: 'fie_1', function: 'countDistinct' },
    ],
  };
}
