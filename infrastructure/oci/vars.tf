# vars.tf
variable "region" {
    type = string
}

variable "private_key_path" {
    type = string
}

variable "fingerprint" {
    type = string
}

variable "user_ocid" {
    type = string
}

variable "tenancy_ocid" {
    type = string
}

variable "my_public_ip" {
    type = string
}

variable "my_private_key_path" {
    type = string
}

variable "my_ssh_public_keys" {
    type = list
}

variable "availability_domain" {
    type = string
}

############################################
# Compartments
############################################
variable "compartment_id" {
  description = "The OCID of the parent compartment where the resources will be created."
  type        = string
}

variable "compartment_name" {
  description = "Compartment Name"
  type        = string
  default     = "demo-compartment"
}

variable "compartment_description" {
  description = "Compartment Description"
  type        = string
  default     = "demo-compartment description"
}

############################################
# VCN
############################################
variable "demo_vcn" {
  description = "The details of our VCN."
  default = {
    cidr_blocks : ["10.128.0.0/16"]
    display_name : "demo-vcn"
  }
}

############################################
# Public Subnet, Route Table, and Internet Gateway
############################################
variable "demo_subnet" {
  description = "The details of the subnet"
  default = {
    cidr_block : "10.128.1.0/24"
    display_name : "demo_pub_subnet"
    is_public : true
    route_table : {
      display_name = "demo_route_table"
      description  = "demo_route_table"
    }
  }
}

variable "internet_gateway" {
  description = "The details of the internet gateway"
  default = {
    display_name : "demo_internet_gateway"
    ig_destination = "0.0.0.0/0"
  }
}

############################################
# Compute Instance
############################################
variable "demo_pub_vm" {
  description = "The details of the compute instance"
  default = {
    display_name : "demo_pub_vm"
    assign_public_ip : true
    # image_ocid : "ocid1.image.oc1.iad.aaaaaaaacnjdag7ngxnzim3ogkgfywf4aoclwz4gkcaqdr773hukt5o2ahma" # x86 oracle linux
    image_ocid : "ocid1.image.oc1.iad.aaaaaaaaxauxzsyqlldmew5bh4xhw6r5k7b5jjcunjkalzgdgtyeqkv24gaa" # x86 ubuntu
    # image_ocid : "ocid1.image.oc1.iad.aaaaaaaamphrdqdgcjfdmo5fzql4m6ewcuxkbepjbobgky254svsk3ueppfa" # aarch64 ubuntu
    shape : {
      # name          = "VM.Standard.A1.Flex" # aarch64
      name          = "VM.Standard.E2.1.Micro" # x86
      ocpus         = 1
      memory_in_gbs = 1 # > 1 only works for x86 shape
    }
  }
}

############################################
# Database Instance
############################################
variable "demo_database" {
  description = "The details of the database instance"
  default = {
    name : "demodatabase"
    db_workload : "OLTP"
    admin_password : "MySecurePassword123"
    is_free_tier : true
    db_version : "23ai"
    cpu_core_count : 1
    data_storage_size_in_gb : 5
    cpu_core_count : 1
  }
}