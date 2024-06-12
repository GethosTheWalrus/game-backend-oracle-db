############################################
# OCI Infrastructure
############################################
module "oci" {
    source = "./oci"
    tenancy_ocid        = "${var.tenancy_ocid}"
    user_ocid           = "${var.user_ocid}"
    fingerprint         = "${var.fingerprint}"
    private_key_path    = "${var.private_key_path}"
    region              = "${var.region}"
    compartment_id      = "${var.compartment_id}"
    my_public_ip        = "${var.my_public_ip}"
    my_ssh_public_keys  = "${var.my_ssh_public_keys}"
    my_private_key_path = "${var.my_private_key_path}"
    availability_domain = "${var.availability_domain}"
}

############################################
# Docker Infrastructure
############################################
module "docker" {
	source               = "./docker"
	compute_instance_ip  = "${module.oci.public_ip[0]}"
    db_connection_string = "${module.oci.database_connection_string}"
}