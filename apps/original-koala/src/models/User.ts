import * as Organisation from "./Organisation";

export type User = {
  id: string;
  organisationId: Organisation.Id
};


export const isEditor = (user: User) => {
  return user.id.endsWith("_admin");
};