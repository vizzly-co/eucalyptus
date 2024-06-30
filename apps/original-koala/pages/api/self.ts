// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { User } from '../../src/models/User';
import getSelfFromReq from '../../src/getSelfFromReq';

type Response = {user: User | null};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  const user = getSelfFromReq(req);

  res
  .status(200)
  .json({ user });
}
