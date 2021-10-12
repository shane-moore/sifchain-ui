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
    InlineResponse20046Connections,
    InlineResponse20046ConnectionsFromJSON,
    InlineResponse20046ConnectionsFromJSONTyped,
    InlineResponse20046ConnectionsToJSON,
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
 * QueryConnectionsResponse is the response type for the Query/Connections RPC
 * method.
 * @export
 * @interface InlineResponse20046
 */
export interface InlineResponse20046 {
    /**
     * list of stored connections of the chain.
     * @type {Array<InlineResponse20046Connections>}
     * @memberof InlineResponse20046
     */
    connections?: Array<InlineResponse20046Connections>;
    /**
     * 
     * @type {PaginationResponse}
     * @memberof InlineResponse20046
     */
    pagination?: PaginationResponse;
    /**
     * 
     * @type {QueryBlockHeight}
     * @memberof InlineResponse20046
     */
    height?: QueryBlockHeight;
}

export function InlineResponse20046FromJSON(json: any): InlineResponse20046 {
    return InlineResponse20046FromJSONTyped(json, false);
}

export function InlineResponse20046FromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse20046 {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'connections': !exists(json, 'connections') ? undefined : ((json['connections'] as Array<any>).map(InlineResponse20046ConnectionsFromJSON)),
        'pagination': !exists(json, 'pagination') ? undefined : PaginationResponseFromJSON(json['pagination']),
        'height': !exists(json, 'height') ? undefined : QueryBlockHeightFromJSON(json['height']),
    };
}

export function InlineResponse20046ToJSON(value?: InlineResponse20046 | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'connections': value.connections === undefined ? undefined : ((value.connections as Array<any>).map(InlineResponse20046ConnectionsToJSON)),
        'pagination': PaginationResponseToJSON(value.pagination),
        'height': QueryBlockHeightToJSON(value.height),
    };
}


