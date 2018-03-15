#!/bin/bash -e
#
# Deploy the bidlogix application.
#
############################################################

SERVER=$1
DEPLOY_SERVER=$SERVER:/home/bob/deployment/brightblock-dcms

printf "\nSyncing brightblock-dcms to $DEPLOY_SERVER\n\n"

rsync -aP --quiet -e "ssh -p 7019" dist/ bob@$DEPLOY_SERVER

ssh -i ~/.ssh/id_rsa -p 7019 bob@$SERVER "
	rsync -aP --quiet  /home/bob/deployment/brightblock-dcms/  rsync://localhost:10873/volume/deployments/nginx/html/brightblock-dcms
";

printf "\nFinished brightblock-dcms nginx build and deployment.\n\n"
