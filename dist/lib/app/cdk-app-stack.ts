import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { LambdaApiGateway } from './constructs/lambda-apigw';
import { CloudFrontS3 } from './constructs/cloudfront-s3';

export class HelloWorldApp extends cdk.Stack {

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new LambdaApiGateway(this, 'LambdaApiGateway');
    new CloudFrontS3(this, 'CloudFrontS3');
  }
}
