#!/bin/bash -e
#
# Deploy the bidlogix application.
#
############################################################

SERVER=$1
DEPLOY_SERVER=$SERVER:/home/bob/deployment/brightblock-dcms

printf "\n\nBuild and deploy D-CMS component\n";
printf "\n-----------------------------------------------------------------------------------------------------\n";
printf "\t1. Jenkins pulls code from git (prior to this script).\n";
printf "\t2. Jenkins runs - npm run build (prior to this script).\n";
printf "\t3. Jenkins pushes dist folder to brightblock-docker/brightblock/nginx.\n";
printf "\t4. Jenkins rebuilds the nginx container.\n";
printf "\t5. Jenkins tags and pushes the container.\n";
printf "\t6. Jenkins ssh to the target server and pulls the image.\n\n";

DOCKER_COMPOSE_CMD='sudo /usr/local/bin/docker-compose'
DOCKER_CMD='sudo /usr/bin/docker'
DOCKER_HOME=/var/jenkins_home/brightblock/brightblock-docker/brightblock
ls -lt dist
cp -r dist/* $DOCKER_HOME/nginx/www/brightblock-dcms
pushd $DOCKER_HOME > /dev/null

$DOCKER_CMD ps -a
$DOCKER_COMPOSE_CMD build

printf "Finished brightblock-dcms nginx build and deployment.\n"
printf "-----------------------------------------------------------------------------------------------------\n";

popd > /dev/null
