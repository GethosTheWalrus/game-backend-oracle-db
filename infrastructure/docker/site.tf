resource "docker_container" "backend" {
    image = "nginx:alpine"
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
    volumes {
        container_path = "/usr/share/nginx/html"
        host_path      = "/home/ubuntu/game-backend-oracle-db/flappy-bird"
    }
}