output "alb_dns_name" {
  value = aws_lb.app.dns_name
}

output "frontend_public_ip" {
  value = aws_instance.frontend.public_ip
}

output "backend_target_group_arn" {
  value = aws_lb_target_group.backend.arn
}
