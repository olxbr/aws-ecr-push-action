import { __assign, __awaiter, __generator } from "tslib";
import { fromEnv } from "@aws-sdk/credential-provider-env";
import { fromContainerMetadata, fromInstanceMetadata } from "@aws-sdk/credential-provider-imds";
import { fromTokenFile } from "@aws-sdk/credential-provider-web-identity";
import { ProviderError } from "@aws-sdk/property-provider";
import { loadSharedConfigFiles, } from "@aws-sdk/shared-ini-file-loader";
var DEFAULT_PROFILE = "default";
export var ENV_PROFILE = "AWS_PROFILE";
var isStaticCredsProfile = function (arg) {
    return Boolean(arg) &&
        typeof arg === "object" &&
        typeof arg.aws_access_key_id === "string" &&
        typeof arg.aws_secret_access_key === "string" &&
        ["undefined", "string"].indexOf(typeof arg.aws_session_token) > -1;
};
var isWebIdentityProfile = function (arg) {
    return Boolean(arg) &&
        typeof arg === "object" &&
        typeof arg.web_identity_token_file === "string" &&
        typeof arg.role_arn === "string" &&
        ["undefined", "string"].indexOf(typeof arg.role_session_name) > -1;
};
var isAssumeRoleProfile = function (arg) {
    return Boolean(arg) &&
        typeof arg === "object" &&
        typeof arg.role_arn === "string" &&
        ["undefined", "string"].indexOf(typeof arg.role_session_name) > -1 &&
        ["undefined", "string"].indexOf(typeof arg.external_id) > -1 &&
        ["undefined", "string"].indexOf(typeof arg.mfa_serial) > -1;
};
var isAssumeRoleWithSourceProfile = function (arg) {
    return isAssumeRoleProfile(arg) && typeof arg.source_profile === "string" && typeof arg.credential_source === "undefined";
};
var isAssumeRoleWithProviderProfile = function (arg) {
    return isAssumeRoleProfile(arg) && typeof arg.credential_source === "string" && typeof arg.source_profile === "undefined";
};
/**
 * Creates a credential provider that will read from ini files and supports
 * role assumption and multi-factor authentication.
 */
export var fromIni = function (init) {
    if (init === void 0) { init = {}; }
    return function () { return __awaiter(void 0, void 0, void 0, function () {
        var profiles;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, parseKnownFiles(init)];
                case 1:
                    profiles = _a.sent();
                    return [2 /*return*/, resolveProfileData(getMasterProfileName(init), profiles, init)];
            }
        });
    }); };
};
/**
 * Load profiles from credentials and config INI files and normalize them into a
 * single profile list.
 *
 * @internal
 */
export var parseKnownFiles = function (init) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, loadedConfig, parsedFiles;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = init.loadedConfig, loadedConfig = _a === void 0 ? loadSharedConfigFiles(init) : _a;
                return [4 /*yield*/, loadedConfig];
            case 1:
                parsedFiles = _b.sent();
                return [2 /*return*/, __assign(__assign({}, parsedFiles.configFile), parsedFiles.credentialsFile)];
        }
    });
}); };
/**
 * @internal
 */
export var getMasterProfileName = function (init) {
    return init.profile || process.env[ENV_PROFILE] || DEFAULT_PROFILE;
};
var resolveProfileData = function (profileName, profiles, options, visitedProfiles) {
    if (visitedProfiles === void 0) { visitedProfiles = {}; }
    return __awaiter(void 0, void 0, void 0, function () {
        var data, ExternalId, mfa_serial, RoleArn, _a, RoleSessionName, source_profile, credential_source, sourceCreds, params, _b, _c, _d;
        var _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    data = profiles[profileName];
                    // If this is not the first profile visited, static credentials should be
                    // preferred over role assumption metadata. This special treatment of
                    // second and subsequent hops is to ensure compatibility with the AWS CLI.
                    if (Object.keys(visitedProfiles).length > 0 && isStaticCredsProfile(data)) {
                        return [2 /*return*/, resolveStaticCredentials(data)];
                    }
                    if (!(isAssumeRoleWithSourceProfile(data) || isAssumeRoleWithProviderProfile(data))) return [3 /*break*/, 4];
                    ExternalId = data.external_id, mfa_serial = data.mfa_serial, RoleArn = data.role_arn, _a = data.role_session_name, RoleSessionName = _a === void 0 ? "aws-sdk-js-" + Date.now() : _a, source_profile = data.source_profile, credential_source = data.credential_source;
                    if (!options.roleAssumer) {
                        throw new ProviderError("Profile " + profileName + " requires a role to be assumed, but no" + " role assumption callback was provided.", false);
                    }
                    if (source_profile && source_profile in visitedProfiles) {
                        throw new ProviderError("Detected a cycle attempting to resolve credentials for profile" +
                            (" " + getMasterProfileName(options) + ". Profiles visited: ") +
                            Object.keys(visitedProfiles).join(", "), false);
                    }
                    sourceCreds = source_profile
                        ? resolveProfileData(source_profile, profiles, options, __assign(__assign({}, visitedProfiles), (_e = {}, _e[source_profile] = true, _e)))
                        : resolveCredentialSource(credential_source, profileName)();
                    params = { RoleArn: RoleArn, RoleSessionName: RoleSessionName, ExternalId: ExternalId };
                    if (!mfa_serial) return [3 /*break*/, 2];
                    if (!options.mfaCodeProvider) {
                        throw new ProviderError("Profile " + profileName + " requires multi-factor authentication," + " but no MFA code callback was provided.", false);
                    }
                    params.SerialNumber = mfa_serial;
                    _b = params;
                    return [4 /*yield*/, options.mfaCodeProvider(mfa_serial)];
                case 1:
                    _b.TokenCode = _f.sent();
                    _f.label = 2;
                case 2:
                    _d = (_c = options).roleAssumer;
                    return [4 /*yield*/, sourceCreds];
                case 3: return [2 /*return*/, _d.apply(_c, [_f.sent(), params])];
                case 4:
                    // If no role assumption metadata is present, attempt to load static
                    // credentials from the selected profile.
                    if (isStaticCredsProfile(data)) {
                        return [2 /*return*/, resolveStaticCredentials(data)];
                    }
                    // If no static credentials are present, attempt to assume role with
                    // web identity if web_identity_token_file and role_arn is available
                    if (isWebIdentityProfile(data)) {
                        return [2 /*return*/, resolveWebIdentityCredentials(data, options)];
                    }
                    // If the profile cannot be parsed or contains neither static credentials
                    // nor role assumption metadata, throw an error. This should be considered a
                    // terminal resolution error if a profile has been specified by the user
                    // (whether via a parameter, an environment variable, or another profile's
                    // `source_profile` key).
                    throw new ProviderError("Profile " + profileName + " could not be found or parsed in shared" + " credentials file.");
            }
        });
    });
};
/**
 * Resolve the `credential_source` entry from the profile, and return the
 * credential providers respectively. No memoization is needed for the
 * credential source providers because memoization should be added outside the
 * fromIni() provider. The source credential needs to be refreshed every time
 * fromIni() is called.
 */
var resolveCredentialSource = function (credentialSource, profileName) {
    var sourceProvidersMap = {
        EcsContainer: fromContainerMetadata,
        Ec2InstanceMetadata: fromInstanceMetadata,
        Environment: fromEnv,
    };
    if (credentialSource in sourceProvidersMap) {
        return sourceProvidersMap[credentialSource]();
    }
    else {
        throw new ProviderError("Unsupported credential source in profile " + profileName + ". Got " + credentialSource + ", " +
            "expected EcsContainer or Ec2InstanceMetadata or Environment.");
    }
};
var resolveStaticCredentials = function (profile) {
    return Promise.resolve({
        accessKeyId: profile.aws_access_key_id,
        secretAccessKey: profile.aws_secret_access_key,
        sessionToken: profile.aws_session_token,
    });
};
var resolveWebIdentityCredentials = function (profile, options) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, fromTokenFile({
                webIdentityTokenFile: profile.web_identity_token_file,
                roleArn: profile.role_arn,
                roleSessionName: profile.role_session_name,
                roleAssumerWithWebIdentity: options.roleAssumerWithWebIdentity,
            })()];
    });
}); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxrQ0FBa0MsQ0FBQztBQUMzRCxPQUFPLEVBQUUscUJBQXFCLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNoRyxPQUFPLEVBQW1DLGFBQWEsRUFBRSxNQUFNLDJDQUEyQyxDQUFDO0FBQzNHLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRCxPQUFPLEVBQ0wscUJBQXFCLEdBS3RCLE1BQU0saUNBQWlDLENBQUM7QUFHekMsSUFBTSxlQUFlLEdBQUcsU0FBUyxDQUFDO0FBQ2xDLE1BQU0sQ0FBQyxJQUFNLFdBQVcsR0FBRyxhQUFhLENBQUM7QUFzRnpDLElBQU0sb0JBQW9CLEdBQUcsVUFBQyxHQUFRO0lBQ3BDLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNaLE9BQU8sR0FBRyxLQUFLLFFBQVE7UUFDdkIsT0FBTyxHQUFHLENBQUMsaUJBQWlCLEtBQUssUUFBUTtRQUN6QyxPQUFPLEdBQUcsQ0FBQyxxQkFBcUIsS0FBSyxRQUFRO1FBQzdDLENBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxPQUFPLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUpsRSxDQUlrRSxDQUFDO0FBUXJFLElBQU0sb0JBQW9CLEdBQUcsVUFBQyxHQUFRO0lBQ3BDLE9BQUEsT0FBTyxDQUFDLEdBQUcsQ0FBQztRQUNaLE9BQU8sR0FBRyxLQUFLLFFBQVE7UUFDdkIsT0FBTyxHQUFHLENBQUMsdUJBQXVCLEtBQUssUUFBUTtRQUMvQyxPQUFPLEdBQUcsQ0FBQyxRQUFRLEtBQUssUUFBUTtRQUNoQyxDQUFDLFdBQVcsRUFBRSxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxHQUFHLENB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Q0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUM7S0FDL0M7U0FBTTtRQUNMLE1BQU0sSUFBSSxhQUFhLENBQ3JCLDhDQUE0QyxXQUFXLGNBQVMsZ0JBQWdCLE9BQUk7WUFDbEYsOERBQThELENBQ2pFLENBQUM7S0FDSDtBQUNILENBQUMsQ0FBQztBQUVGLElBQU0sd0JBQXdCLEdBQUcsVUFBQyxPQUEyQjtJQUMzRCxPQUFBLE9BQU8sQ0FBQyxPQUFPLENBQUM7UUFDZCxXQUFXLEVBQUUsT0FBTyxDQUFDLGlCQUFpQjtRQUN0QyxlQUFlLEVBQUUsT0FBTyxDQUFDLHFCQUFxQjtRQUM5QyxZQUFZLEVBQUUsT0FBTyxDQUFDLGlCQUFpQjtLQUN4QyxDQUFDO0FBSkYsQ0FJRSxDQUFDO0FBRUwsSUFBTSw2QkFBNkIsR0FBRyxVQUFPLE9BQTJCLEVBQUUsT0FBb0I7O1FBQzVGLHNCQUFBLGFBQWEsQ0FBQztnQkFDWixvQkFBb0IsRUFBRSxPQUFPLENBQUMsdUJBQXVCO2dCQUNyRCxPQUFPLEVBQUUsT0FBTyxDQUFDLFFBQVE7Z0JBQ3pCLGVBQWUsRUFBRSxPQUFPLENBQUMsaUJBQWlCO2dCQUMxQywwQkFBMEIsRUFBRSxPQUFPLENBQUMsMEJBQTBCO2FBQy9ELENBQUMsRUFBRSxFQUFBOztLQUFBLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBmcm9tRW52IH0gZnJvbSBcIkBhd3Mtc2RrL2NyZWRlbnRpYWwtcHJvdmlkZXItZW52XCI7XG5pbXBvcnQgeyBmcm9tQ29udGFpbmVyTWV0YWRhdGEsIGZyb21JbnN0YW5jZU1ldGFkYXRhIH0gZnJvbSBcIkBhd3Mtc2RrL2NyZWRlbnRpYWwtcHJvdmlkZXItaW1kc1wiO1xuaW1wb3J0IHsgQXNzdW1lUm9sZVdpdGhXZWJJZGVudGl0eVBhcmFtcywgZnJvbVRva2VuRmlsZSB9IGZyb20gXCJAYXdzLXNkay9jcmVkZW50aWFsLXByb3ZpZGVyLXdlYi1pZGVudGl0eVwiO1xuaW1wb3J0IHsgUHJvdmlkZXJFcnJvciB9IGZyb20gXCJAYXdzLXNkay9wcm9wZXJ0eS1wcm92aWRlclwiO1xuaW1wb3J0IHtcbiAgbG9hZFNoYXJlZENvbmZpZ0ZpbGVzLFxuICBQYXJzZWRJbmlEYXRhLFxuICBQcm9maWxlLFxuICBTaGFyZWRDb25maWdGaWxlcyxcbiAgU2hhcmVkQ29uZmlnSW5pdCxcbn0gZnJvbSBcIkBhd3Mtc2RrL3NoYXJlZC1pbmktZmlsZS1sb2FkZXJcIjtcbmltcG9ydCB7IENyZWRlbnRpYWxQcm92aWRlciwgQ3JlZGVudGlhbHMgfSBmcm9tIFwiQGF3cy1zZGsvdHlwZXNcIjtcblxuY29uc3QgREVGQVVMVF9QUk9GSUxFID0gXCJkZWZhdWx0XCI7XG5leHBvcnQgY29uc3QgRU5WX1BST0ZJTEUgPSBcIkFXU19QUk9GSUxFXCI7XG5cbi8qKlxuICogQHNlZSBodHRwOi8vZG9jcy5hd3MuYW1hem9uLmNvbS9BV1NKYXZhU2NyaXB0U0RLL2xhdGVzdC9BV1MvU1RTLmh0bWwjYXNzdW1lUm9sZS1wcm9wZXJ0eVxuICogVE9ETyB1cGRhdGUgdGhlIGFib3ZlIHRvIGxpbmsgdG8gVjMgZG9jc1xuICovXG5leHBvcnQgaW50ZXJmYWNlIEFzc3VtZVJvbGVQYXJhbXMge1xuICAvKipcbiAgICogVGhlIGlkZW50aWZpZXIgb2YgdGhlIHJvbGUgdG8gYmUgYXNzdW1lZC5cbiAgICovXG4gIFJvbGVBcm46IHN0cmluZztcblxuICAvKipcbiAgICogQSBuYW1lIGZvciB0aGUgYXNzdW1lZCByb2xlIHNlc3Npb24uXG4gICAqL1xuICBSb2xlU2Vzc2lvbk5hbWU6IHN0cmluZztcblxuICAvKipcbiAgICogQSB1bmlxdWUgaWRlbnRpZmllciB0aGF0IGlzIHVzZWQgYnkgdGhpcmQgcGFydGllcyB3aGVuIGFzc3VtaW5nIHJvbGVzIGluXG4gICAqIHRoZWlyIGN1c3RvbWVycycgYWNjb3VudHMuXG4gICAqL1xuICBFeHRlcm5hbElkPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgaWRlbnRpZmljYXRpb24gbnVtYmVyIG9mIHRoZSBNRkEgZGV2aWNlIHRoYXQgaXMgYXNzb2NpYXRlZCB3aXRoIHRoZVxuICAgKiB1c2VyIHdobyBpcyBtYWtpbmcgdGhlIGBBc3N1bWVSb2xlYCBjYWxsLlxuICAgKi9cbiAgU2VyaWFsTnVtYmVyPzogc3RyaW5nO1xuXG4gIC8qKlxuICAgKiBUaGUgdmFsdWUgcHJvdmlkZWQgYnkgdGhlIE1GQSBkZXZpY2UuXG4gICAqL1xuICBUb2tlbkNvZGU/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU291cmNlUHJvZmlsZUluaXQgZXh0ZW5kcyBTaGFyZWRDb25maWdJbml0IHtcbiAgLyoqXG4gICAqIFRoZSBjb25maWd1cmF0aW9uIHByb2ZpbGUgdG8gdXNlLlxuICAgKi9cbiAgcHJvZmlsZT86IHN0cmluZztcblxuICAvKipcbiAgICogQSBwcm9taXNlIHRoYXQgd2lsbCBiZSByZXNvbHZlZCB3aXRoIGxvYWRlZCBhbmQgcGFyc2VkIGNyZWRlbnRpYWxzIGZpbGVzLlxuICAgKiBVc2VkIHRvIGF2b2lkIGxvYWRpbmcgc2hhcmVkIGNvbmZpZyBmaWxlcyBtdWx0aXBsZSB0aW1lcy5cbiAgICpcbiAgICogQGludGVybmFsXG4gICAqL1xuICBsb2FkZWRDb25maWc/OiBQcm9taXNlPFNoYXJlZENvbmZpZ0ZpbGVzPjtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBGcm9tSW5pSW5pdCBleHRlbmRzIFNvdXJjZVByb2ZpbGVJbml0IHtcbiAgLyoqXG4gICAqIEEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIGEgcHJvbWlzZSBmdWxmaWxsZWQgd2l0aCBhbiBNRkEgdG9rZW4gY29kZSBmb3JcbiAgICogdGhlIHByb3ZpZGVkIE1GQSBTZXJpYWwgY29kZS4gSWYgYSBwcm9maWxlIHJlcXVpcmVzIGFuIE1GQSBjb2RlIGFuZFxuICAgKiBgbWZhQ29kZVByb3ZpZGVyYCBpcyBub3QgYSB2YWxpZCBmdW5jdGlvbiwgdGhlIGNyZWRlbnRpYWwgcHJvdmlkZXJcbiAgICogcHJvbWlzZSB3aWxsIGJlIHJlamVjdGVkLlxuICAgKlxuICAgKiBAcGFyYW0gbWZhU2VyaWFsIFRoZSBzZXJpYWwgY29kZSBvZiB0aGUgTUZBIGRldmljZSBzcGVjaWZpZWQuXG4gICAqL1xuICBtZmFDb2RlUHJvdmlkZXI/OiAobWZhU2VyaWFsOiBzdHJpbmcpID0+IFByb21pc2U8c3RyaW5nPjtcblxuICAvKipcbiAgICogQSBmdW5jdGlvbiB0aGF0IGFzc3VtZXMgYSByb2xlIGFuZCByZXR1cm5zIGEgcHJvbWlzZSBmdWxmaWxsZWQgd2l0aFxuICAgKiBjcmVkZW50aWFscyBmb3IgdGhlIGFzc3VtZWQgcm9sZS5cbiAgICpcbiAgICogQHBhcmFtIHNvdXJjZUNyZWRzIFRoZSBjcmVkZW50aWFscyB3aXRoIHdoaWNoIHRvIGFzc3VtZSBhIHJvbGUuXG4gICAqIEBwYXJhbSBwYXJhbXNcbiAgICovXG4gIHJvbGVBc3N1bWVyPzogKHNvdXJjZUNyZWRzOiBDcmVkZW50aWFscywgcGFyYW1zOiBBc3N1bWVSb2xlUGFyYW1zKSA9PiBQcm9taXNlPENyZWRlbnRpYWxzPjtcblxuICAvKipcbiAgICogQSBmdW5jdGlvbiB0aGF0IGFzc3VtZXMgYSByb2xlIHdpdGggd2ViIGlkZW50aXR5IGFuZCByZXR1cm5zIGEgcHJvbWlzZSBmdWxmaWxsZWQgd2l0aFxuICAgKiBjcmVkZW50aWFscyBmb3IgdGhlIGFzc3VtZWQgcm9sZS5cbiAgICpcbiAgICogQHBhcmFtIHNvdXJjZUNyZWRzIFRoZSBjcmVkZW50aWFscyB3aXRoIHdoaWNoIHRvIGFzc3VtZSBhIHJvbGUuXG4gICAqIEBwYXJhbSBwYXJhbXNcbiAgICovXG4gIHJvbGVBc3N1bWVyV2l0aFdlYklkZW50aXR5PzogKHBhcmFtczogQXNzdW1lUm9sZVdpdGhXZWJJZGVudGl0eVBhcmFtcykgPT4gUHJvbWlzZTxDcmVkZW50aWFscz47XG59XG5cbmludGVyZmFjZSBTdGF0aWNDcmVkc1Byb2ZpbGUgZXh0ZW5kcyBQcm9maWxlIHtcbiAgYXdzX2FjY2Vzc19rZXlfaWQ6IHN0cmluZztcbiAgYXdzX3NlY3JldF9hY2Nlc3Nfa2V5OiBzdHJpbmc7XG4gIGF3c19zZXNzaW9uX3Rva2VuPzogc3RyaW5nO1xufVxuXG5jb25zdCBpc1N0YXRpY0NyZWRzUHJvZmlsZSA9IChhcmc6IGFueSk6IGFyZyBpcyBTdGF0aWNDcmVkc1Byb2ZpbGUgPT5cbiAgQm9vbGVhbihhcmcpICYmXG4gIHR5cGVvZiBhcmcgPT09IFwib2JqZWN0XCIgJiZcbiAgdHlwZW9mIGFyZy5hd3NfYWNjZXNzX2tleV9pZCA9PT0gXCJzdHJpbmdcIiAmJlxuICB0eXBlb2YgYXJnLmF3c19zZWNyZXRfYWNjZXNzX2tleSA9PT0gXCJzdHJpbmdcIiAmJlxuICBbXCJ1bmRlZmluZWRcIiwgXCJzdHJpbmdcIl0uaW5kZXhPZih0eXBlb2YgYXJnLmF3c19zZXNzaW9uX3Rva2VuKSA+IC0xO1xuXG5pbnRlcmZhY2UgV2ViSWRlbnRpdHlQcm9maWxlIGV4dGVuZHMgUHJvZmlsZSB7XG4gIHdlYl9pZGVudGl0eV90b2tlbl9maWxlOiBzdHJpbmc7XG4gIHJvbGVfYXJuOiBzdHJpbmc7XG4gIHJvbGVfc2Vzc2lvbl9uYW1lPzogc3RyaW5nO1xufVxuXG5jb25zdCBpc1dlYklkZW50aXR5UHJvZmlsZSA9IChhcmc6IGFueSk6IGFyZyBpcyBXZWJJZGVudGl0eVByb2ZpbGUgPT5cbiAgQm9vbGVhbihhcmcpICYmXG4gIHR5cGVvZiBhcmcgPT09IFwib2JqZWN0XCIgJiZcbiAgdHlwZW9mIGFyZy53ZWJfaWRlbnRpdHlfdG9rZW5fZmlsZSA9PT0gXCJzdHJpbmdcIiAmJlxuICB0eXBlb2YgYXJnLnJvbGVfYXJuID09PSBcInN0cmluZ1wiICYmXG4gIFtcInVuZGVmaW5lZFwiLCBcInN0cmluZ1wiXS5pbmRleE9mKHR5cGVvZiBhcmcucm9sZV9zZXNzaW9uX25hbWUpID4gLTE7XG5cbmludGVyZmFjZSBBc3N1bWVSb2xlV2l0aFNvdXJjZVByb2ZpbGUgZXh0ZW5kcyBQcm9maWxlIHtcbiAgcm9sZV9hcm46IHN0cmluZztcbiAgc291cmNlX3Byb2ZpbGU6IHN0cmluZztcbn1cblxuaW50ZXJmYWNlIEFzc3VtZVJvbGVXaXRoUHJvdmlkZXJQcm9maWxlIGV4dGVuZHMgUHJvZmlsZSB7XG4gIHJvbGVfYXJuOiBzdHJpbmc7XG4gIGNyZWRlbnRpYWxfc291cmNlOiBzdHJpbmc7XG59XG5cbmNvbnN0IGlzQXNzdW1lUm9sZVByb2ZpbGUgPSAoYXJnOiBhbnkpID0+XG4gIEJvb2xlYW4oYXJnKSAmJlxuICB0eXBlb2YgYXJnID09PSBcIm9iamVjdFwiICYmXG4gIHR5cGVvZiBhcmcucm9sZV9hcm4gPT09IFwic3RyaW5nXCIgJiZcbiAgW1widW5kZWZpbmVkXCIsIFwic3RyaW5nXCJdLmluZGV4T2YodHlwZW9mIGFyZy5yb2xlX3Nlc3Npb25fbmFtZSkgPiAtMSAmJlxuICBbXCJ1bmRlZmluZWRcIiwgXCJzdHJpbmdcIl0uaW5kZXhPZih0eXBlb2YgYXJnLmV4dGVybmFsX2lkKSA+IC0xICYmXG4gIFtcInVuZGVmaW5lZFwiLCBcInN0cmluZ1wiXS5pbmRleE9mKHR5cGVvZiBhcmcubWZhX3NlcmlhbCkgPiAtMTtcblxuY29uc3QgaXNBc3N1bWVSb2xlV2l0aFNvdXJjZVByb2ZpbGUgPSAoYXJnOiBhbnkpOiBhcmcgaXMgQXNzdW1lUm9sZVdpdGhTb3VyY2VQcm9maWxlID0+XG4gIGlzQXNzdW1lUm9sZVByb2ZpbGUoYXJnKSAmJiB0eXBlb2YgYXJnLnNvdXJjZV9wcm9maWxlID09PSBcInN0cmluZ1wiICYmIHR5cGVvZiBhcmcuY3JlZGVudGlhbF9zb3VyY2UgPT09IFwidW5kZWZpbmVkXCI7XG5cbmNvbnN0IGlzQXNzdW1lUm9sZVdpdGhQcm92aWRlclByb2ZpbGUgPSAoYXJnOiBhbnkpOiBhcmcgaXMgQXNzdW1lUm9sZVdpdGhQcm92aWRlclByb2ZpbGUgPT5cbiAgaXNBc3N1bWVSb2xlUHJvZmlsZShhcmcpICYmIHR5cGVvZiBhcmcuY3JlZGVudGlhbF9zb3VyY2UgPT09IFwic3RyaW5nXCIgJiYgdHlwZW9mIGFyZy5zb3VyY2VfcHJvZmlsZSA9PT0gXCJ1bmRlZmluZWRcIjtcblxuLyoqXG4gKiBDcmVhdGVzIGEgY3JlZGVudGlhbCBwcm92aWRlciB0aGF0IHdpbGwgcmVhZCBmcm9tIGluaSBmaWxlcyBhbmQgc3VwcG9ydHNcbiAqIHJvbGUgYXNzdW1wdGlvbiBhbmQgbXVsdGktZmFjdG9yIGF1dGhlbnRpY2F0aW9uLlxuICovXG5leHBvcnQgY29uc3QgZnJvbUluaSA9IChpbml0OiBGcm9tSW5pSW5pdCA9IHt9KTogQ3JlZGVudGlhbFByb3ZpZGVyID0+IGFzeW5jICgpID0+IHtcbiAgY29uc3QgcHJvZmlsZXMgPSBhd2FpdCBwYXJzZUtub3duRmlsZXMoaW5pdCk7XG4gIHJldHVybiByZXNvbHZlUHJvZmlsZURhdGEoZ2V0TWFzdGVyUHJvZmlsZU5hbWUoaW5pdCksIHByb2ZpbGVzLCBpbml0KTtcbn07XG5cbi8qKlxuICogTG9hZCBwcm9maWxlcyBmcm9tIGNyZWRlbnRpYWxzIGFuZCBjb25maWcgSU5JIGZpbGVzIGFuZCBub3JtYWxpemUgdGhlbSBpbnRvIGFcbiAqIHNpbmdsZSBwcm9maWxlIGxpc3QuXG4gKlxuICogQGludGVybmFsXG4gKi9cbmV4cG9ydCBjb25zdCBwYXJzZUtub3duRmlsZXMgPSBhc3luYyAoaW5pdDogU291cmNlUHJvZmlsZUluaXQpOiBQcm9taXNlPFBhcnNlZEluaURhdGE+ID0+IHtcbiAgY29uc3QgeyBsb2FkZWRDb25maWcgPSBsb2FkU2hhcmVkQ29uZmlnRmlsZXMoaW5pdCkgfSA9IGluaXQ7XG5cbiAgY29uc3QgcGFyc2VkRmlsZXMgPSBhd2FpdCBsb2FkZWRDb25maWc7XG4gIHJldHVybiB7XG4gICAgLi4ucGFyc2VkRmlsZXMuY29uZmlnRmlsZSxcbiAgICAuLi5wYXJzZWRGaWxlcy5jcmVkZW50aWFsc0ZpbGUsXG4gIH07XG59O1xuXG4vKipcbiAqIEBpbnRlcm5hbFxuICovXG5leHBvcnQgY29uc3QgZ2V0TWFzdGVyUHJvZmlsZU5hbWUgPSAoaW5pdDogeyBwcm9maWxlPzogc3RyaW5nIH0pOiBzdHJpbmcgPT5cbiAgaW5pdC5wcm9maWxlIHx8IHByb2Nlc3MuZW52W0VOVl9QUk9GSUxFXSB8fCBERUZBVUxUX1BST0ZJTEU7XG5cbmNvbnN0IHJlc29sdmVQcm9maWxlRGF0YSA9IGFzeW5jIChcbiAgcHJvZmlsZU5hbWU6IHN0cmluZyxcbiAgcHJvZmlsZXM6IFBhcnNlZEluaURhdGEsXG4gIG9wdGlvbnM6IEZyb21JbmlJbml0LFxuICB2aXNpdGVkUHJvZmlsZXM6IHsgW3Byb2ZpbGVOYW1lOiBzdHJpbmddOiB0cnVlIH0gPSB7fVxuKTogUHJvbWlzZTxDcmVkZW50aWFscz4gPT4ge1xuICBjb25zdCBkYXRhID0gcHJvZmlsZXNbcHJvZmlsZU5hbWVdO1xuXG4gIC8vIElmIHRoaXMgaXMgbm90IHRoZSBmaXJzdCBwcm9maWxlIHZpc2l0ZWQsIHN0YXRpYyBjcmVkZW50aWFscyBzaG91bGQgYmVcbiAgLy8gcHJlZmVycmVkIG92ZXIgcm9sZSBhc3N1bXB0aW9uIG1ldGFkYXRhLiBUaGlzIHNwZWNpYWwgdHJlYXRtZW50IG9mXG4gIC8vIHNlY29uZCBhbmQgc3Vic2VxdWVudCBob3BzIGlzIHRvIGVuc3VyZSBjb21wYXRpYmlsaXR5IHdpdGggdGhlIEFXUyBDTEkuXG4gIGlmIChPYmplY3Qua2V5cyh2aXNpdGVkUHJvZmlsZXMpLmxlbmd0aCA+IDAgJiYgaXNTdGF0aWNDcmVkc1Byb2ZpbGUoZGF0YSkpIHtcbiAgICByZXR1cm4gcmVzb2x2ZVN0YXRpY0NyZWRlbnRpYWxzKGRhdGEpO1xuICB9XG5cbiAgLy8gSWYgdGhpcyBpcyB0aGUgZmlyc3QgcHJvZmlsZSB2aXNpdGVkLCByb2xlIGFzc3VtcHRpb24ga2V5cyBzaG91bGQgYmVcbiAgLy8gZ2l2ZW4gcHJlY2VkZW5jZSBvdmVyIHN0YXRpYyBjcmVkZW50aWFscy5cbiAgaWYgKGlzQXNzdW1lUm9sZVdpdGhTb3VyY2VQcm9maWxlKGRhdGEpIHx8IGlzQXNzdW1lUm9sZVdpdGhQcm92aWRlclByb2ZpbGUoZGF0YSkpIHtcbiAgICBjb25zdCB7XG4gICAgICBleHRlcm5hbF9pZDogRXh0ZXJuYWxJZCxcbiAgICAgIG1mYV9zZXJpYWwsXG4gICAgICByb2xlX2FybjogUm9sZUFybixcbiAgICAgIHJvbGVfc2Vzc2lvbl9uYW1lOiBSb2xlU2Vzc2lvbk5hbWUgPSBcImF3cy1zZGstanMtXCIgKyBEYXRlLm5vdygpLFxuICAgICAgc291cmNlX3Byb2ZpbGUsXG4gICAgICBjcmVkZW50aWFsX3NvdXJjZSxcbiAgICB9ID0gZGF0YTtcblxuICAgIGlmICghb3B0aW9ucy5yb2xlQXNzdW1lcikge1xuICAgICAgdGhyb3cgbmV3IFByb3ZpZGVyRXJyb3IoXG4gICAgICAgIGBQcm9maWxlICR7cHJvZmlsZU5hbWV9IHJlcXVpcmVzIGEgcm9sZSB0byBiZSBhc3N1bWVkLCBidXQgbm9gICsgYCByb2xlIGFzc3VtcHRpb24gY2FsbGJhY2sgd2FzIHByb3ZpZGVkLmAsXG4gICAgICAgIGZhbHNlXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChzb3VyY2VfcHJvZmlsZSAmJiBzb3VyY2VfcHJvZmlsZSBpbiB2aXNpdGVkUHJvZmlsZXMpIHtcbiAgICAgIHRocm93IG5ldyBQcm92aWRlckVycm9yKFxuICAgICAgICBgRGV0ZWN0ZWQgYSBjeWNsZSBhdHRlbXB0aW5nIHRvIHJlc29sdmUgY3JlZGVudGlhbHMgZm9yIHByb2ZpbGVgICtcbiAgICAgICAgICBgICR7Z2V0TWFzdGVyUHJvZmlsZU5hbWUob3B0aW9ucyl9LiBQcm9maWxlcyB2aXNpdGVkOiBgICtcbiAgICAgICAgICBPYmplY3Qua2V5cyh2aXNpdGVkUHJvZmlsZXMpLmpvaW4oXCIsIFwiKSxcbiAgICAgICAgZmFsc2VcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3Qgc291cmNlQ3JlZHMgPSBzb3VyY2VfcHJvZmlsZVxuICAgICAgPyByZXNvbHZlUHJvZmlsZURhdGEoc291cmNlX3Byb2ZpbGUsIHByb2ZpbGVzLCBvcHRpb25zLCB7XG4gICAgICAgICAgLi4udmlzaXRlZFByb2ZpbGVzLFxuICAgICAgICAgIFtzb3VyY2VfcHJvZmlsZV06IHRydWUsXG4gICAgICAgIH0pXG4gICAgICA6IHJlc29sdmVDcmVkZW50aWFsU291cmNlKGNyZWRlbnRpYWxfc291cmNlISwgcHJvZmlsZU5hbWUpKCk7XG5cbiAgICBjb25zdCBwYXJhbXM6IEFzc3VtZVJvbGVQYXJhbXMgPSB7IFJvbGVBcm4sIFJvbGVTZXNzaW9uTmFtZSwgRXh0ZXJuYWxJZCB9O1xuICAgIGlmIChtZmFfc2VyaWFsKSB7XG4gICAgICBpZiAoIW9wdGlvbnMubWZhQ29kZVByb3ZpZGVyKSB7XG4gICAgICAgIHRocm93IG5ldyBQcm92aWRlckVycm9yKFxuICAgICAgICAgIGBQcm9maWxlICR7cHJvZmlsZU5hbWV9IHJlcXVpcmVzIG11bHRpLWZhY3RvciBhdXRoZW50aWNhdGlvbixgICsgYCBidXQgbm8gTUZBIGNvZGUgY2FsbGJhY2sgd2FzIHByb3ZpZGVkLmAsXG4gICAgICAgICAgZmFsc2VcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHBhcmFtcy5TZXJpYWxOdW1iZXIgPSBtZmFfc2VyaWFsO1xuICAgICAgcGFyYW1zLlRva2VuQ29kZSA9IGF3YWl0IG9wdGlvbnMubWZhQ29kZVByb3ZpZGVyKG1mYV9zZXJpYWwpO1xuICAgIH1cblxuICAgIHJldHVybiBvcHRpb25zLnJvbGVBc3N1bWVyKGF3YWl0IHNvdXJjZUNyZWRzLCBwYXJhbXMpO1xuICB9XG5cbiAgLy8gSWYgbm8gcm9sZSBhc3N1bXB0aW9uIG1ldGFkYXRhIGlzIHByZXNlbnQsIGF0dGVtcHQgdG8gbG9hZCBzdGF0aWNcbiAgLy8gY3JlZGVudGlhbHMgZnJvbSB0aGUgc2VsZWN0ZWQgcHJvZmlsZS5cbiAgaWYgKGlzU3RhdGljQ3JlZHNQcm9maWxlKGRhdGEpKSB7XG4gICAgcmV0dXJuIHJlc29sdmVTdGF0aWNDcmVkZW50aWFscyhkYXRhKTtcbiAgfVxuXG4gIC8vIElmIG5vIHN0YXRpYyBjcmVkZW50aWFscyBhcmUgcHJlc2VudCwgYXR0ZW1wdCB0byBhc3N1bWUgcm9sZSB3aXRoXG4gIC8vIHdlYiBpZGVudGl0eSBpZiB3ZWJfaWRlbnRpdHlfdG9rZW5fZmlsZSBhbmQgcm9sZV9hcm4gaXMgYXZhaWxhYmxlXG4gIGlmIChpc1dlYklkZW50aXR5UHJvZmlsZShkYXRhKSkge1xuICAgIHJldHVybiByZXNvbHZlV2ViSWRlbnRpdHlDcmVkZW50aWFscyhkYXRhLCBvcHRpb25zKTtcbiAgfVxuXG4gIC8vIElmIHRoZSBwcm9maWxlIGNhbm5vdCBiZSBwYXJzZWQgb3IgY29udGFpbnMgbmVpdGhlciBzdGF0aWMgY3JlZGVudGlhbHNcbiAgLy8gbm9yIHJvbGUgYXNzdW1wdGlvbiBtZXRhZGF0YSwgdGhyb3cgYW4gZXJyb3IuIFRoaXMgc2hvdWxkIGJlIGNvbnNpZGVyZWQgYVxuICAvLyB0ZXJtaW5hbCByZXNvbHV0aW9uIGVycm9yIGlmIGEgcHJvZmlsZSBoYXMgYmVlbiBzcGVjaWZpZWQgYnkgdGhlIHVzZXJcbiAgLy8gKHdoZXRoZXIgdmlhIGEgcGFyYW1ldGVyLCBhbiBlbnZpcm9ubWVudCB2YXJpYWJsZSwgb3IgYW5vdGhlciBwcm9maWxlJ3NcbiAgLy8gYHNvdXJjZV9wcm9maWxlYCBrZXkpLlxuICB0aHJvdyBuZXcgUHJvdmlkZXJFcnJvcihgUHJvZmlsZSAke3Byb2ZpbGVOYW1lfSBjb3VsZCBub3QgYmUgZm91bmQgb3IgcGFyc2VkIGluIHNoYXJlZGAgKyBgIGNyZWRlbnRpYWxzIGZpbGUuYCk7XG59O1xuXG4vKipcbiAqIFJlc29sdmUgdGhlIGBjcmVkZW50aWFsX3NvdXJjZWAgZW50cnkgZnJvbSB0aGUgcHJvZmlsZSwgYW5kIHJldHVybiB0aGVcbiAqIGNyZWRlbnRpYWwgcHJvdmlkZXJzIHJlc3BlY3RpdmVseS4gTm8gbWVtb2l6YXRpb24gaXMgbmVlZGVkIGZvciB0aGVcbiAqIGNyZWRlbnRpYWwgc291cmNlIHByb3ZpZGVycyBiZWNhdXNlIG1lbW9pemF0aW9uIHNob3VsZCBiZSBhZGRlZCBvdXRzaWRlIHRoZVxuICogZnJvbUluaSgpIHByb3ZpZGVyLiBUaGUgc291cmNlIGNyZWRlbnRpYWwgbmVlZHMgdG8gYmUgcmVmcmVzaGVkIGV2ZXJ5IHRpbWVcbiAqIGZyb21JbmkoKSBpcyBjYWxsZWQuXG4gKi9cbmNvbnN0IHJlc29sdmVDcmVkZW50aWFsU291cmNlID0gKGNyZWRlbnRpYWxTb3VyY2U6IHN0cmluZywgcHJvZmlsZU5hbWU6IHN0cmluZyk6IENyZWRlbnRpYWxQcm92aWRlciA9PiB7XG4gIGNvbnN0IHNvdXJjZVByb3ZpZGVyc01hcDogeyBbbmFtZTogc3RyaW5nXTogKCkgPT4gQ3JlZGVudGlhbFByb3ZpZGVyIH0gPSB7XG4gICAgRWNzQ29udGFpbmVyOiBmcm9tQ29udGFpbmVyTWV0YWRhdGEsXG4gICAgRWMySW5zdGFuY2VNZXRhZGF0YTogZnJvbUluc3RhbmNlTWV0YWRhdGEsXG4gICAgRW52aXJvbm1lbnQ6IGZyb21FbnYsXG4gIH07XG4gIGlmIChjcmVkZW50aWFsU291cmNlIGluIHNvdXJjZVByb3ZpZGVyc01hcCkge1xuICAgIHJldHVybiBzb3VyY2VQcm92aWRlcnNNYXBbY3JlZGVudGlhbFNvdXJjZV0oKTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgUHJvdmlkZXJFcnJvcihcbiAgICAgIGBVbnN1cHBvcnRlZCBjcmVkZW50aWFsIHNvdXJjZSBpbiBwcm9maWxlICR7cHJvZmlsZU5hbWV9LiBHb3QgJHtjcmVkZW50aWFsU291cmNlfSwgYCArXG4gICAgICAgIGBleHBlY3RlZCBFY3NDb250YWluZXIgb3IgRWMySW5zdGFuY2VNZXRhZGF0YSBvciBFbnZpcm9ubWVudC5gXG4gICAgKTtcbiAgfVxufTtcblxuY29uc3QgcmVzb2x2ZVN0YXRpY0NyZWRlbnRpYWxzID0gKHByb2ZpbGU6IFN0YXRpY0NyZWRzUHJvZmlsZSk6IFByb21pc2U8Q3JlZGVudGlhbHM+ID0+XG4gIFByb21pc2UucmVzb2x2ZSh7XG4gICAgYWNjZXNzS2V5SWQ6IHByb2ZpbGUuYXdzX2FjY2Vzc19rZXlfaWQsXG4gICAgc2VjcmV0QWNjZXNzS2V5OiBwcm9maWxlLmF3c19zZWNyZXRfYWNjZXNzX2tleSxcbiAgICBzZXNzaW9uVG9rZW46IHByb2ZpbGUuYXdzX3Nlc3Npb25fdG9rZW4sXG4gIH0pO1xuXG5jb25zdCByZXNvbHZlV2ViSWRlbnRpdHlDcmVkZW50aWFscyA9IGFzeW5jIChwcm9maWxlOiBXZWJJZGVudGl0eVByb2ZpbGUsIG9wdGlvbnM6IEZyb21JbmlJbml0KTogUHJvbWlzZTxDcmVkZW50aWFscz4gPT5cbiAgZnJvbVRva2VuRmlsZSh7XG4gICAgd2ViSWRlbnRpdHlUb2tlbkZpbGU6IHByb2ZpbGUud2ViX2lkZW50aXR5X3Rva2VuX2ZpbGUsXG4gICAgcm9sZUFybjogcHJvZmlsZS5yb2xlX2FybixcbiAgICByb2xlU2Vzc2lvbk5hbWU6IHByb2ZpbGUucm9sZV9zZXNzaW9uX25hbWUsXG4gICAgcm9sZUFzc3VtZXJXaXRoV2ViSWRlbnRpdHk6IG9wdGlvbnMucm9sZUFzc3VtZXJXaXRoV2ViSWRlbnRpdHksXG4gIH0pKCk7XG4iXX0=