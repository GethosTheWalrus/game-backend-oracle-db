# Start elastic container
resource "docker_container" "flappybird" {
    image = "flappybird-backend"
    name = "flappybird-backend"
    hostname = "flappybird-backend"
    env = ["ORACLEDB_CONNECTION_STRING=${var.db_connection_string}"]
    restart = "always"
    must_run = "true"
    depends_on = [var.db_connection_string]
    ports {
        internal = 3000
        external = 3000
        ip       = "0.0.0.0"
    }
    # volumes {
    #     container_path = "/home/node/database-scripts"
    #     host_path      = "/home/ubuntu/game-backend-oracle-db/database-scripts"
    # }
    # volumes {
    #     container_path = "/home/node/db-init.sh"
    #     host_path      = "/home/ubuntu/game-backend-oracle-db/scripts/db-init.sh"
    # }
    # volumes {
    #     container_path = "/home/node/instantclient"
    #     host_path      = "/home/ubuntu/instantclient"
    # }
    # volumes {
    #     container_path = "/home/node/sqlplus"
    #     host_path      = "/home/ubuntu/sqlplus"
    # }
}