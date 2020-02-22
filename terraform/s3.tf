resource "aws_s3_bucket" "storybook_bucket" {
  bucket = var.bucket_name
  force_destroy = true
  acl = "private"

  lifecycle_rule {
    id = "expiration"
    enabled = true

    expiration {
      days = 5 # Delete previews older than 20 days
    }
  }
}

data "aws_iam_policy_document" "s3_policy" {
  statement {
    actions = ["s3:GetObject"]
    resources = ["arn:aws:s3:::${var.bucket_name}/*"]
    principals {
      identifiers = ["*"]
      type = "AWS"
    }
  }

  statement {
    actions = ["s3:ListBucket"]
    resources = ["arn:aws:s3:::${var.bucket_name}"]
    principals {
      identifiers = ["*"]
      type = "AWS"
    }
  }
}

resource aws_s3_bucket_policy "s3_bucket_policy" {
  bucket = aws_s3_bucket.storybook_bucket.id
  policy = data.aws_iam_policy_document.s3_policy.json
}


output "bucket" {
  value = aws_s3_bucket.storybook_bucket.bucket
}
