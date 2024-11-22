import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { addConfigToOriginSimulator } from './src/addConfigToOriginSimulator';
import { useForm } from 'react-hook-form';

type FormType = {
  channel: 'TV' | 'Digital';
  varOne: 'Network' | 'Campaign';
  varTwo: 'Show' | 'Site';
  metricNameOne: 'Revenue' | 'Transactions';
};

function App() {
  const [showDataImage, setShowDataImage] = useState(false);
  const connectionId = 'connection_to_koala_postgres';
  const { register, handleSubmit, getValues, setValue } = useForm<FormType>({
    defaultValues: {
      channel: 'Digital',
      metricNameOne: 'Revenue',
      varOne: 'Campaign',
      varTwo: 'Show'
    }
  });

  const [config, setConfig] = useState<any>(null);

  const onChange = () => {
    setConfig({
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
          id: 'Data set ID, unique per user',
          description: 'Custom built data set',
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
              id: 'fie_channel',
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
              id: 'fie_var_name_1',
              dataType: 'TEXT',
              address: ['my_database', 'gaintheory', 'varname1'],
            },
            {
              id: 'fie_7',
              dataType: 'TEXT',
              address: ['my_database', 'gaintheory', 'varval1'],
              publicName: getValues().varOne
            },
            {
              id: 'fie_var_name_2',
              dataType: 'TEXT',
              address: ['my_database', 'gaintheory', 'varname2'],
              // No publicName to keep it hidden
            },
            {
              id: 'fie_9',
              dataType: 'TEXT',
              address: ['my_database', 'gaintheory', 'varval2'],
              publicName: getValues().varTwo
            },
            {
              id: 'fie_10',
              dataType: 'TEXT',
              address: ['my_database', 'gaintheory', 'metricname1'],
            },
            {
              id: 'fie_11',
              dataType: 'INT',
              address: ['my_database', 'gaintheory', 'metricval1'],
              publicName: getValues().metricNameOne
            },
          ],
          name: 'Dynamic data set',
          // Permanent filters so that the correct data is filtered out by the various variables
          permanentFilters: {
            type: 'andWhere',
            value: [
              {
                type: "where",
                value: {
                  field: { type: "field", value: "fie_channel", function: "none" },
                  op: "=",
                  value: getValues().channel,
                },
              },
              {
                type: "where",
                value: {
                  field: { type: "field", value: "fie_var_name_1", function: "none" },
                  op: "=",
                  value: getValues().varOne,
                },
              },
              {
                type: "where",
                value: {
                  field: { type: "field", value: "fie_var_name_2", function: "none" },
                  op: "=",
                  value: getValues().varTwo,
                },
              },
            ]
          }
        },
      ],
    });
  }

  useEffect(() => {
    onChange()
  }, []);

  const saveConfigAndOpenDashboard = async (_data: FormType) => {
    const addedConfigId = await addConfigToOriginSimulator(config);
    const userReference = `user-${Math.random() * 5000}`;

    if(addedConfigId) {
      alert('Data set config saved. Redirecting you to the dashboard.');
      open(`https://example.vizzly.co:4002/?projectId=prj_add0100d8e7b42df8eaa00c86cadab27&parentDashboardId=dsh_4c616b59f4fe41419364722c0b833f32&authToken=${addedConfigId}&userReference=${userReference}`, '_blank');
    };
  };

  const setPopularConfig = (version: string) => {
    if(version === 'one') {
      setValue('channel', 'Digital');
      setValue('metricNameOne', 'Revenue');
      setValue('varOne', 'Campaign');
      setValue('varTwo', 'Site');
    };

    if(version === 'two') {
      setValue('channel', 'TV');
      setValue('metricNameOne', 'Revenue');
      setValue('varOne', 'Network');
      setValue('varTwo', 'Show');
    };
    

    onChange();
  };

  return (
    <>
      <button onClick={() => setShowDataImage(!showDataImage)}>{showDataImage ? 'hide' : 'show'} underlying data</button>
      {showDataImage && <img src="./data.png" width="100%" />}
      <br /><br />
      <h3>Config builder</h3>
      <form onSubmit={handleSubmit((data) => saveConfigAndOpenDashboard(data))}>

      <strong>Channel</strong><br />
      <select {...register("channel", { required: true, onChange })}>
        <option value="TV">TV</option>
        <option value="Digital">Digital</option>
      </select>
      <br /><br />

      <strong>varOne</strong><br />
      <select {...register("varOne", { required: true, onChange })}>
        <option value="Network">Network</option>
        <option value="Campaign">Campaign</option>
      </select>
      <br /><br />

      <strong>varTwo</strong><br />
      <select {...register("varTwo", { required: true, onChange })}>
        <option value="Show">Show</option>
        <option value="Site">Site</option>
      </select>

      <br /><br />
      <strong>metricNameOne</strong><br />
      <select {...register("metricNameOne", { required: true, onChange })}>
        <option value="Revenue">Revenue</option>
        <option value="Transactions">Transactions</option>
      </select>

      <h4>Working configurations</h4>
      <button type="button" onClick={() => setPopularConfig('one')}>Digital, Campaign, Site, Revenue</button>
      <button type="button" onClick={() => setPopularConfig('two')}>TV, Network, Show, Revenue</button>
      <br /><br />

      <br /><br />
      <h3>Data set config</h3>
      <pre>{JSON.stringify(config, null, 2)}</pre>
      <br /><br />
        <button>save config & open dashboard</button>
      </form>
    </>
  );
}

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
