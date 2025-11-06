variable "aws_region" {
  type    = string
  default = "us-east-1"
}

variable "key_name" {
  type    = string
  default = ""
  description = "(optional) EC2 Key Pair name to attach to instances for SSH access"
}

variable "instance_type" {
  type    = string
  default = "t3.micro"
}

variable "git_repo" {
  type = string
  description = "Public git repo URL where this code lives (used by user-data to clone)"
}

variable "desired_backend_count" {
  type    = number
  default = 2
}
