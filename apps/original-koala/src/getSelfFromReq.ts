// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest } from 'next'
import cookie from 'cookie';
import { User } from './models/User';
import { getOrganisationId } from './models/Organisation';
import { v4 } from 'uuid';

export default function getSelfFromReq(
  req: NextApiRequest,
): User | null {
  const sessionCookie = req.headers.cookie;
  const parsedCookie = cookie.parse(sessionCookie || '');
  let userId = parsedCookie.session || (req.query['userId'] as string) || null;
  if(userId == "generate-random") userId = v4()

  const user: User | null = userId ? {
    id: userId,
    organisationId: getOrganisationId(userId)
  } : null

  return user;
}
