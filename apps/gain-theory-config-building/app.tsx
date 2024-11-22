import React, { useState } from "react";
import { createRoot } from "react-dom/client";
import { addConfigToOriginSimulator } from './src/addConfigToOriginSimulator';

function App() {
  const [showDataImage, setShowDataImage] = useState(false);
  const connectionId = 'random connection id for GT demo';

  const config = {
    version: 1,
    executableDashboardConfigForPDF: null,
    publicKeys: [],
    sqlViews: {},
    connections: {
      [connectionId]: {
        client: 'postgres',
        name: 'Koala test DB',
        unencryptedCredentials: {
          password: 'customer',
          database: 'my_database',
          user: 'customer',
          host: 'koala-tree.vizzly.co',
          port: 5432
        }
      },
    },
    dataSets: [
      {
        id: 'das_1',
        description: 'something new',
        connectionId: connectionId,
        fields: [
          {
            id: 'fie_1',
            dataType: 'DATE',
            address: ['my_database', 'gaintheory', 'date'],
            publicName: 'Date'
          },
          {
            id: 'fie_2',
            dataType: 'TEXT',
            address: ['my_database', 'gaintheory', 'brand'],
            publicName: 'Brand'
          },
          {
            id: 'fie_3',
            dataType: 'TEXT',
            address: ['my_database', 'gaintheory', 'channel'],
            publicName: 'Channel'
          },
          {
            id: 'fie_4',
            dataType: 'TEXT',
            address: ['my_database', 'gaintheory', 'allchannelvarname1'],
          },
          {
            id: 'fie_5',
            dataType: 'TEXT',
            address: ['my_database', 'gaintheory', 'allchannelvarval1'],
            // TODO; make field name dynamic
            publicName: 'All channel var val 1',
          },
          {
            id: 'fie_6',
            dataType: 'TEXT',
            address: ['my_database', 'gaintheory', 'varname1'],
          },
          {
            id: 'fie_7',
            dataType: 'TEXT',
            address: ['my_database', 'gaintheory', 'varval1'],
            // TODO; make field name dynamic
            publicName: ' var val 1',
          },
          {
            id: 'fie_8',
            dataType: 'TEXT',
            address: ['my_database', 'gaintheory', 'varname2'],
          },
          {
            id: 'fie_9',
            dataType: 'TEXT',
            address: ['my_database', 'gaintheory', 'varval2'],
            // TODO; make field name dynamic
            publicName: 'var val 2',
          },
          {
            id: 'fie_10',
            dataType: 'TEXT',
            address: ['my_database', 'gaintheory', 'metricname1'],
          },
          {
            id: 'fie_11',
            dataType: 'TEXT',
            address: ['my_database', 'gaintheory', 'metricval1'],
            publicName: 'metric val 1'
          },
        ],
        name: 'Dynamic data set',
      },
    ],
  };

  const saveConfigAndOpenDashboard = async () => {
    const addedConfigId = await addConfigToOriginSimulator(config);
    const userReference = `user-${Math.random() * 5000}`;

    if(addedConfigId) {
      alert('Data set config saved. Redirecting you to the dashboard.');
      open(`https://example.vizzly.co:4002/?projectId=prj_add0100d8e7b42df8eaa00c86cadab27&parentDashboardId=dsh_4c616b59f4fe41419364722c0b833f32&authToken=${addedConfigId}&userReference=${userReference}`, '_blank');
    };

  };

  return (
    <>
      <button onClick={() => setShowDataImage(!showDataImage)}>{showDataImage ? 'hide' : 'show'} underlying data</button>
      {showDataImage && <img src="./data.png" width="100%" />}
      <h3>Config builder</h3>
      ...
      <button onClick={() => saveConfigAndOpenDashboard()}>save config & open dashboard</button>
      <h3>Data set config</h3>
      <pre>{JSON.stringify(config, null, 2)}</pre>
    </>
  );
}

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
