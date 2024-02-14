import {
    APIGatewayProxyEvent,
    Context
} from 'aws-lambda';

export const helloWorld = async(
    event: APIGatewayProxyEvent,
    context: Context
) => {
    console.log(event)
    console.log(context)
    const res = {
        statusCode: 200,
        headers: {
            "Content-Type": "*/*"
        },
        body: JSON.stringify("Hello World")
    };
    return res
};
