# ############################################
# # Compute Instance
# ############################################
resource "oci_core_instance" "the_instance" {
  #Required
  compartment_id      = oci_identity_compartment.the_compartment.id
  shape               = var.demo_pub_vm.shape.name
  availability_domain = var.availability_domain
  display_name        = var.demo_pub_vm.display_name

  source_details {
    source_id   = var.demo_pub_vm.image_ocid
    source_type = "image"
  }

  dynamic "shape_config" {
    for_each = [true]
    content {
      #Optional
      memory_in_gbs = var.demo_pub_vm.shape.memory_in_gbs
      ocpus         = var.demo_pub_vm.shape.ocpus
    }
  }

  create_vnic_details {
    subnet_id        = oci_core_subnet.the_subnet.id
    assign_public_ip = var.demo_pub_vm.assign_public_ip
  }

  connection {
    type        = "ssh"
    user        = "ubuntu"
    private_key = file(var.my_private_key_path)
    host        = self.public_ip
  }

  provisioner "remote-exec" {
    script = "../scripts/setup.sh"
  }

  metadata = {
    ssh_authorized_keys = join("\n", [for k in var.my_ssh_public_keys : chomp(k)])
  }
}

resource "null_resource" "the_instance" {
  depends_on = [oci_database_autonomous_database.demo_database]

  provisioner "remote-exec" {
    connection {
      type        = "ssh"
      user        = "ubuntu"
      private_key = file(var.my_private_key_path)
      host        = oci_core_instance.the_instance.public_ip
    }
    inline = [
      # "echo \"${oci_database_autonomous_database.demo_database.connection_strings[0].profiles[2].value}\""
      # "export ORACLEDB_CONNECTION_STRING=\"${oci_database_autonomous_database.demo_database.connection_strings[0].profiles[2].value}\" && sudo sh ~/dbinit"
      "echo '#!/bin/bash\napt update\napt install -y libaio1 libaio-dev\nfor filename in /home/ubuntu/game-backend-oracle-db/database-scripts/*.sql; do\n./sqlplus \"ADMIN\"/\"MySecurePassword123\"@\"${oci_database_autonomous_database.demo_database.connection_strings[0].profiles[2].value}\" @ \"$filename\"\ndone' > ~/dbinit && chmod 755 dbinit && sudo sh dbinit"
    ]
  }
}