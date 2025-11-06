Terraform infra (skeleton)
--------------------------------

This folder contains a basic Terraform configuration to create:

- A single public VPC and subnet (for demo only)
- An Application Load Balancer (ALB) listening on port 80
- A target group and an Auto Scaling Group for backend instances (desired capacity 2)
- A single EC2 instance to host the frontend (Nginx or static server)

Important notes before you run
- This is an opinionated demo config that focuses on the ALB->backend flow. It is intentionally simplified for learning.
- You MUST provide the following variables:
  - `git_repo` — public git URL where this repo is accessible (so user-data scripts can clone it)
  - `key_name` — optional EC2 Key Pair name if you want to SSH into instances
  - `aws_region` — AWS region to deploy into

How user-data works in this example
- Backend instances: clones `git_repo`, installs Node.js, installs backend deps and starts the backend on port 5000.
- Frontend instance: clones `git_repo`, installs Node, builds the frontend with `VITE_BACKEND_URL` pointing at the ALB DNS (Terraform fills this after ALB created). The build is served with a lightweight static server.

Security & production
- Do not run this unchanged in production. Move backend instances into private subnets, enable TLS on ALB, limit security groups, and enable proper logging and monitoring.
