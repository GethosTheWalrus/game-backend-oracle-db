# Configure the Docker provider
provider "docker" {
    host     = "ssh://ubuntu@${var.compute_instance_ip}:22"
    ssh_opts = ["-o", "StrictHostKeyChecking=no", "-o", "UserKnownHostsFile=/dev/null"]
}