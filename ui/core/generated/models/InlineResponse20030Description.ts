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
/**
 * description defines the description terms for the validator.
 * @export
 * @interface InlineResponse20030Description
 */
export interface InlineResponse20030Description {
    /**
     * moniker defines a human-readable name for the validator.
     * @type {string}
     * @memberof InlineResponse20030Description
     */
    moniker?: string;
    /**
     * identity defines an optional identity signature (ex. UPort or Keybase).
     * @type {string}
     * @memberof InlineResponse20030Description
     */
    identity?: string;
    /**
     * website defines an optional website link.
     * @type {string}
     * @memberof InlineResponse20030Description
     */
    website?: string;
    /**
     * security_contact defines an optional email for security contact.
     * @type {string}
     * @memberof InlineResponse20030Description
     */
    securityContact?: string;
    /**
     * details define other optional details.
     * @type {string}
     * @memberof InlineResponse20030Description
     */
    details?: string;
}

export function InlineResponse20030DescriptionFromJSON(json: any): InlineResponse20030Description {
    return InlineResponse20030DescriptionFromJSONTyped(json, false);
}

export function InlineResponse20030DescriptionFromJSONTyped(json: any, ignoreDiscriminator: boolean): InlineResponse20030Description {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'moniker': !exists(json, 'moniker') ? undefined : json['moniker'],
        'identity': !exists(json, 'identity') ? undefined : json['identity'],
        'website': !exists(json, 'website') ? undefined : json['website'],
        'securityContact': !exists(json, 'security_contact') ? undefined : json['security_contact'],
        'details': !exists(json, 'details') ? undefined : json['details'],
    };
}

export function InlineResponse20030DescriptionToJSON(value?: InlineResponse20030Description | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'moniker': value.moniker,
        'identity': value.identity,
        'website': value.website,
        'security_contact': value.securityContact,
        'details': value.details,
    };
}


