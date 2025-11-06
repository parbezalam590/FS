#!/bin/bash
set -e
# Frontend user-data: installs Node 18, clones repo, builds frontend with VITE_BACKEND_URL set to ALB, and serves it
yum update -y
yum install -y git
curl -sL https://rpm.nodesource.com/setup_18.x | bash -
yum install -y nodejs

WORKDIR=/opt/app
mkdir -p $WORKDIR
cd $WORKDIR
if [ -d app ]; then
  cd app && git pull || true
else
  git clone "${git_repo}" app || exit 1
  cd app
fi

cd frontend || exit 1
# Install deps and build. VITE_BACKEND_URL points to ALB DNS name provided by Terraform.
export VITE_BACKEND_URL="http://${alb_dns}"
npm install
npm run build

# Serve build with a simple static server using 'npx serve' (install globally) or use nginx in production
npm install -g serve
nohup serve -s dist -l 80 > /var/log/frontend.log 2>&1 &
