provider "aws" {
  region = "eu-west-1"
}

terraform {
  backend "s3" {
    bucket = "terraform-s3-cache-state"
    key = "terraform/s3-cache"
    region = "eu-west-1"
  }
}
