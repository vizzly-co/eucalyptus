import {buildConfigId} from './buildConfigId';

export const addConfigToOriginSimulator = async (config: any) => {
  const configId = buildConfigId(config);

  const resp = await fetch('https://example.vizzly.co:4000/_admin/add_recipe', {
    mode: 'no-cors',
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify([
      {
        route: `/${configId}`,
        body: JSON.stringify(config),
        stages: [
          {
            at: 0,
            status: 200,
            latency: '100ms',
          },
        ],
        headers: {
          'content-type': 'application/json',
        },
      },
    ]),
  });

  console.log(
    resp.status === 201
      ? `Config ${configId} stored on origin simulator.`
      : `Failed to store config ${configId} on origin simulator.`
  );

  return configId;
};
