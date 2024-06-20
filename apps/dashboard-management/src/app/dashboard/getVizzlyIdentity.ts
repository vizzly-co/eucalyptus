export function getIdentity(userReference: string) {
  return async () => {
    // Hit the auth app
    const response = await fetch('https://example.vizzly.co:9012/identity', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        projectId: 'prj_9f670b5fedc14d5fa708f02c0a55734c',
        secureFilters: {},
        dataSetIds: '*',
        userReference,
        scope: 'read_write',
        accessType: 'standard',
      }),
    });

    const { accessTokens } = await response.json();
    return accessTokens;
  };
}
