import { Construct } from 'constructs';

import {
    aws_lambda_nodejs as lambda_nodejs,
    aws_lambda as lambda,
    aws_apigatewayv2 as apigwv2
} from 'aws-cdk-lib';

import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations';

import path from 'path';
import { ServicePrincipal } from 'aws-cdk-lib/aws-iam';

interface lambdaApigwProps {

}

export class LambdaApiGateway extends Construct {

    constructor(scope: Construct, id: string, props?: lambdaApigwProps) {
        super(scope, id);

        const helloWorldLambda = new lambda_nodejs.NodejsFunction(this, 'HelloWorldLambda', {
            runtime: lambda.Runtime.NODEJS_20_X,
            handler: 'helloWorld',
            functionName: 'hello-world',
            entry: path.join(__dirname, '..', '..', '..', '..', 'api', 'hello-world', 'index.ts')
        })

        const lambdaApiIntegration = new HttpLambdaIntegration('HelloWorldIntegration', helloWorldLambda);
        const helloWorldApi = new apigwv2.HttpApi(this, 'helloWorldApi');
        
        helloWorldApi.addRoutes({
          path: '/hello',
          methods: [
            apigwv2.HttpMethod.GET,
            apigwv2.HttpMethod.OPTIONS
        ],
          integration: lambdaApiIntegration,
        });

        new apigwv2.HttpStage(this, 'Stage', {
            httpApi: helloWorldApi,
            stageName: 'dev',
        });

        helloWorldLambda.addPermission('APIGWInvocation', {
            principal: new ServicePrincipal('apigateway.amazonaws.com'),
            sourceArn: helloWorldApi.arnForExecuteApi('*')
        });
    }
}
