import { __assign, __awaiter, __generator } from "tslib";
import { ProviderError } from "@aws-sdk/property-provider";
import { parse } from "url";
import { httpRequest } from "./remoteProvider/httpRequest";
import { fromImdsCredentials, isImdsCredentials } from "./remoteProvider/ImdsCredentials";
import { providerConfigFromInit } from "./remoteProvider/RemoteProviderInit";
import { retry } from "./remoteProvider/retry";
export var ENV_CMDS_FULL_URI = "AWS_CONTAINER_CREDENTIALS_FULL_URI";
export var ENV_CMDS_RELATIVE_URI = "AWS_CONTAINER_CREDENTIALS_RELATIVE_URI";
export var ENV_CMDS_AUTH_TOKEN = "AWS_CONTAINER_AUTHORIZATION_TOKEN";
/**
 * Creates a credential provider that will source credentials from the ECS
 * Container Metadata Service
 */
export var fromContainerMetadata = function (init) {
    if (init === void 0) { init = {}; }
    var _a = providerConfigFromInit(init), timeout = _a.timeout, maxRetries = _a.maxRetries;
    return function () {
        return retry(function () { return __awaiter(void 0, void 0, void 0, function () {
            var requestOptions, credsResponse, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, getCmdsUri()];
                    case 1:
                        requestOptions = _c.sent();
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, requestFromEcsImds(timeout, requestOptions)];
                    case 2:
                        credsResponse = _b.apply(_a, [_c.sent()]);
                        if (!isImdsCredentials(credsResponse)) {
                            throw new ProviderError("Invalid response received from instance metadata service.");
                        }
                        return [2 /*return*/, fromImdsCredentials(credsResponse)];
                }
            });
        }); }, maxRetries);
    };
};
var requestFromEcsImds = function (timeout, options) { return __awaiter(void 0, void 0, void 0, function () {
    var buffer;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (process.env[ENV_CMDS_AUTH_TOKEN]) {
                    options.headers = __assign(__assign({}, options.headers), { Authorization: process.env[ENV_CMDS_AUTH_TOKEN] });
                }
                return [4 /*yield*/, httpRequest(__assign(__assign({}, options), { timeout: timeout }))];
            case 1:
                buffer = _a.sent();
                return [2 /*return*/, buffer.toString()];
        }
    });
}); };
var CMDS_IP = "169.254.170.2";
var GREENGRASS_HOSTS = {
    localhost: true,
    "127.0.0.1": true,
};
var GREENGRASS_PROTOCOLS = {
    "http:": true,
    "https:": true,
};
var getCmdsUri = function () { return __awaiter(void 0, void 0, void 0, function () {
    var parsed;
    return __generator(this, function (_a) {
        if (process.env[ENV_CMDS_RELATIVE_URI]) {
            return [2 /*return*/, {
                    hostname: CMDS_IP,
                    path: process.env[ENV_CMDS_RELATIVE_URI],
                }];
        }
        if (process.env[ENV_CMDS_FULL_URI]) {
            parsed = parse(process.env[ENV_CMDS_FULL_URI]);
            if (!parsed.hostname || !(parsed.hostname in GREENGRASS_HOSTS)) {
                throw new ProviderError(parsed.hostname + " is not a valid container metadata service hostname", false);
            }
            if (!parsed.protocol || !(parsed.protocol in GREENGRASS_PROTOCOLS)) {
                throw new ProviderError(parsed.protocol + " is not a valid container metadata service protocol", false);
            }
            return [2 /*return*/, __assign(__assign({}, parsed), { port: parsed.port ? parseInt(parsed.port, 10) : undefined })];
        }
        throw new ProviderError("The container metadata credential provider cannot be used unless" +
            (" the " + ENV_CMDS_RELATIVE_URI + " or " + ENV_CMDS_FULL_URI + " environment") +
            " variable is set", false);
    });
}); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnJvbUNvbnRhaW5lck1ldGFkYXRhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL2Zyb21Db250YWluZXJNZXRhZGF0YS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRzNELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFFNUIsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQzNELE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBQzFGLE9BQU8sRUFBRSxzQkFBc0IsRUFBc0IsTUFBTSxxQ0FBcUMsQ0FBQztBQUNqRyxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFFL0MsTUFBTSxDQUFDLElBQU0saUJBQWlCLEdBQUcsb0NBQW9DLENBQUM7QUFDdEUsTUFBTSxDQUFDLElBQU0scUJBQXFCLEdBQUcsd0NBQXdDLENBQUM7QUFDOUUsTUFBTSxDQUFDLElBQU0sbUJBQW1CLEdBQUcsbUNBQW1DLENBQUM7QUFFdkU7OztHQUdHO0FBQ0gsTUFBTSxDQUFDLElBQU0scUJBQXFCLEdBQUcsVUFBQyxJQUE2QjtJQUE3QixxQkFBQSxFQUFBLFNBQTZCO0lBQzNELElBQUEsS0FBMEIsc0JBQXNCLENBQUMsSUFBSSxDQUFDLEVBQXBELE9BQU8sYUFBQSxFQUFFLFVBQVUsZ0JBQWlDLENBQUM7SUFDN0QsT0FBTztRQUNMLE9BQUEsS0FBSyxDQUFDOzs7OzRCQUNtQixxQkFBTSxVQUFVLEVBQUUsRUFBQTs7d0JBQW5DLGNBQWMsR0FBRyxTQUFrQjt3QkFDbkIsS0FBQSxDQUFBLEtBQUEsSUFBSSxDQUFBLENBQUMsS0FBSyxDQUFBO3dCQUFDLHFCQUFNLGtCQUFrQixDQUFDLE9BQU8sRUFBRSxjQUFjLENBQUMsRUFBQTs7d0JBQTVFLGFBQWEsR0FBRyxjQUFXLFNBQWlELEVBQUM7d0JBQ25GLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsRUFBRTs0QkFDckMsTUFBTSxJQUFJLGFBQWEsQ0FBQywyREFBMkQsQ0FBQyxDQUFDO3lCQUN0Rjt3QkFDRCxzQkFBTyxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsRUFBQzs7O2FBQzNDLEVBQUUsVUFBVSxDQUFDO0lBUGQsQ0FPYyxDQUFDO0FBQ25CLENBQUMsQ0FBQztBQUVGLElBQU0sa0JBQWtCLEdBQUcsVUFBTyxPQUFlLEVBQUUsT0FBdUI7Ozs7O2dCQUN4RSxJQUFJLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsRUFBRTtvQkFDcEMsT0FBTyxDQUFDLE9BQU8seUJBQ1YsT0FBTyxDQUFDLE9BQU8sS0FDbEIsYUFBYSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsR0FDaEQsQ0FBQztpQkFDSDtnQkFFYyxxQkFBTSxXQUFXLHVCQUMzQixPQUFPLEtBQ1YsT0FBTyxTQUFBLElBQ1AsRUFBQTs7Z0JBSEksTUFBTSxHQUFHLFNBR2I7Z0JBQ0Ysc0JBQU8sTUFBTSxDQUFDLFFBQVEsRUFBRSxFQUFDOzs7S0FDMUIsQ0FBQztBQUVGLElBQU0sT0FBTyxHQUFHLGVBQWUsQ0FBQztBQUNoQyxJQUFNLGdCQUFnQixHQUFHO0lBQ3ZCLFNBQVMsRUFBRSxJQUFJO0lBQ2YsV0FBVyxFQUFFLElBQUk7Q0FDbEIsQ0FBQztBQUNGLElBQU0sb0JBQW9CLEdBQUc7SUFDM0IsT0FBTyxFQUFFLElBQUk7SUFDYixRQUFRLEVBQUUsSUFBSTtDQUNmLENBQUM7QUFFRixJQUFNLFVBQVUsR0FBRzs7O1FBQ2pCLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQyxFQUFFO1lBQ3RDLHNCQUFPO29CQUNMLFFBQVEsRUFBRSxPQUFPO29CQUNqQixJQUFJLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQztpQkFDekMsRUFBQztTQUNIO1FBRUQsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDLEVBQUU7WUFDNUIsTUFBTSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFFLENBQUMsQ0FBQztZQUN0RCxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLFFBQVEsSUFBSSxnQkFBZ0IsQ0FBQyxFQUFFO2dCQUM5RCxNQUFNLElBQUksYUFBYSxDQUFJLE1BQU0sQ0FBQyxRQUFRLHdEQUFxRCxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ3pHO1lBRUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLElBQUksQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLElBQUksb0JBQW9CLENBQUMsRUFBRTtnQkFDbEUsTUFBTSxJQUFJLGFBQWEsQ0FBSSxNQUFNLENBQUMsUUFBUSx3REFBcUQsRUFBRSxLQUFLLENBQUMsQ0FBQzthQUN6RztZQUVELDRDQUNLLE1BQU0sS0FDVCxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsS0FDekQ7U0FDSDtRQUVELE1BQU0sSUFBSSxhQUFhLENBQ3JCLGtFQUFrRTthQUNoRSxVQUFRLHFCQUFxQixZQUFPLGlCQUFpQixpQkFBYyxDQUFBO1lBQ25FLGtCQUFrQixFQUNwQixLQUFLLENBQ04sQ0FBQzs7S0FDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgUHJvdmlkZXJFcnJvciB9IGZyb20gXCJAYXdzLXNkay9wcm9wZXJ0eS1wcm92aWRlclwiO1xuaW1wb3J0IHsgQ3JlZGVudGlhbFByb3ZpZGVyIH0gZnJvbSBcIkBhd3Mtc2RrL3R5cGVzXCI7XG5pbXBvcnQgeyBSZXF1ZXN0T3B0aW9ucyB9IGZyb20gXCJodHRwXCI7XG5pbXBvcnQgeyBwYXJzZSB9IGZyb20gXCJ1cmxcIjtcblxuaW1wb3J0IHsgaHR0cFJlcXVlc3QgfSBmcm9tIFwiLi9yZW1vdGVQcm92aWRlci9odHRwUmVxdWVzdFwiO1xuaW1wb3J0IHsgZnJvbUltZHNDcmVkZW50aWFscywgaXNJbWRzQ3JlZGVudGlhbHMgfSBmcm9tIFwiLi9yZW1vdGVQcm92aWRlci9JbWRzQ3JlZGVudGlhbHNcIjtcbmltcG9ydCB7IHByb3ZpZGVyQ29uZmlnRnJvbUluaXQsIFJlbW90ZVByb3ZpZGVySW5pdCB9IGZyb20gXCIuL3JlbW90ZVByb3ZpZGVyL1JlbW90ZVByb3ZpZGVySW5pdFwiO1xuaW1wb3J0IHsgcmV0cnkgfSBmcm9tIFwiLi9yZW1vdGVQcm92aWRlci9yZXRyeVwiO1xuXG5leHBvcnQgY29uc3QgRU5WX0NNRFNfRlVMTF9VUkkgPSBcIkFXU19DT05UQUlORVJfQ1JFREVOVElBTFNfRlVMTF9VUklcIjtcbmV4cG9ydCBjb25zdCBFTlZfQ01EU19SRUxBVElWRV9VUkkgPSBcIkFXU19DT05UQUlORVJfQ1JFREVOVElBTFNfUkVMQVRJVkVfVVJJXCI7XG5leHBvcnQgY29uc3QgRU5WX0NNRFNfQVVUSF9UT0tFTiA9IFwiQVdTX0NPTlRBSU5FUl9BVVRIT1JJWkFUSU9OX1RPS0VOXCI7XG5cbi8qKlxuICogQ3JlYXRlcyBhIGNyZWRlbnRpYWwgcHJvdmlkZXIgdGhhdCB3aWxsIHNvdXJjZSBjcmVkZW50aWFscyBmcm9tIHRoZSBFQ1NcbiAqIENvbnRhaW5lciBNZXRhZGF0YSBTZXJ2aWNlXG4gKi9cbmV4cG9ydCBjb25zdCBmcm9tQ29udGFpbmVyTWV0YWRhdGEgPSAoaW5pdDogUmVtb3RlUHJvdmlkZXJJbml0ID0ge30pOiBDcmVkZW50aWFsUHJvdmlkZXIgPT4ge1xuICBjb25zdCB7IHRpbWVvdXQsIG1heFJldHJpZXMgfSA9IHByb3ZpZGVyQ29uZmlnRnJvbUluaXQoaW5pdCk7XG4gIHJldHVybiAoKSA9PlxuICAgIHJldHJ5KGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHJlcXVlc3RPcHRpb25zID0gYXdhaXQgZ2V0Q21kc1VyaSgpO1xuICAgICAgY29uc3QgY3JlZHNSZXNwb25zZSA9IEpTT04ucGFyc2UoYXdhaXQgcmVxdWVzdEZyb21FY3NJbWRzKHRpbWVvdXQsIHJlcXVlc3RPcHRpb25zKSk7XG4gICAgICBpZiAoIWlzSW1kc0NyZWRlbnRpYWxzKGNyZWRzUmVzcG9uc2UpKSB7XG4gICAgICAgIHRocm93IG5ldyBQcm92aWRlckVycm9yKFwiSW52YWxpZCByZXNwb25zZSByZWNlaXZlZCBmcm9tIGluc3RhbmNlIG1ldGFkYXRhIHNlcnZpY2UuXCIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGZyb21JbWRzQ3JlZGVudGlhbHMoY3JlZHNSZXNwb25zZSk7XG4gICAgfSwgbWF4UmV0cmllcyk7XG59O1xuXG5jb25zdCByZXF1ZXN0RnJvbUVjc0ltZHMgPSBhc3luYyAodGltZW91dDogbnVtYmVyLCBvcHRpb25zOiBSZXF1ZXN0T3B0aW9ucyk6IFByb21pc2U8c3RyaW5nPiA9PiB7XG4gIGlmIChwcm9jZXNzLmVudltFTlZfQ01EU19BVVRIX1RPS0VOXSkge1xuICAgIG9wdGlvbnMuaGVhZGVycyA9IHtcbiAgICAgIC4uLm9wdGlvbnMuaGVhZGVycyxcbiAgICAgIEF1dGhvcml6YXRpb246IHByb2Nlc3MuZW52W0VOVl9DTURTX0FVVEhfVE9LRU5dLFxuICAgIH07XG4gIH1cblxuICBjb25zdCBidWZmZXIgPSBhd2FpdCBodHRwUmVxdWVzdCh7XG4gICAgLi4ub3B0aW9ucyxcbiAgICB0aW1lb3V0LFxuICB9KTtcbiAgcmV0dXJuIGJ1ZmZlci50b1N0cmluZygpO1xufTtcblxuY29uc3QgQ01EU19JUCA9IFwiMTY5LjI1NC4xNzAuMlwiO1xuY29uc3QgR1JFRU5HUkFTU19IT1NUUyA9IHtcbiAgbG9jYWxob3N0OiB0cnVlLFxuICBcIjEyNy4wLjAuMVwiOiB0cnVlLFxufTtcbmNvbnN0IEdSRUVOR1JBU1NfUFJPVE9DT0xTID0ge1xuICBcImh0dHA6XCI6IHRydWUsXG4gIFwiaHR0cHM6XCI6IHRydWUsXG59O1xuXG5jb25zdCBnZXRDbWRzVXJpID0gYXN5bmMgKCk6IFByb21pc2U8UmVxdWVzdE9wdGlvbnM+ID0+IHtcbiAgaWYgKHByb2Nlc3MuZW52W0VOVl9DTURTX1JFTEFUSVZFX1VSSV0pIHtcbiAgICByZXR1cm4ge1xuICAgICAgaG9zdG5hbWU6IENNRFNfSVAsXG4gICAgICBwYXRoOiBwcm9jZXNzLmVudltFTlZfQ01EU19SRUxBVElWRV9VUkldLFxuICAgIH07XG4gIH1cblxuICBpZiAocHJvY2Vzcy5lbnZbRU5WX0NNRFNfRlVMTF9VUkldKSB7XG4gICAgY29uc3QgcGFyc2VkID0gcGFyc2UocHJvY2Vzcy5lbnZbRU5WX0NNRFNfRlVMTF9VUkldISk7XG4gICAgaWYgKCFwYXJzZWQuaG9zdG5hbWUgfHwgIShwYXJzZWQuaG9zdG5hbWUgaW4gR1JFRU5HUkFTU19IT1NUUykpIHtcbiAgICAgIHRocm93IG5ldyBQcm92aWRlckVycm9yKGAke3BhcnNlZC5ob3N0bmFtZX0gaXMgbm90IGEgdmFsaWQgY29udGFpbmVyIG1ldGFkYXRhIHNlcnZpY2UgaG9zdG5hbWVgLCBmYWxzZSk7XG4gICAgfVxuXG4gICAgaWYgKCFwYXJzZWQucHJvdG9jb2wgfHwgIShwYXJzZWQucHJvdG9jb2wgaW4gR1JFRU5HUkFTU19QUk9UT0NPTFMpKSB7XG4gICAgICB0aHJvdyBuZXcgUHJvdmlkZXJFcnJvcihgJHtwYXJzZWQucHJvdG9jb2x9IGlzIG5vdCBhIHZhbGlkIGNvbnRhaW5lciBtZXRhZGF0YSBzZXJ2aWNlIHByb3RvY29sYCwgZmFsc2UpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAuLi5wYXJzZWQsXG4gICAgICBwb3J0OiBwYXJzZWQucG9ydCA/IHBhcnNlSW50KHBhcnNlZC5wb3J0LCAxMCkgOiB1bmRlZmluZWQsXG4gICAgfTtcbiAgfVxuXG4gIHRocm93IG5ldyBQcm92aWRlckVycm9yKFxuICAgIFwiVGhlIGNvbnRhaW5lciBtZXRhZGF0YSBjcmVkZW50aWFsIHByb3ZpZGVyIGNhbm5vdCBiZSB1c2VkIHVubGVzc1wiICtcbiAgICAgIGAgdGhlICR7RU5WX0NNRFNfUkVMQVRJVkVfVVJJfSBvciAke0VOVl9DTURTX0ZVTExfVVJJfSBlbnZpcm9ubWVudGAgK1xuICAgICAgXCIgdmFyaWFibGUgaXMgc2V0XCIsXG4gICAgZmFsc2VcbiAgKTtcbn07XG4iXX0=