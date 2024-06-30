// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import getSelfFromReq from '../../src/getSelfFromReq';
import liveIdentity from '../../src/liveIdentity';
import stagingIdentity from '../../src/stagingIdentity';

type Response = {};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const user = getSelfFromReq(req);

  const identitySetupId = req.query['identitySetupId'] as string | undefined;

  if(!user ){ 
    res
    .status(403)
    .json({});
  } else {
    const liveTokens = await liveIdentity(user, identitySetupId);
    const stagingTokens = await stagingIdentity(user, identitySetupId);

    res
    .status(200)
    .setHeader('Access-Control-Allow-Origin', '*')
    .json({ stagingTokens, liveTokens });
  };
};
