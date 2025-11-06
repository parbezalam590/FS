#!/bin/bash
set -e
# Backend user-data: installs Node 18, clones repo, starts backend on port 5000
yum update -y
yum install -y git
# Install Node.js 18 from NodeSource
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

cd backend || exit 1
npm install --production
# Start the backend in background. For production use a process manager (systemd/pm2)
nohup node server.js > /var/log/backend.log 2>&1 &
