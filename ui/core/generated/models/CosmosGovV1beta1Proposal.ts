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
    InlineResponse20019FinalTallyResult,
    InlineResponse20019FinalTallyResultFromJSON,
    InlineResponse20019FinalTallyResultFromJSONTyped,
    InlineResponse20019FinalTallyResultToJSON,
    InlineResponse2002Balances,
    InlineResponse2002BalancesFromJSON,
    InlineResponse2002BalancesFromJSONTyped,
    InlineResponse2002BalancesToJSON,
    InlineResponseDefaultDetails,
    InlineResponseDefaultDetailsFromJSON,
    InlineResponseDefaultDetailsFromJSONTyped,
    InlineResponseDefaultDetailsToJSON,
} from './';

/**
 * Proposal defines the core field members of a governance proposal.
 * @export
 * @interface CosmosGovV1beta1Proposal
 */
export interface CosmosGovV1beta1Proposal {
    /**
     * 
     * @type {string}
     * @memberof CosmosGovV1beta1Proposal
     */
    proposalId?: string;
    /**
     * 
     * @type {InlineResponseDefaultDetails}
     * @memberof CosmosGovV1beta1Proposal
     */
    content?: InlineResponseDefaultDetails;
    /**
     * ProposalStatus enumerates the valid statuses of a proposal.
     * 
     *  - PROPOSAL_STATUS_UNSPECIFIED: PROPOSAL_STATUS_UNSPECIFIED defines the default propopsal status.
     *  - PROPOSAL_STATUS_DEPOSIT_PERIOD: PROPOSAL_STATUS_DEPOSIT_PERIOD defines a proposal status during the deposit
     * period.
     *  - PROPOSAL_STATUS_VOTING_PERIOD: PROPOSAL_STATUS_VOTING_PERIOD defines a proposal status during the voting
     * period.
     *  - PROPOSAL_STATUS_PASSED: PROPOSAL_STATUS_PASSED defines a proposal status of a proposal that has
     * passed.
     *  - PROPOSAL_STATUS_REJECTED: PROPOSAL_STATUS_REJECTED defines a proposal status of a proposal that has
     * been rejected.
     *  - PROPOSAL_STATUS_FAILED: PROPOSAL_STATUS_FAILED defines a proposal status of a proposal that has
     * failed.
     * @type {string}
     * @memberof CosmosGovV1beta1Proposal
     */
    status?: CosmosGovV1beta1ProposalStatusEnum;
    /**
     * 
     * @type {InlineResponse20019FinalTallyResult}
     * @memberof CosmosGovV1beta1Proposal
     */
    finalTallyResult?: InlineResponse20019FinalTallyResult;
    /**
     * 
     * @type {Date}
     * @memberof CosmosGovV1beta1Proposal
     */
    submitTime?: Date;
    /**
     * 
     * @type {Date}
     * @memberof CosmosGovV1beta1Proposal
     */
    depositEndTime?: Date;
    /**
     * 
     * @type {Array<InlineResponse2002Balances>}
     * @memberof CosmosGovV1beta1Proposal
     */
    totalDeposit?: Array<InlineResponse2002Balances>;
    /**
     * 
     * @type {Date}
     * @memberof CosmosGovV1beta1Proposal
     */
    votingStartTime?: Date;
    /**
     * 
     * @type {Date}
     * @memberof CosmosGovV1beta1Proposal
     */
    votingEndTime?: Date;
}

/**
* @export
* @enum {string}
*/
export enum CosmosGovV1beta1ProposalStatusEnum {
    Unspecified = 'PROPOSAL_STATUS_UNSPECIFIED',
    DepositPeriod = 'PROPOSAL_STATUS_DEPOSIT_PERIOD',
    VotingPeriod = 'PROPOSAL_STATUS_VOTING_PERIOD',
    Passed = 'PROPOSAL_STATUS_PASSED',
    Rejected = 'PROPOSAL_STATUS_REJECTED',
    Failed = 'PROPOSAL_STATUS_FAILED'
}

export function CosmosGovV1beta1ProposalFromJSON(json: any): CosmosGovV1beta1Proposal {
    return CosmosGovV1beta1ProposalFromJSONTyped(json, false);
}

export function CosmosGovV1beta1ProposalFromJSONTyped(json: any, ignoreDiscriminator: boolean): CosmosGovV1beta1Proposal {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'proposalId': !exists(json, 'proposal_id') ? undefined : json['proposal_id'],
        'content': !exists(json, 'content') ? undefined : InlineResponseDefaultDetailsFromJSON(json['content']),
        'status': !exists(json, 'status') ? undefined : json['status'],
        'finalTallyResult': !exists(json, 'final_tally_result') ? undefined : InlineResponse20019FinalTallyResultFromJSON(json['final_tally_result']),
        'submitTime': !exists(json, 'submit_time') ? undefined : (new Date(json['submit_time'])),
        'depositEndTime': !exists(json, 'deposit_end_time') ? undefined : (new Date(json['deposit_end_time'])),
        'totalDeposit': !exists(json, 'total_deposit') ? undefined : ((json['total_deposit'] as Array<any>).map(InlineResponse2002BalancesFromJSON)),
        'votingStartTime': !exists(json, 'voting_start_time') ? undefined : (new Date(json['voting_start_time'])),
        'votingEndTime': !exists(json, 'voting_end_time') ? undefined : (new Date(json['voting_end_time'])),
    };
}

export function CosmosGovV1beta1ProposalToJSON(value?: CosmosGovV1beta1Proposal | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'proposal_id': value.proposalId,
        'content': InlineResponseDefaultDetailsToJSON(value.content),
        'status': value.status,
        'final_tally_result': InlineResponse20019FinalTallyResultToJSON(value.finalTallyResult),
        'submit_time': value.submitTime === undefined ? undefined : (value.submitTime.toISOString()),
        'deposit_end_time': value.depositEndTime === undefined ? undefined : (value.depositEndTime.toISOString()),
        'total_deposit': value.totalDeposit === undefined ? undefined : ((value.totalDeposit as Array<any>).map(InlineResponse2002BalancesToJSON)),
        'voting_start_time': value.votingStartTime === undefined ? undefined : (value.votingStartTime.toISOString()),
        'voting_end_time': value.votingEndTime === undefined ? undefined : (value.votingEndTime.toISOString()),
    };
}


