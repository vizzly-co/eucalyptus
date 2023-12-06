export const getVizzlyPrivateKey = () =>
  JSON.parse(process.env["VIZZLY_PRIVATE_KEY"] as string).value;
