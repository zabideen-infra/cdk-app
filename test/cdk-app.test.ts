import * as cdk from 'aws-cdk-lib';
import { Stack } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';

import { HelloWorldApp } from '../dist/lib/lib/cdk-app-stack';


const app = new cdk.App();

const applicationStack = new Stack(new HelloWorldApp(app, "TestApplicationStack"));
const applicationTemplate = Template.fromStack(applicationStack);


test("lambda runtime and handler check", () => {
    applicationTemplate.hasResourceProperties(
        "AWS::Lambda::Function", {
            Runtime: "nodejs20.x",
            Handler: "index.helloWorld"
        }
    )
})

test("lambda function count", () => {
    applicationTemplate.resourceCountIs(
        "AWS::Lambda::Function",
        2
    )
});

test("api gateway count", () => {
    applicationTemplate.resourceCountIs(
        "AWS::ApiGateway::RestApi",
        1
    )
})

test("s3 bucket count", () => {
    applicationTemplate.resourceCountIs(
        "AWS::S3::Bucket",
        1
    )
})