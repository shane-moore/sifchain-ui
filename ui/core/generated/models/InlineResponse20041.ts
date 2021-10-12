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
    InlineResponse20041Channels,
    InlineResponse20041ChannelsFromJSON,
    InlineResponse20041ChannelsFromJSONTyped,
    InlineResponse20041ChannelsToJSON,
    PaginationResponse,
    PaginationResponseFromJSON,
    PaginationResponseFromJSONTyped,
    PaginationResponseToJSON,
    QueryBlockHeight,
    QueryBlockHeightFromJSON,
    QueryBlockHeightFromJSONTyped,
    QueryBlockHeightToJSON,
} from './';

/**
 * QueryChannelsResponse is the response type for the Query/Channels RPC method.
 * @export
 * @interface InlineResponse20041
 */
export interface InlineResponse20041 {
    /**
     * list of stored channels of the chain.
     * @type {Array<InlineResponse20041Channels>}
     * @memberof InlineResponse20041
     */
    channels?: Array<InlineResponse20041Channels>;
    /**
     * 
     * @type {PaginationResponse}
     * @memberof InlineResponse20041
     */
    pagination?: PaginationResponse;
    /**
     * 
     * @type {QueryBlockHeight}
     * @memberof InlineResponse20041
     */
    height?: QueryBlockHeight;
}

export function InlineResponse20041FromJSON(json: any): InlineResponse20041 {
    return InlineResponse20041FromJSONTyped(json, false);
}

export function InlineResponse20041FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse20041 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'channels': !exists(json, 'channels') ? undefined : ((json['channels'] as Array<any>).map(InlineResponse20041ChannelsFromJSON)),
        'pagination': !exists(json, 'pagination') ? undefined : PaginationResponseFromJSON(json['pagination']),
        'height': !exists(json, 'height') ? undefined : QueryBlockHeightFromJSON(json['height']),
    };
}

export function InlineResponse20041ToJSON(value?: InlineResponse20041 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'channels': value.channels === undefined ? undefined : ((value.channels as Array<any>).map(InlineResponse20041ChannelsToJSON)),
        'pagination': PaginationResponseToJSON(value.pagination),
        'height': QueryBlockHeightToJSON(value.height),
    };
}


