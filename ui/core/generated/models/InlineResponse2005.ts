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
    InlineResponse2005Metadata,
    InlineResponse2005MetadataFromJSON,
    InlineResponse2005MetadataFromJSONTyped,
    InlineResponse2005MetadataToJSON,
} from './';

/**
 * QueryDenomMetadataResponse is the response type for the Query/DenomMetadata RPC
 * method.
 * @export
 * @interface InlineResponse2005
 */
export interface InlineResponse2005 {
    /**
     * 
     * @type {InlineResponse2005Metadata}
     * @memberof InlineResponse2005
     */
    metadata?: InlineResponse2005Metadata;
}

export function InlineResponse2005FromJSON(json: any): InlineResponse2005 {
    return InlineResponse2005FromJSONTyped(json, false);
}

export function InlineResponse2005FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse2005 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'metadata': !exists(json, 'metadata') ? undefined : InlineResponse2005MetadataFromJSON(json['metadata']),
    };
}

export function InlineResponse2005ToJSON(value?: InlineResponse2005 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'metadata': InlineResponse2005MetadataToJSON(value.metadata),
    };
}


