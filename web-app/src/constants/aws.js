
module.exports = {
  BUCKET: process.env.AWS_S3_BUCKET,
  BUCKET_URL: `https://s3.amazonaws.com/${process.env.AWS_S3_BUCKET}`,
};
