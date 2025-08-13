import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core'
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'influenceio/1.0.0 (api/6.1.2)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * Returns information about the customer
   *
   * @summary Retrieve a customer
   * @throws FetchError<400, types.GetV1CustomerResponse400> Shop not found
   * @throws FetchError<401, types.GetV1CustomerResponse401> This response is return if either the shop is not found, the customer is not found or
   * the digest is mismatched. The exact reason for digest matching failing is not given for
   * security reasons.
   */
  getV1Customer(metadata?: types.GetV1CustomerMetadataParam): Promise<FetchResponse<200, types.GetV1CustomerResponse200>> {
    return this.core.fetch('/v1/customer', 'get', metadata);
  }

  /**
   * Returns information about the customer
   *
   * @summary Get all active rewards
   * @throws FetchError<400, types.GetV1CustomerAllRewardsResponse400> Shop not found
   * @throws FetchError<401, types.GetV1CustomerAllRewardsResponse401> This response is return if either the shop is not found, the customer is not found or
   * the digest is mismatched. The exact reason for digest matching failing is not given for
   * security reasons.
   */
  getV1CustomerAllRewards(metadata?: types.GetV1CustomerAllRewardsMetadataParam): Promise<FetchResponse<200, types.GetV1CustomerAllRewardsResponse200>> {
    return this.core.fetch('/v1/customer/all-rewards', 'get', metadata);
  }

  /**
   * Returns a count of all rewards for a customer
   *
   * @summary Get a count of all active rewards.
   * @throws FetchError<400, types.GetV1CustomerAllRewardsCountResponse400> Shop not found
   * @throws FetchError<401, types.GetV1CustomerAllRewardsCountResponse401> This response is return if either the shop is not found, the customer is not found or
   * the digest is mismatched. The exact reason for digest matching failing is not given for
   * security reasons.
   */
  getV1CustomerAllRewardsCount(metadata?: types.GetV1CustomerAllRewardsCountMetadataParam): Promise<FetchResponse<200, types.GetV1CustomerAllRewardsCountResponse200>> {
    return this.core.fetch('/v1/customer/all-rewards/count', 'get', metadata);
  }

  /**
   * DEPRECATED: Use `GET /v1/customer` instead.
   *  Returns information about the customer
   *
   * @summary Authenticate customer digest
   * @throws FetchError<400, types.PostV1CustomerAuthResponse400> Shop not found
   * @throws FetchError<401, types.PostV1CustomerAuthResponse401> This response is return if either the shop is not found, the customer is not found or
   * the digest is mismatched. The exact reason for digest matching failing is not given for
   * security reasons.
   */
  postV1CustomerAuth(body?: types.PostV1CustomerAuthBodyParam): Promise<FetchResponse<200, types.PostV1CustomerAuthResponse200>> {
    return this.core.fetch('/v1/customer/auth', 'post', body);
  }

  /**
   * Updates the customer's birthday
   *
   * @summary Update Birthday
   * @throws FetchError<400, types.PutV1CustomerBirthdayResponse400> Shop not found
   * @throws FetchError<401, types.PutV1CustomerBirthdayResponse401> This response is return if either the shop is not found, the customer is not found or
   * the digest is mismatched. The exact reason for digest matching failing is not given for
   * security reasons.
   */
  putV1CustomerBirthday(body?: types.PutV1CustomerBirthdayBodyParam): Promise<FetchResponse<200, types.PutV1CustomerBirthdayResponse200>> {
    return this.core.fetch('/v1/customer/birthday', 'put', body);
  }

  /**
   * Action a landing page earn rule for a customer
   *
   * @summary Action Landing Page
   * @throws FetchError<400, types.PostV1CustomerDynamicLinkResponse400> Shop not found
   * @throws FetchError<401, types.PostV1CustomerDynamicLinkResponse401> This response is return if either the shop is not found, the customer is not found or
   * the digest is mismatched. The exact reason for digest matching failing is not given for
   * security reasons.
   */
  postV1CustomerDynamicLink(body?: types.PostV1CustomerDynamicLinkBodyParam): Promise<FetchResponse<200, types.PostV1CustomerDynamicLinkResponse200>> {
    return this.core.fetch('/v1/customer/dynamic-link', 'post', body);
  }

  /**
   * Lookup a customer based on the barcode/QR Code data related to that loyalty card. This
   * endpoint has no authentication. As such, no sensitive information is returned from this
   * endpoint.
   *
   * @summary Loyalty Card Lookup
   */
  getV1CustomerLoyaltyCardLookup(metadata: types.GetV1CustomerLoyaltyCardLookupMetadataParam): Promise<FetchResponse<200, types.GetV1CustomerLoyaltyCardLookupResponse200>> {
    return this.core.fetch('/v1/customer/loyalty-card-lookup', 'get', metadata);
  }

  /**
   * Returns points activity for a customer
   *
   * @summary List points activity
   * @throws FetchError<400, types.GetV1CustomerPointsResponse400> Shop not found
   * @throws FetchError<401, types.GetV1CustomerPointsResponse401> This response is return if either the shop is not found, the customer is not found or
   * the digest is mismatched. The exact reason for digest matching failing is not given for
   * security reasons.
   */
  getV1CustomerPoints(metadata?: types.GetV1CustomerPointsMetadataParam): Promise<FetchResponse<200, types.GetV1CustomerPointsResponse200>> {
    return this.core.fetch('/v1/customer/points', 'get', metadata);
  }

  /**
   * Redeem a reward for a customer
   *
   * @summary Redeem a reward
   * @throws FetchError<400, types.PostV1CustomerRedeemResponse400> Shop not found
   * @throws FetchError<401, types.PostV1CustomerRedeemResponse401> This response is return if either the shop is not found, the customer is not found or
   * the digest is mismatched. The exact reason for digest matching failing is not given for
   * security reasons.
   */
  postV1CustomerRedeem(body?: types.PostV1CustomerRedeemBodyParam): Promise<FetchResponse<200, types.PostV1CustomerRedeemResponse200>> {
    return this.core.fetch('/v1/customer/redeem', 'post', body);
  }

  /**
   * Returns referral activity for a customer
   *
   * @summary List referral activity
   * @throws FetchError<400, types.GetV1CustomerReferralsResponse400> Shop not found
   * @throws FetchError<401, types.GetV1CustomerReferralsResponse401> This response is return if either the shop is not found, the customer is not found or
   * the digest is mismatched. The exact reason for digest matching failing is not given for
   * security reasons.
   */
  getV1CustomerReferrals(metadata?: types.GetV1CustomerReferralsMetadataParam): Promise<FetchResponse<200, types.GetV1CustomerReferralsResponse200>> {
    return this.core.fetch('/v1/customer/referrals', 'get', metadata);
  }

  /**
   * Action a social media earn rule for a customer
   *
   * @summary Action social
   * @throws FetchError<400, types.PostV1CustomerSocialResponse400> Shop not found
   * @throws FetchError<401, types.PostV1CustomerSocialResponse401> This response is return if either the shop is not found, the customer is not found or
   * the digest is mismatched. The exact reason for digest matching failing is not given for
   * security reasons.
   */
  postV1CustomerSocial(body?: types.PostV1CustomerSocialBodyParam): Promise<FetchResponse<200, types.PostV1CustomerSocialResponse200>> {
    return this.core.fetch('/v1/customer/social', 'post', body);
  }

  /**
   * Get current stamps for a customer
   *
   * @summary Get current stamps
   * @throws FetchError<400, types.GetV1CustomerStampsResponse400> Shop not found
   * @throws FetchError<401, types.GetV1CustomerStampsResponse401> This response is return if either the shop is not found, the customer is not found or
   * the digest is mismatched. The exact reason for digest matching failing is not given for
   * security reasons.
   */
  getV1CustomerStamps(body?: types.GetV1CustomerStampsBodyParam): Promise<FetchResponse<200, types.GetV1CustomerStampsResponse200>> {
    return this.core.fetch('/v1/customer/stamps', 'get', body);
  }

  /**
   * Action an "Upload File" earn rule. This earn rule is actioned in 2 parts;
   * 1. POST to this endpoint to create the point activity and register points against a
   * customer. The post request also returns a presigned URL in the response body.
   * 2. Upload a file to a presigned URL generated from the previous step using a PUT request
   * with the file contents as the body.
   *
   *
   * @summary Upload a File
   * @throws FetchError<400, types.PostV1CustomerUploadFileResponse400> Shop not found
   * @throws FetchError<401, types.PostV1CustomerUploadFileResponse401> This response is return if either the shop is not found, the customer is not found or
   * the digest is mismatched. The exact reason for digest matching failing is not given for
   * security reasons.
   */
  postV1CustomerUploadFile(body?: types.PostV1CustomerUploadFileBodyParam): Promise<FetchResponse<200, types.PostV1CustomerUploadFileResponse200>> {
    return this.core.fetch('/v1/customer/upload-file', 'post', body);
  }

  /**
   * Returns information about the shop
   *
   * @summary Get Shop
   */
  getV1Shop(metadata?: types.GetV1ShopMetadataParam): Promise<FetchResponse<200, types.GetV1ShopResponse200>> {
    return this.core.fetch('/v1/shop', 'get', metadata);
  }

  /**
   * Returns shop earn rules
   *
   * @summary List earn rules
   */
  getV1ShopRulesEarn(metadata?: types.GetV1ShopRulesEarnMetadataParam): Promise<FetchResponse<200, types.GetV1ShopRulesEarnResponse200>> {
    return this.core.fetch('/v1/shop/rules/earn', 'get', metadata);
  }

  /**
   * Returns shop redeem rules
   *
   * @summary List redeem rules
   */
  getV1ShopRulesRedeem(metadata?: types.GetV1ShopRulesRedeemMetadataParam): Promise<FetchResponse<200, types.GetV1ShopRulesRedeemResponse200>> {
    return this.core.fetch('/v1/shop/rules/redeem', 'get', metadata);
  }

  /**
   * Returns list of excluded products for earn rule
   *
   * @summary List earn product exclusions
   */
  getV1ShopRulesEarnIdExclusionsProduct(metadata: types.GetV1ShopRulesEarnIdExclusionsProductMetadataParam): Promise<FetchResponse<200, types.GetV1ShopRulesEarnIdExclusionsProductResponse200>> {
    return this.core.fetch('/v1/shop/rules/earn/{id}/exclusions/product', 'get', metadata);
  }

  /**
   * Returns list of excluded product variants for earn rule
   *
   * @summary List earn product variant exclusions
   */
  getV1ShopRulesEarnIdExclusionsVariant(metadata: types.GetV1ShopRulesEarnIdExclusionsVariantMetadataParam): Promise<FetchResponse<200, types.GetV1ShopRulesEarnIdExclusionsVariantResponse200>> {
    return this.core.fetch('/v1/shop/rules/earn/{id}/exclusions/variant', 'get', metadata);
  }

  /**
   * Returns shop referral rules
   *
   * @summary List referral rules
   */
  getV1ShopRulesReferral(metadata?: types.GetV1ShopRulesReferralMetadataParam): Promise<FetchResponse<200, types.GetV1ShopRulesReferralResponse200>> {
    return this.core.fetch('/v1/shop/rules/referral', 'get', metadata);
  }

  /**
   * Returns shop loyalty tiers
   *
   * @summary List loyalty tiers
   */
  getV1ShopTiers(metadata?: types.GetV1ShopTiersMetadataParam): Promise<FetchResponse<200, types.GetV1ShopTiersResponse200>> {
    return this.core.fetch('/v1/shop/tiers', 'get', metadata);
  }

  /**
   * Fetch a loyalty tier by ID
   *
   * @summary Get a loyalty tier
   */
  getV1ShopTiersId(metadata: types.GetV1ShopTiersIdMetadataParam): Promise<FetchResponse<200, types.GetV1ShopTiersIdResponse200>> {
    return this.core.fetch('/v1/shop/tiers/{id}', 'get', metadata);
  }

  /**
   * Returns shop stamp card settings
   *
   * @summary Get stamp card settings
   */
  getV1ShopStampCard(metadata?: types.GetV1ShopStampCardMetadataParam): Promise<FetchResponse<200, types.GetV1ShopStampCardResponse200>> {
    return this.core.fetch('/v1/shop/stamp-card', 'get', metadata);
  }
}

const createSDK = (() => { return new SDK(); })()
;

export default createSDK;

export type { GetV1CustomerAllRewardsCountMetadataParam, GetV1CustomerAllRewardsCountResponse200, GetV1CustomerAllRewardsCountResponse400, GetV1CustomerAllRewardsCountResponse401, GetV1CustomerAllRewardsMetadataParam, GetV1CustomerAllRewardsResponse200, GetV1CustomerAllRewardsResponse400, GetV1CustomerAllRewardsResponse401, GetV1CustomerLoyaltyCardLookupMetadataParam, GetV1CustomerLoyaltyCardLookupResponse200, GetV1CustomerMetadataParam, GetV1CustomerPointsMetadataParam, GetV1CustomerPointsResponse200, GetV1CustomerPointsResponse400, GetV1CustomerPointsResponse401, GetV1CustomerReferralsMetadataParam, GetV1CustomerReferralsResponse200, GetV1CustomerReferralsResponse400, GetV1CustomerReferralsResponse401, GetV1CustomerResponse200, GetV1CustomerResponse400, GetV1CustomerResponse401, GetV1CustomerStampsBodyParam, GetV1CustomerStampsResponse200, GetV1CustomerStampsResponse400, GetV1CustomerStampsResponse401, GetV1ShopMetadataParam, GetV1ShopResponse200, GetV1ShopRulesEarnIdExclusionsProductMetadataParam, GetV1ShopRulesEarnIdExclusionsProductResponse200, GetV1ShopRulesEarnIdExclusionsVariantMetadataParam, GetV1ShopRulesEarnIdExclusionsVariantResponse200, GetV1ShopRulesEarnMetadataParam, GetV1ShopRulesEarnResponse200, GetV1ShopRulesRedeemMetadataParam, GetV1ShopRulesRedeemResponse200, GetV1ShopRulesReferralMetadataParam, GetV1ShopRulesReferralResponse200, GetV1ShopStampCardMetadataParam, GetV1ShopStampCardResponse200, GetV1ShopTiersIdMetadataParam, GetV1ShopTiersIdResponse200, GetV1ShopTiersMetadataParam, GetV1ShopTiersResponse200, PostV1CustomerAuthBodyParam, PostV1CustomerAuthResponse200, PostV1CustomerAuthResponse400, PostV1CustomerAuthResponse401, PostV1CustomerDynamicLinkBodyParam, PostV1CustomerDynamicLinkResponse200, PostV1CustomerDynamicLinkResponse400, PostV1CustomerDynamicLinkResponse401, PostV1CustomerRedeemBodyParam, PostV1CustomerRedeemResponse200, PostV1CustomerRedeemResponse400, PostV1CustomerRedeemResponse401, PostV1CustomerSocialBodyParam, PostV1CustomerSocialResponse200, PostV1CustomerSocialResponse400, PostV1CustomerSocialResponse401, PostV1CustomerUploadFileBodyParam, PostV1CustomerUploadFileResponse200, PostV1CustomerUploadFileResponse400, PostV1CustomerUploadFileResponse401, PutV1CustomerBirthdayBodyParam, PutV1CustomerBirthdayResponse200, PutV1CustomerBirthdayResponse400, PutV1CustomerBirthdayResponse401 } from './types';
