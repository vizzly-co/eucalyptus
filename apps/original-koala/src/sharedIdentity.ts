export const getPrivateKey = (identitySetupId: string | undefined): string => {
  switch(identitySetupId) {
    case "m1":
      return MANAGED_ONE['private'];

    case 'm2':
      return MANAGED_TWO['private'];

    case 's1':
      return STAGING_ONE['private'];

    default:
      return DEFAULT['private'];
  }
};

export const getProjectId = (env: 'live' | 'staging', identitySetupId: string | undefined): undefined | string => {
  switch(identitySetupId) {
    case "m1":
      return MANAGED_ONE['projectId']['staging'];

    case 'm2':
      return MANAGED_TWO['projectId']['staging'];

    case 's1':
      return STAGING_ONE['projectId']['staging'];

    case 'v1':
      return env == 'live' ? 'prj_f967ac35049f405ca940f50e18b5032a' : undefined;

    default:
      return DEFAULT['projectId'][env];
  }
};

export const getParentDashboards = (env: 'live' | 'staging', identitySetupId: string | undefined): string[] => {
  switch(identitySetupId) {
    case "m1":
      return MANAGED_ONE['parentDashboards']['staging'];

    case 'm2':
      return MANAGED_TWO['parentDashboards']['staging'];

    case 's1':
      return STAGING_ONE['parentDashboards']['staging'];

    case 'v1':
      return ['dsh_f0be7e76a3f64258a43f35d683c59695']

    default:
      return DEFAULT['parentDashboards'][env];
  }
};

export const IDENTITY_TTL = 120;

const DEFAULT = {
  private: `
-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIKl8odBBdPnwvPBF3LGXD54FukMmZdHUlYNSNm2yRTPyoAoGCCqGSM49
AwEHoUQDQgAEpSGuqzScAczaF/SCObpB/UTlgUdLtQ+izNyl0l5CzetFvH9b0aSh
6y+t80st62NsmV5Hzc1CFJXiuTLrjrrB5A==
-----END EC PRIVATE KEY-----`,
  public: `-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEpSGuqzScAczaF/SCObpB/UTlgUdL
tQ+izNyl0l5CzetFvH9b0aSh6y+t80st62NsmV5Hzc1CFJXiuTLrjrrB5A==
-----END PUBLIC KEY-----`,
organisationId: {
  staging: 'org_650aea29bf32467fbf2711083fe442f7',
  live: 'org_9817c013a80944cea5890df34ab792cd'
},
parentDashboards: {
  staging: ['dsh_9569cd7e82e949d4969996e0ff746318',],
  live: [
    // Parent IDs for dashboards used to test integrations
    'dsh_172b731ac3a9426f829603402a39ee33',
    'dsh_4d62a91a3442482a8a7bc113b1baec5d',
    'dsh_4810e5ed0840424c810a5051b7d8e066',
    'dsh_c0695308847740e490b7d1a6ae567eed',
    'dsh_51285c81ff0545348a67fde1d73bc193',
    'dsh_0ae7b42972184f4baae30fa311074b09',

    // Parent IDs for dashboards used to test the different frameworks
    'dsh_d5b0e691e036476f95e20e6f9a896382',
    'dsh_5c971c1f49e544b89c5737a70f9cc098',
    'dsh_54efdbd35f3f4fe39cf22ff1ca98a825',
    'dsh_65296d183b0b4b7e83f749ac6760609b',
    'dsh_4e2f0fdfa81b44f09267bf6cf8175901',
    'dsh_8ba166fea9564e95bcaf7a53bf9c008f'
  ]
},
projectId: {
  staging: undefined,
  live: 'prj_3e37665d7a5b40a9b9e8a8ad7128e738',
}
};

const STAGING_ONE = {
  private: `
-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIKl8odBBdPnwvPBF3LGXD54FukMmZdHUlYNSNm2yRTPyoAoGCCqGSM49
AwEHoUQDQgAEpSGuqzScAczaF/SCObpB/UTlgUdLtQ+izNyl0l5CzetFvH9b0aSh
6y+t80st62NsmV5Hzc1CFJXiuTLrjrrB5A==
-----END EC PRIVATE KEY-----`,
  public: `-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEpSGuqzScAczaF/SCObpB/UTlgUdL
tQ+izNyl0l5CzetFvH9b0aSh6y+t80st62NsmV5Hzc1CFJXiuTLrjrrB5A==
-----END PUBLIC KEY-----`,
organisationId: {
  staging: 'org_650aea29bf32467fbf2711083fe442f7',
},
parentDashboards: {
  staging: ['dsh_855273f195a941eb96cdc6fd76ccd5c1',]
},
projectId: {
  staging: 'prj_d9884781755243f5a64c3444640fb241'
}
};

// https://staging.api.vizzly.co/managed/mqe_5f346f06c1d046db995110c4a249d7ff
const MANAGED_ONE = {
  private: `-----BEGIN PRIVATE KEY-----
MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgBQbX4q55Q6DjS0De
Jc3WR/5PVdwNm13N8+Vhd6SR47OhRANCAAThOUbWKyUJID1CsrBZo4CJea0z8QG2
hXZPEYCY6y5c2+6iws6MH8+985JUidaxRvu7r0uzSQnjVaG7snDlKi5W
-----END PRIVATE KEY-----`,
  public: `-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE4TlG1islCSA9QrKwWaOAiXmtM/EB
toV2TxGAmOsuXNvuosLOjB/PvfOSVInWsUb7u69Ls0kJ41Whu7Jw5SouVg==
-----END PUBLIC KEY-----`,
organisationId: {
  staging: 'org_fd1d8d2e58fb4cbda63b5ade628e4f09',
  live: '-- live managed not setup yet --'
},
parentDashboards: {
  staging: ['dsh_004e0b7b93924632b2f7450a91a30ff0'],
  live: []
},
projectId: {
  staging: 'prj_e944124212a54b78827361e30df18bde',
  live: undefined,
}
};

// https://staging.api.vizzly.co/managed/mqe_71c7f42be3f14f6b86abb83f90553ff4
const MANAGED_TWO = {
  private: `-----BEGIN PRIVATE KEY-----
MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQg9uAUGnRpTBtAgbia
YhKi/kwLqAbCcNxX52azsiYb/6ShRANCAATr+31i2+hnmfCUmoo4FTZsxje+UjzY
RZhN2t4KVK73T18oA+R8kJdf6Xyz7GDCtdb+dKXrIEzATxqReQZbd56k
-----END PRIVATE KEY-----`,
  public: `-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAE6/t9YtvoZ5nwlJqKOBU2bMY3vlI8
2EWYTdreClSu909fKAPkfJCXX+l8s+xgwrXW/nSl6yBMwE8akXkGW3eepA==
-----END PUBLIC KEY-----`,
organisationId: {
  staging: 'org_fd1d8d2e58fb4cbda63b5ade628e4f09',
  live: '-- live managed not setup yet --'
},
parentDashboards: {
  staging: ['dsh_47643658eca4477a8e66adfd4048d501'],
  live: []
},
projectId: {
  staging: 'prj_78e6f803a51043b18992eae4ac547d94',
  live: undefined,
}
}