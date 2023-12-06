import { Request } from "express";

export const requestHeadersToMap = (
  headersToKeep: string[],
  req: Request,
): { [key: string]: string } => {
  let proxiedHeaders: { [key: string]: string } = {};
  // Add all the headers from the request

  headersToKeep.forEach((header) => {
    const value = req.headers[header];
    if (value) proxiedHeaders[header] = value as string;
  });

  return proxiedHeaders;
};
