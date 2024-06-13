# # Start elastic container
# resource "docker_container" "runner" {
#     image = "ubuntu:jammy"
#     name = "flappybird-dbrunner"
#     hostname = "flappybird-dbrunner"
#     env = ["ORACLEDB_CONNECTION_STRING=${var.db_connection_string}"]
#     restart = "no"
#     must_run = "true"
#     depends_on = [var.db_connection_string]
#     working_dir = "/home/ubuntu"
#     entrypoint = ["tail", "-f", "/dev/null"]
#     ports {
#         internal = 8080
#         external = 8080
#         ip       = "0.0.0.0"
#     }
#     volumes {
#         container_path = "/home/ubuntu/database-scripts"
#         host_path      = "/home/ubuntu/game-backend-oracle-db/database-scripts"
#     }
#     volumes {
#         container_path = "/home/ubuntu/instantclient"
#         host_path      = "/home/ubuntu/instantclient"
#     }
#     volumes {
#         container_path = "/home/ubuntu/sqlplus"
#         host_path      = "/home/ubuntu/sqlplus"
#     }
#     volumes {
#         container_path = "/home/ubuntu/dbinit"
#         host_path      = "/home/ubuntu/dbinit"
#     }
# }

