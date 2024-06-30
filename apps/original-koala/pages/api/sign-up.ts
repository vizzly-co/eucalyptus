// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import cookie from 'cookie';
import * as uuid from 'uuid'
import { User } from '../../src/models/User';
import { getOrganisationId } from '../../src/models/Organisation';

type Response = {user: User | null};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Response>
) {
  let userId = uuid.v4();

  if(isEditor()) {
    userId = `${userId}_admin`
  };

  const sessionCookie = cookie.serialize("session", userId, {
    httpOnly: true,
    path: "/",
    sameSite: "lax",
  });

  const user: User = {
    id: userId,
    organisationId: getOrganisationId(userId)
  };

  res
    .setHeader("Set-Cookie", sessionCookie)
    // .setHeader("Location", "/sign-in")
    .status(200)
    .json({ user });
};

const isEditor = (): boolean => {
  return Math.floor(Math.random() * 10) > 5;
}