import {
    APIGatewayProxyEventV2,
    Context
} from 'aws-lambda';

export const helloWorld = async(
    event: APIGatewayProxyEventV2,
    context: Context
) => {
    console.log(event)
    console.log(context)
    return "hello world";
};
