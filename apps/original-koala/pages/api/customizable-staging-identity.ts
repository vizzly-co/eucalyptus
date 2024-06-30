// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

import { createSigner } from '@vizzly/auth';

type Response = {};

const STAGING_PRIVATE = `-----BEGIN EC PRIVATE KEY-----
MHcCAQEEIKl8odBBdPnwvPBF3LGXD54FukMmZdHUlYNSNm2yRTPyoAoGCCqGSM49
AwEHoUQDQgAEpSGuqzScAczaF/SCObpB/UTlgUdLtQ+izNyl0l5CzetFvH9b0aSh
6y+t80st62NsmV5Hzc1CFJXiuTLrjrrB5A==
-----END EC PRIVATE KEY-----`;

const STAGING_PUBLIC = `-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEpSGuqzScAczaF/SCObpB/UTlgUdL
tQ+izNyl0l5CzetFvH9b0aSh6y+t80st62NsmV5Hzc1CFJXiuTLrjrrB5A==
-----END PUBLIC KEY-----`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const projectId = req.query['projectId'] as string;
  const userReference = req.query['userReference'] as string;
  const dataSetIds =  req.query['dataSetIds'] ? (req.query['dataSetIds'] as string).split(',') : '*';
  const parentDashboardIds = (req.query['parentDashboardIds'] as string).split(',');

  const liveSigner = await createSigner({privateKey: STAGING_PRIVATE, ttlInMinutes: 5})

  const tokens = await liveSigner.generateTokens({
    projectId,
    accessType: userReference.endsWith("_admin") ? 'admin' : 'standard',
    dataSetIds: dataSetIds,
    parentDashboardIds,
    secureFilters: {},
    userReference
  })
  

  res
    .status(200)
    .setHeader('Access-Control-Allow-Origin', '*')
    .json({ tokens });
  
};
