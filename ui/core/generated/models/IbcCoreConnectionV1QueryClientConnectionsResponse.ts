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
    HeightAtWhichTheProofWasGenerated,
    HeightAtWhichTheProofWasGeneratedFromJSON,
    HeightAtWhichTheProofWasGeneratedFromJSONTyped,
    HeightAtWhichTheProofWasGeneratedToJSON,
} from './';

/**
 * 
 * @export
 * @interface IbcCoreConnectionV1QueryClientConnectionsResponse
 */
export interface IbcCoreConnectionV1QueryClientConnectionsResponse {
    /**
     * slice of all the connection paths associated with a client.
     * @type {Array<string>}
     * @memberof IbcCoreConnectionV1QueryClientConnectionsResponse
     */
    connectionPaths?: Array<string>;
    /**
     * 
     * @type {string}
     * @memberof IbcCoreConnectionV1QueryClientConnectionsResponse
     */
    proof?: string;
    /**
     * 
     * @type {HeightAtWhichTheProofWasGenerated}
     * @memberof IbcCoreConnectionV1QueryClientConnectionsResponse
     */
    proofHeight?: HeightAtWhichTheProofWasGenerated;
}

export function IbcCoreConnectionV1QueryClientConnectionsResponseFromJSON(json: any): IbcCoreConnectionV1QueryClientConnectionsResponse {
    return IbcCoreConnectionV1QueryClientConnectionsResponseFromJSONTyped(json, false);
}

export function IbcCoreConnectionV1QueryClientConnectionsResponseFromJSONTyped(json: any, ignoreDiscriminator: boolean): IbcCoreConnectionV1QueryClientConnectionsResponse {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'connectionPaths': !exists(json, 'connection_paths') ? undefined : json['connection_paths'],
        'proof': !exists(json, 'proof') ? undefined : json['proof'],
        'proofHeight': !exists(json, 'proof_height') ? undefined : HeightAtWhichTheProofWasGeneratedFromJSON(json['proof_height']),
    };
}

export function IbcCoreConnectionV1QueryClientConnectionsResponseToJSON(value?: IbcCoreConnectionV1QueryClientConnectionsResponse | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'connection_paths': value.connectionPaths,
        'proof': value.proof,
        'proof_height': HeightAtWhichTheProofWasGeneratedToJSON(value.proofHeight),
    };
}


