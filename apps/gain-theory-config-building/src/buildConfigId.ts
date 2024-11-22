import md5 from 'blueimp-md5';

export const buildConfigId = (config: any) => md5(JSON.stringify(config));