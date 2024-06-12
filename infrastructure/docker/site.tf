resource "docker_container" "backend" {
    image = "flappybird-frontend"
    name = "flappybird-frontend"
    hostname = "flappybird-front-end"
    env = ["BACKENDURL=${var.compute_instance_ip}:3000"]
    restart = "always"
    must_run = "true"
    depends_on = [var.compute_instance_ip]
    ports {
        internal = 80
        external = 80
        ip       = "0.0.0.0"
    }
}