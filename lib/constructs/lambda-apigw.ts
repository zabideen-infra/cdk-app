import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';

import {
    aws_lambda_nodejs as lambda_nodejs,
    aws_lambda as lambda,
    aws_apigatewayv2 as apigwv2
} from 'aws-cdk-lib';

import { HttpLambdaIntegration } from 'aws-cdk-lib/aws-apigatewayv2-integrations';

import path from 'path';
import { ServicePrincipal } from 'aws-cdk-lib/aws-iam';


export class LambdaApiGateway extends Construct {

    constructor(scope: Construct, id: string) {
        super(scope, id);

        const helloWorldLambda = new lambda_nodejs.NodejsFunction(this, 'HelloWorldLambda', {
            runtime: lambda.Runtime.NODEJS_20_X,
            handler: 'helloWorld',
            functionName: 'hello-world',
            entry: path.join(__dirname, '..', 'src', 'hello-world', 'index.js'),
            bundling: {
                externalModules: [
                    'aws-lambda'
                ]
            }
        })

        const lambdaApiIntegration = new HttpLambdaIntegration('HelloWorldIntegration', helloWorldLambda);
        const helloWorldApi = new apigwv2.HttpApi(this, 'helloWorldApi', {
            apiName: 'hello-world-api',
            createDefaultStage: true,
            corsPreflight: {
                allowMethods: [
                    apigwv2.CorsHttpMethod.GET
                ],
                allowOrigins: [
                    '*'
                ]
            }
        });
        
        helloWorldApi.addRoutes({
          path: '/',
          methods: [
            apigwv2.HttpMethod.GET
        ],
          integration: lambdaApiIntegration,
        });

        new cdk.CfnOutput(this, 'APIEndpoint', {
            value: helloWorldApi.url!,
            exportName: 'APIEndpoint'
        })

        helloWorldLambda.addPermission('APIGWInvocation', {
            principal: new ServicePrincipal('apigateway.amazonaws.com'),
            sourceArn: helloWorldApi.arnForExecuteApi('*')
        });
    }
}
