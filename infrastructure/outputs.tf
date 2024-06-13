output "public_ip" {
    description = "Public IPs of created instances. "
    value       = module.oci.public_ip
}

output "db_state" {
    description = "The state of the database"
    value       = module.oci.db_state
}

output "connection_string" {
    description = "The connection string for the DB"
    value       = module.oci.database_connection_string
}