import { createSigner } from "@vizzly/auth";
import { IDENTITY_TTL, getParentDashboards, getPrivateKey, getProjectId } from "./sharedIdentity";
import * as User from './models/User';
import {User as UserType} from './models/User';

export default async (user: UserType, identitySetupId: string | undefined) => {
  const vizzAuth = createSigner({
    privateKey: getPrivateKey(identitySetupId),
    ttlInMinutes: IDENTITY_TTL,
  });

  const projectId = getProjectId('staging', identitySetupId) as string;
  if(! projectId) {
    console.warn('Project ID not found for staging and setup id of', identitySetupId)
    return undefined;
  }

  return await vizzAuth.generateTokens({
    userReference: user.id,
    accessType: User.isEditor(user) ? 'admin' as const : 'standard' as const,
    dataSetIds: "*",
    secureFilters: {},
    projectId,
    scope: "read_write",
    allowDatabaseSchemaAccess: true,
    allowDataPreviewAccess: true,
    parentDashboardIds: getParentDashboards('staging', identitySetupId)
  });
}