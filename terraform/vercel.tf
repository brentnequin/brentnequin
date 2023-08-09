resource "vercel_project" "frontend" {
    name      = "brentnequin"
    framework = "nuxtjs"

    git_repository = {
        type = "github"
        repo = "brentnequin/brentnequin"
    }

    build_command = "cd .. && npx turbo run build --scope=frontend"
    root_directory = "frontend"
}