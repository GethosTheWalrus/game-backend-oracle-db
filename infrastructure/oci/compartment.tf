locals {
  cmpt_name_prefix = "flappybird"
  time_f           = formatdate("HHmmss", timestamp())
}

############################################
# Compartments
############################################
resource "oci_identity_compartment" "the_compartment" {
  # Required
  compartment_id = var.compartment_id
  description    = var.compartment_description
  name           = "${local.cmpt_name_prefix}_${var.compartment_name}"
}