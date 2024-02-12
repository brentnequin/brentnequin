terraform {
    cloud {
        hostname = "app.terraform.io"
        organization = "brentnequin"
        workspaces {
            name = "brentnequin"
        }
    }
}
