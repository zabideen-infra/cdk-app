import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';

import {
    aws_lambda_nodejs as lambda_nodejs,
    aws_lambda as lambda,
    aws_apigateway as apigw,
    aws_iam as iam
} from 'aws-cdk-lib';

import path from 'path';


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

        const lambdaAllowStatement = new iam.PolicyStatement({
            actions: [
                "execute-api:Invoke"
            ],
            effect: iam.Effect.ALLOW,
            principals: [
                new iam.AccountRootPrincipal()
            ],
            resources: [
                "execute-api:/*"
            ]
        })

        const apigwPolicyDocument = new iam.PolicyDocument({
            statements: [
                lambdaAllowStatement
            ]
        })

        const helloWorldApi = new apigw.RestApi(this, 'helloWorldApi', {
            restApiName: "hello-world-api",
            endpointTypes: [
                apigw.EndpointType.PRIVATE
            ],
            policy: apigwPolicyDocument
        });

        const lambdaIntegration = new apigw.LambdaIntegration(helloWorldLambda);
        const getResource = helloWorldApi.root.addResource("hello");
        getResource.addMethod(
            "GET",
            lambdaIntegration
        )

        new cdk.CfnOutput(this, 'APIEndpoint', {
            value: helloWorldApi.url!,
            exportName: 'APIEndpoint'
        })

    }
}
