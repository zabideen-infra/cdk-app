import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';

import {
  LambdaFunction
} from './constructs/lambda';

import {
  Tags
} from 'aws-cdk-lib';

export class HelloWorldApp extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const helloWorldFunction = new LambdaFunction(this, 'HelloWorldLambda');
    Tags.of(helloWorldFunction).add('module', 'lambda');

    
  }
}
