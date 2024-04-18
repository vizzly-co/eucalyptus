# TASK_FAMILY="example-dashboard-management"
# NEW_FULL_IMAGE="ghcr.io/vizzly-co/eucalyptus-dashboard-management:latest"
# SERVICE_NAME="dashboard-management-angular-Service-WU3POhaGNhkf"

export TASK_FAMILY="$1"
export SERVICE_NAME="$2"
export NEW_FULL_IMAGE="$3"

if [ -z "$TASK_FAMILY" ] || [ -z "$SERVICE_NAME" ] || [ -z "$NEW_FULL_IMAGE" ]; then
  echo "Usage: $0 <task family> <ecs_service_name> <new image>"
  exit 1
fi

echo "TASK_FAMILY: $TASK_FAMILY"
echo "SERVICE_NAME: $SERVICE_NAME"
echo "NEW_FULL_IMAGE: $NEW_FULL_IMAGE"

AWS_DEFAULT_REGION="eu-west-2"
ECS_CLUSTER="example-koala"

TASK_DEFINITION=$(aws ecs describe-task-definition --task-definition "$TASK_FAMILY" --region "$AWS_DEFAULT_REGION")
NEW_TASK_DEFINITION=$(echo $TASK_DEFINITION | jq --arg IMAGE "$NEW_FULL_IMAGE" '.taskDefinition | .containerDefinitions[0].image = $IMAGE | del(.taskDefinitionArn) | del(.revision) | del(.status) | del(.requiresAttributes) | del(.compatibilities) |  del(.registeredAt)  | del(.registeredBy)')
NEW_TASK_INFO=$(aws ecs register-task-definition --region "$AWS_DEFAULT_REGION" --cli-input-json "$NEW_TASK_DEFINITION")
NEW_REVISION=$(echo $NEW_TASK_INFO | jq '.taskDefinition.revision')
# echo $NEW_REVISION
aws ecs update-service --cluster ${ECS_CLUSTER} --service ${SERVICE_NAME} --task-definition ${TASK_FAMILY}:${NEW_REVISION} --force-new-deployment
