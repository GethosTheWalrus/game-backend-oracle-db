# outputs.tf
output "compartment_id" {
  value = oci_identity_compartment.the_compartment.id
}

output "public_ip" {
  description = "Public IPs of created instances. "
  value       = oci_core_instance.the_instance.*.public_ip
}

output "database_connection_string" {
  description = "The connection strings for the database"
  value = oci_database_autonomous_database.demo_database.connection_strings[0].profiles[2].value
}

output "database_conection_urls" {
  description = "The connection urls for the database"
  value = oci_database_autonomous_database.demo_database.connection_urls
}

output "db_state" {
  value = oci_database_autonomous_database.demo_database.state
}