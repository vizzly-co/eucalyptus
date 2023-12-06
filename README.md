# eucalyptus
Apps that run on the koala tree for Vizzly E2E testing

### Adding a new app

1. Build a new project under the `apps` directory.
2. Build the `Dockerfile` that runs the app.
3. Add the app to the list in the `publish.yml` GitHub action.
4. Run the CloudFormation template to provision a new ECS service to run the image.
5. Update the script to force a redeploy of the service to pull the latest image.
6. Create a new dashboard for the app (ideally in an isolated project).

### Setting up a new project/dashboard

1. Create a new project on staging environment.
2. Save this public key to the project under "key pairs".
```
-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEVyKF4GBkz101/6Ta3fDgvvRItU7j
tScr9CSIWn5Ov0Zya/CzF4XjfOSMKfaodpFtjYZ0MC4BjmVuYlrixXSrQg==
-----END PUBLIC KEY-----
```
3. Create the parent dashboards required in the project.
4. Add the `project_id` value to the allowlist in the `identity` app in this repo.
5. Build out the `identity` function of the dashboard by sending a POST request with the access token claims to `http://koala-tree.vizzly.co:9012/identity`