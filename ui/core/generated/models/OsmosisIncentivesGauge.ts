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
    DistributionIncentivesByThirdPartyRewardsAreDistributedToLockupsThatAreAreReturnedByAtLeastOneOfTheseQueries,
    DistributionIncentivesByThirdPartyRewardsAreDistributedToLockupsThatAreAreReturnedByAtLeastOneOfTheseQueriesFromJSON,
    DistributionIncentivesByThirdPartyRewardsAreDistributedToLockupsThatAreAreReturnedByAtLeastOneOfTheseQueriesFromJSONTyped,
    DistributionIncentivesByThirdPartyRewardsAreDistributedToLockupsThatAreAreReturnedByAtLeastOneOfTheseQueriesToJSON,
    InlineResponse2002Balances,
    InlineResponse2002BalancesFromJSON,
    InlineResponse2002BalancesFromJSONTyped,
    InlineResponse2002BalancesToJSON,
} from './';

/**
 * 
 * @export
 * @interface OsmosisIncentivesGauge
 */
export interface OsmosisIncentivesGauge {
    /**
     * 
     * @type {string}
     * @memberof OsmosisIncentivesGauge
     */
    id?: string;
    /**
     * 
     * @type {boolean}
     * @memberof OsmosisIncentivesGauge
     */
    isPerpetual?: boolean;
    /**
     * 
     * @type {DistributionIncentivesByThirdPartyRewardsAreDistributedToLockupsThatAreAreReturnedByAtLeastOneOfTheseQueries}
     * @memberof OsmosisIncentivesGauge
     */
    distributeTo?: DistributionIncentivesByThirdPartyRewardsAreDistributedToLockupsThatAreAreReturnedByAtLeastOneOfTheseQueries;
    /**
     * 
     * @type {Array<InlineResponse2002Balances>}
     * @memberof OsmosisIncentivesGauge
     */
    coins?: Array<InlineResponse2002Balances>;
    /**
     * 
     * @type {Date}
     * @memberof OsmosisIncentivesGauge
     */
    startTime?: Date;
    /**
     * 
     * @type {string}
     * @memberof OsmosisIncentivesGauge
     */
    numEpochsPaidOver?: string;
    /**
     * 
     * @type {string}
     * @memberof OsmosisIncentivesGauge
     */
    filledEpochs?: string;
    /**
     * 
     * @type {Array<InlineResponse2002Balances>}
     * @memberof OsmosisIncentivesGauge
     */
    distributedCoins?: Array<InlineResponse2002Balances>;
}

export function OsmosisIncentivesGaugeFromJSON(json: any): OsmosisIncentivesGauge {
    return OsmosisIncentivesGaugeFromJSONTyped(json, false);
}

export function OsmosisIncentivesGaugeFromJSONTyped(json: any, ignoreDiscriminator: boolean): OsmosisIncentivesGauge {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': !exists(json, 'id') ? undefined : json['id'],
        'isPerpetual': !exists(json, 'is_perpetual') ? undefined : json['is_perpetual'],
        'distributeTo': !exists(json, 'distribute_to') ? undefined : DistributionIncentivesByThirdPartyRewardsAreDistributedToLockupsThatAreAreReturnedByAtLeastOneOfTheseQueriesFromJSON(json['distribute_to']),
        'coins': !exists(json, 'coins') ? undefined : ((json['coins'] as Array<any>).map(InlineResponse2002BalancesFromJSON)),
        'startTime': !exists(json, 'start_time') ? undefined : (new Date(json['start_time'])),
        'numEpochsPaidOver': !exists(json, 'num_epochs_paid_over') ? undefined : json['num_epochs_paid_over'],
        'filledEpochs': !exists(json, 'filled_epochs') ? undefined : json['filled_epochs'],
        'distributedCoins': !exists(json, 'distributed_coins') ? undefined : ((json['distributed_coins'] as Array<any>).map(InlineResponse2002BalancesFromJSON)),
    };
}

export function OsmosisIncentivesGaugeToJSON(value?: OsmosisIncentivesGauge | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': value.id,
        'is_perpetual': value.isPerpetual,
        'distribute_to': DistributionIncentivesByThirdPartyRewardsAreDistributedToLockupsThatAreAreReturnedByAtLeastOneOfTheseQueriesToJSON(value.distributeTo),
        'coins': value.coins === undefined ? undefined : ((value.coins as Array<any>).map(InlineResponse2002BalancesToJSON)),
        'start_time': value.startTime === undefined ? undefined : (value.startTime.toISOString()),
        'num_epochs_paid_over': value.numEpochsPaidOver,
        'filled_epochs': value.filledEpochs,
        'distributed_coins': value.distributedCoins === undefined ? undefined : ((value.distributedCoins as Array<any>).map(InlineResponse2002BalancesToJSON)),
    };
}


