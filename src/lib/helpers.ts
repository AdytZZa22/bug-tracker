"use server"
import {ParsedUrlQueryInput} from "querystring";
import {addHours, isDate} from "date-fns";
import crypto from "crypto"
import queryString from "querystring";

export async function generateSignedUrl<TData extends ParsedUrlQueryInput>(data: TData, route: string,  expiration: number | Date) {
    const secret = process.env.SIGNING_SECRET || "secret";
    const baseURL = process.env.NEXTAUTH_URL || "http://localhost:3000"

    let expirationTime: number
    if(typeof expiration === "number") {
        expirationTime = addHours(new Date(), expiration).getTime()
    } else if(isDate(expiration)) {
        expirationTime = expiration.getTime()
    } else {
        throw new Error("Invalid date format")
    }

    const serializedData = queryString.stringify(data);

    const signature = crypto.createHmac('sha256', secret).update(`${serializedData}:${expirationTime}`).digest('hex')

    console.log("SECRET USED TO HASH " + secret)

    return `${baseURL}/${route}?${serializedData}&exp=${expirationTime}&signature=${signature}`
}

export async function validateSignedUrl<TData extends ParsedUrlQueryInput>(url: string): Promise<TData> {
    const secret = process.env.SIGNING_SECRET || "secret";

    const parsedUrl = new URL(url);
    const params = new URLSearchParams(parsedUrl.search);

    const signature = params.get('signature');
    const exp = params.get('exp');

    if (!signature) {
        throw new Error("Missing signature");
    }

    const expirationTime = parseInt(exp as string);
    if (isNaN(expirationTime) || Date.now() > expirationTime) {
        throw new Error("URL has expired");
    }

    params.delete("signature")
    params.delete("exp")

    const serializedData = queryString.stringify(Object.fromEntries(params));

    console.log(serializedData)
    const expectedSignature = crypto.createHmac('sha256', secret).update(`${serializedData}:${expirationTime}`).digest('hex');

    console.log("SECRET USED TO DEHASH " + secret)
    console.log("Signature in the URL " + signature)
    console.log("Expected signature: " + expectedSignature)

    if (signature !== expectedSignature) {
        throw new Error("Invalid signature");
    }

    return queryString.parse(serializedData) as TData;
}
