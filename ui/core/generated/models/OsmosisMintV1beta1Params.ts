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
    DistributionProportionsDefinesTheProportionOfTheMintedDenom,
    DistributionProportionsDefinesTheProportionOfTheMintedDenomFromJSON,
    DistributionProportionsDefinesTheProportionOfTheMintedDenomFromJSONTyped,
    DistributionProportionsDefinesTheProportionOfTheMintedDenomToJSON,
} from './';

/**
 * Params holds parameters for the mint module.
 * @export
 * @interface OsmosisMintV1beta1Params
 */
export interface OsmosisMintV1beta1Params {
    /**
     * 
     * @type {string}
     * @memberof OsmosisMintV1beta1Params
     */
    mintDenom?: string;
    /**
     * 
     * @type {string}
     * @memberof OsmosisMintV1beta1Params
     */
    genesisEpochProvisions?: string;
    /**
     * 
     * @type {string}
     * @memberof OsmosisMintV1beta1Params
     */
    epochIdentifier?: string;
    /**
     * 
     * @type {string}
     * @memberof OsmosisMintV1beta1Params
     */
    reductionPeriodInEpochs?: string;
    /**
     * 
     * @type {string}
     * @memberof OsmosisMintV1beta1Params
     */
    reductionFactor?: string;
    /**
     * 
     * @type {DistributionProportionsDefinesTheProportionOfTheMintedDenom}
     * @memberof OsmosisMintV1beta1Params
     */
    distributionProportions?: DistributionProportionsDefinesTheProportionOfTheMintedDenom;
    /**
     * 
     * @type {string}
     * @memberof OsmosisMintV1beta1Params
     */
    developerRewardsReceiver?: string;
    /**
     * 
     * @type {string}
     * @memberof OsmosisMintV1beta1Params
     */
    mintingRewardsDistributionStartEpoch?: string;
}

export function OsmosisMintV1beta1ParamsFromJSON(json: any): OsmosisMintV1beta1Params {
    return OsmosisMintV1beta1ParamsFromJSONTyped(json, false);
}

export function OsmosisMintV1beta1ParamsFromJSONTyped(json: any, ignoreDiscriminator: boolean): OsmosisMintV1beta1Params {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'mintDenom': !exists(json, 'mint_denom') ? undefined : json['mint_denom'],
        'genesisEpochProvisions': !exists(json, 'genesis_epoch_provisions') ? undefined : json['genesis_epoch_provisions'],
        'epochIdentifier': !exists(json, 'epoch_identifier') ? undefined : json['epoch_identifier'],
        'reductionPeriodInEpochs': !exists(json, 'reduction_period_in_epochs') ? undefined : json['reduction_period_in_epochs'],
        'reductionFactor': !exists(json, 'reduction_factor') ? undefined : json['reduction_factor'],
        'distributionProportions': !exists(json, 'distribution_proportions') ? undefined : DistributionProportionsDefinesTheProportionOfTheMintedDenomFromJSON(json['distribution_proportions']),
        'developerRewardsReceiver': !exists(json, 'developer_rewards_receiver') ? undefined : json['developer_rewards_receiver'],
        'mintingRewardsDistributionStartEpoch': !exists(json, 'minting_rewards_distribution_start_epoch') ? undefined : json['minting_rewards_distribution_start_epoch'],
    };
}

export function OsmosisMintV1beta1ParamsToJSON(value?: OsmosisMintV1beta1Params | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'mint_denom': value.mintDenom,
        'genesis_epoch_provisions': value.genesisEpochProvisions,
        'epoch_identifier': value.epochIdentifier,
        'reduction_period_in_epochs': value.reductionPeriodInEpochs,
        'reduction_factor': value.reductionFactor,
        'distribution_proportions': DistributionProportionsDefinesTheProportionOfTheMintedDenomToJSON(value.distributionProportions),
        'developer_rewards_receiver': value.developerRewardsReceiver,
        'minting_rewards_distribution_start_epoch': value.mintingRewardsDistributionStartEpoch,
    };
}


