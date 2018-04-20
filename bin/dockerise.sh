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
printf "\t6. Jenkins ssh to the target server and pulls the image.\n";


rsync -aP --quiet -e "ssh -p 7019" dist/ bob@$DEPLOY_SERVER

ssh -i ~/.ssh/id_rsa -p 7019 bob@$SERVER "
	rsync -aP --quiet  /home/bob/deployment/brightblock-dcms/  rsync://localhost:10873/volume/deployments/nginx/html/brightblock-dcms
";

printf "\nFinished brightblock-dcms nginx build and deployment.\n\n"
