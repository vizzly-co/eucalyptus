# eucalyptus
Apps that run on the koala tree for Vizzly E2E testing

### Adding a new app

1. Build a new project under the `apps` directory.
2. Build the `Dockerfile` that runs the app.
3. Add the app to the list in the `publish.yml` GitHub action.
4. Run the CloudFormation template to provision a new ECS service to run the image.
5. Update the script to force a redeploy of the service to pull the latest image.
