import { Construct } from 'constructs';

import {
    aws_s3 as s3,
    aws_cloudfront as cloudfront,
    aws_cloudfront_origins as origins
} from 'aws-cdk-lib';

interface cloudFrontS3Props {

}

export class CloudFrontS3 extends Construct {

    constructor(scope: Construct, id: string, props?: cloudFrontS3Props) {
        super(scope, id);

        const bucket = new s3.Bucket(this, 'S3Bucket', {
            enforceSSL: true,
            bucketName: "hello-world-bucket-4k3aac",
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
            websiteIndexDocument: "index.html"
        })

        const cf = new cloudfront.Distribution(this, 'HelloWorldDistribution', {
            defaultBehavior: {
                origin: new origins.S3Origin(bucket)
            }
        })
        
    }
}
