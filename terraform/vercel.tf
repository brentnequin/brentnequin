resource "vercel_project" "frontend" {
    name      = "brentnequin"
    framework = "nuxtjs"

    git_repository = {
        type = "github"
        repo = "brentnequin/brentnequin"
    }

    build_command = "cd .. && npx turbo run build --scope=frontend --filter=frontend"
    output_directory = ".vercel_build_output"
    root_directory = "frontend"
    ignore_command = "git diff HEAD^ HEAD --quiet ./"
}

resource "vercel_project_domain" "frontend" {
    project_id = vercel_project.frontend.id
    domain     = "brentnequin.com"
}

resource "vercel_deployment" "frontend" {
    project_id  = vercel_project.frontend.id
    ref        = "main"
    production  = true
}