/* tslint:disable */
/* eslint-disable */
/**
 * Sifchain - gRPC Gateway docs
 * A REST interface for state queries, legacy transactions
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
import {
    HeightAtWhichTheProofWasRetrieved,
    HeightAtWhichTheProofWasRetrievedFromJSON,
    HeightAtWhichTheProofWasRetrievedFromJSONTyped,
    HeightAtWhichTheProofWasRetrievedToJSON,
} from './';

/**
 * 
 * @export
 * @interface IbcCoreChannelV1QueryPacketReceiptResponse
 */
export interface IbcCoreChannelV1QueryPacketReceiptResponse {
    /**
     * 
     * @type {boolean}
     * @memberof IbcCoreChannelV1QueryPacketReceiptResponse
     */
    received?: boolean;
    /**
     * 
     * @type {string}
     * @memberof IbcCoreChannelV1QueryPacketReceiptResponse
     */
    proof?: string;
    /**
     * 
     * @type {HeightAtWhichTheProofWasRetrieved}
     * @memberof IbcCoreChannelV1QueryPacketReceiptResponse
     */
    proofHeight?: HeightAtWhichTheProofWasRetrieved;
}

export function IbcCoreChannelV1QueryPacketReceiptResponseFromJSON(json: any): IbcCoreChannelV1QueryPacketReceiptResponse {
    return IbcCoreChannelV1QueryPacketReceiptResponseFromJSONTyped(json, false);
}

export function IbcCoreChannelV1QueryPacketReceiptResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): IbcCoreChannelV1QueryPacketReceiptResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'received': !exists(json, 'received') ? undefined : json['received'],
        'proof': !exists(json, 'proof') ? undefined : json['proof'],
        'proofHeight': !exists(json, 'proof_height') ? undefined : HeightAtWhichTheProofWasRetrievedFromJSON(json['proof_height']),
    };
}

export function IbcCoreChannelV1QueryPacketReceiptResponseToJSON(value?: IbcCoreChannelV1QueryPacketReceiptResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'received': value.received,
        'proof': value.proof,
        'proof_height': HeightAtWhichTheProofWasRetrievedToJSON(value.proofHeight),
    };
}


