#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { HelloWorldApp } from '../dist/lib/app/cdk-app-stack';

import {
    Tags
} from 'aws-cdk-lib';

const app = new cdk.App();
const stack = new HelloWorldApp(app, 'HelloWorldStack');

Tags.of(stack).add('app', 'test');
Tags.of(stack).add('managedBy', 'cdk')
