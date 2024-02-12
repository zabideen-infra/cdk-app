import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

import { LambdaApiGateway } from './constructs/lambda-apigw';

export class HelloWorldApp extends cdk.Stack {

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    new LambdaApiGateway(this, 'LambdaApiGateway');
  }
}
