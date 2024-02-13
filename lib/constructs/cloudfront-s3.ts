import { Construct } from 'constructs';

import {
    aws_s3 as s3,
    aws_s3_deployment as s3Deploy
} from 'aws-cdk-lib';
import path from 'path';

export class CloudFrontS3 extends Construct {

    constructor(scope: Construct, id: string) {
        super(scope, id);

        const bucket = new s3.Bucket(this, 'S3Bucket', {
            enforceSSL: true,
            bucketName: "hello-world-bucket-4k3aac",
            blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
            websiteIndexDocument: "index.html"
        })
        new s3Deploy.BucketDeployment(this, 'WebsiteFile', {
            sources: [
                s3Deploy.Source.asset(path.join(__dirname, '..', '..', '..', '..', 's3-site' ))
            ],
            destinationBucket: bucket,
            memoryLimit: 128
        })

        // new cloudfront.Distribution(this, 'HelloWorldDistribution', {
        //     defaultBehavior: {
        //         origin: new origins.S3Origin(bucket)
        //     }
        // })
        
    }
}
