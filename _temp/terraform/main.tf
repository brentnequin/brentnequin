module "frontend" {
    source = "../frontend/terraform"

    vercel_api_token = var.vercel_api_token
}