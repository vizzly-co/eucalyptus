export function getIdentity() {
  return async () => {
    // Hit the auth app
    const response = await fetch(
      'http://koala-tree.vizzly.co:9012/identity',
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          projectId: 'prj_9f670b5fedc14d5fa708f02c0a55734c',
          secureFilters: {},
          dataSetIds: '*',
          userReference: 'a user id - 2874924832',
          scope: 'read_write',
          accessType: 'standard',
        }),
      }
    );

    const { accessTokens } = await response.json();
    return accessTokens;
  };
}

