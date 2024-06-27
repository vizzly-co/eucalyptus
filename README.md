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

1. Create a new project on the "staging" environment. Choose the "Managed" type if possible.
2. Save this public key to the project under "key pairs". [WARNING ONLY DO THIS FOR TEST PROJECTS ON THE STAGING ENVIRONMENT]
```
-----BEGIN PUBLIC KEY-----
MFkwEwYHKoZIzj0CAQYIKoZIzj0DAQcDQgAEVyKF4GBkz101/6Ta3fDgvvRItU7j
tScr9CSIWn5Ov0Zya/CzF4XjfOSMKfaodpFtjYZ0MC4BjmVuYlrixXSrQg==
-----END PUBLIC KEY-----
```
3. Create the parent dashboards required in the project.
4. Build out the `identity` function of the dashboard by sending a POST request with the access token claims to `https://example.vizzly.co:9012/identity`

### Setting up a query engine
As each app will be an independent project, each will need its own query engine if that is the implementation type required.

If possible, this should be setup using a managed query engine project on the staging environment.

To enable a managed query engine project, on staging this need to be ran;
```elixir
Vizz.Office.SetManagedKeyPairForEucalyptus.run("<< managed query engine id >>")
```

#### For self-hosted
1. Go through the project setup steps to generate your vizzly.env file
2. Run `echo "\nVIZZLY_API_HOST=https://staging.api.vizzly.co" >> vizzly.env` to the vizzly.env file
3. Change the `VIZZLY_PUBLIC_KEYS` value too the base encoded version of the public key; (remember to include the final =)
```
WyItLS0tLUJFR0lOIFBVQkxJQyBLRVktLS0tLVxyXG5NRmt3RXdZSEtvWkl6ajBDQVFZSUtvWkl6ajBEQVFjRFFnQUVWeUtGNEdCa3oxMDEvNlRhM2ZEZ3Z2Ukl0VTdqXHJcbnRTY3I5Q1NJV241T3YwWnlhL0N6RjRYamZPU01LZmFvZHBGdGpZWjBNQzRCam1WdVlscml4WFNyUWc9PVxyXG4tLS0tLUVORCBQVUJMSUMgS0VZLS0tLS1cclxuIl0=
```
4. Upload the env file to the S3 bucket; `{{environment}}-eucalyptus-qe-envs` and save as `{{app-folder-name}}.env`
5. Run the CloudFormation script (query-engine-ecs-service.yml) to create a query engine on a specific port of the koala tree

## Finding example projects

### Query Engines

#### /query-engine/*
```
target group: vizzl-Vizzl-SGVAZMRO699O
log group: example-koala
ecs service: example-vizzly-service-Service-i41X8yR5XVYO
```

#### /mariadb/*
```
target group: mariad-Vizzl-7TQ9FAQHQSQ4
log group: 
```

#### /mysql/*
```
target group: mysql-Vizzl-AXGXJXN6PRM5
log group: 
```

#### /snowflake/*
```
target group: snowfl-Vizzl-YKZWWDZHRZVR
log group: example-snowflake-query-engine
```

#### /vizzly-backed-config/*
```
target group: vizzly-Vizzl-1F0EYQVF5VNT
log group: 
```

#### /dynamic/*
```
target group: dynami-Vizzl-QWJLX2T6D2DV
log group: 
```

#### /staging-api-backed/*
```
target group: stagin-Vizzl-LY84YDX3018U
log group: 
```


### Dashboards