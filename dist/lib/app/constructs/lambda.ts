import { Construct } from 'constructs';

import {
    aws_lambda_nodejs as lambda_nodejs,
    aws_lambda as lambda
} from 'aws-cdk-lib';

import path from 'path';

interface lambdaProps {

}

export class LambdaFunction extends Construct {

    constructor(scope: Construct, id: string, props?: lambdaProps) {
        super(scope, id);

        new lambda_nodejs.NodejsFunction(this, 'hello-world-lambda', {
            runtime: lambda.Runtime.NODEJS_20_X,
            handler: 'helloWorld',
            functionName: 'hello-world',
            entry: path.join(__dirname, '..', '..', '..', '..', 'api', 'hello-world', 'index.ts')
        })

    }
}
