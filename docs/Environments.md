# Environments & Infra (Skeleton)

- Envs: dev, staging, prod.
- Baseline topology: Ingress/ALB → Sidecar → Upstream(s); CI runners; Postgres; Object storage; Observability stack.
- IaC: Terraform modules for VPC/Subnets/SGs, RDS Postgres, S3, EKS/AKS/GKE, ALB/Ingress.
- Secrets: Vault or cloud Secrets Manager + KMS.
- Networking: private subnets for DB; security groups restricting lateral movement.
