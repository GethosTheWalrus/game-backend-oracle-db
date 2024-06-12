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

variable "my_ssh_public_keys" {
    type = list
}

variable "my_private_key_path" {
    type = string
}

variable "availability_domain" {
    type = string
}

variable "compartment_id" {
  description = "The OCID of the parent compartment where the resources will be created."
  type        = string
}