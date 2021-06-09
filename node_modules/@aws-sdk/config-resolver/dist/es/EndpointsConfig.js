import { __assign, __awaiter, __generator } from "tslib";
export var resolveEndpointsConfig = function (input) {
    var _a;
    return (__assign(__assign({}, input), { tls: (_a = input.tls) !== null && _a !== void 0 ? _a : true, endpoint: input.endpoint ? normalizeEndpoint(input) : function () { return getEndPointFromRegion(input); }, isCustomEndpoint: input.endpoint ? true : false }));
};
var normalizeEndpoint = function (input) {
    var endpoint = input.endpoint, urlParser = input.urlParser;
    if (typeof endpoint === "string") {
        var promisified_1 = Promise.resolve(urlParser(endpoint));
        return function () { return promisified_1; };
    }
    else if (typeof endpoint === "object") {
        var promisified_2 = Promise.resolve(endpoint);
        return function () { return promisified_2; };
    }
    return endpoint;
};
var getEndPointFromRegion = function (input) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, tls, region, dnsHostRegex, hostname;
    var _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _a = input.tls, tls = _a === void 0 ? true : _a;
                return [4 /*yield*/, input.region()];
            case 1:
                region = _c.sent();
                dnsHostRegex = new RegExp(/^([a-zA-Z0-9]|[a-zA-Z0-9][a-zA-Z0-9-]{0,61}[a-zA-Z0-9])$/);
                if (!dnsHostRegex.test(region)) {
                    throw new Error("Invalid region in client config");
                }
                return [4 /*yield*/, input.regionInfoProvider(region)];
            case 2:
                hostname = ((_b = (_c.sent())) !== null && _b !== void 0 ? _b : {}).hostname;
                if (!hostname) {
                    throw new Error("Cannot resolve hostname from client config");
                }
                return [2 /*return*/, input.urlParser((tls ? "https:" : "http:") + "//" + hostname)];
        }
    });
}); };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRW5kcG9pbnRzQ29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL0VuZHBvaW50c0NvbmZpZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBeUJBLE1BQU0sQ0FBQyxJQUFNLHNCQUFzQixHQUFHLFVBQ3BDLEtBQW9EOztJQUNwQixPQUFBLHVCQUM3QixLQUFLLEtBQ1IsR0FBRyxFQUFFLE1BQUEsS0FBSyxDQUFDLEdBQUcsbUNBQUksSUFBSSxFQUN0QixRQUFRLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLGNBQU0sT0FBQSxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsRUFBNUIsQ0FBNEIsRUFDeEYsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLElBQy9DLENBQUE7Q0FBQSxDQUFDO0FBRUgsSUFBTSxpQkFBaUIsR0FBRyxVQUFDLEtBQWdEO0lBQ2pFLElBQUEsUUFBUSxHQUFnQixLQUFLLFNBQXJCLEVBQUUsU0FBUyxHQUFLLEtBQUssVUFBVixDQUFXO0lBQ3RDLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxFQUFFO1FBQ2hDLElBQU0sYUFBVyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFDekQsT0FBTyxjQUFNLE9BQUEsYUFBVyxFQUFYLENBQVcsQ0FBQztLQUMxQjtTQUFNLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxFQUFFO1FBQ3ZDLElBQU0sYUFBVyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUMsT0FBTyxjQUFNLE9BQUEsYUFBVyxFQUFYLENBQVcsQ0FBQztLQUMxQjtJQUNELE9BQU8sUUFBUyxDQUFDO0FBQ25CLENBQUMsQ0FBQztBQUVGLElBQU0scUJBQXFCLEdBQUcsVUFBTyxLQUFnRDs7Ozs7O2dCQUMzRSxLQUFlLEtBQUssSUFBVixFQUFWLEdBQUcsbUJBQUcsSUFBSSxLQUFBLENBQVc7Z0JBQ2QscUJBQU0sS0FBSyxDQUFDLE1BQU0sRUFBRSxFQUFBOztnQkFBN0IsTUFBTSxHQUFHLFNBQW9CO2dCQUU3QixZQUFZLEdBQUcsSUFBSSxNQUFNLENBQUMsMERBQTBELENBQUMsQ0FBQztnQkFDNUYsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUU7b0JBQzlCLE1BQU0sSUFBSSxLQUFLLENBQUMsaUNBQWlDLENBQUMsQ0FBQztpQkFDcEQ7Z0JBRXFCLHFCQUFNLEtBQUssQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsRUFBQTs7Z0JBQXBELFFBQVEsR0FBSyxDQUFBLE1BQUEsQ0FBQyxTQUFzQyxDQUFDLG1DQUFJLEVBQUUsQ0FBQSxTQUFuRDtnQkFDaEIsSUFBSSxDQUFDLFFBQVEsRUFBRTtvQkFDYixNQUFNLElBQUksS0FBSyxDQUFDLDRDQUE0QyxDQUFDLENBQUM7aUJBQy9EO2dCQUVELHNCQUFPLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsT0FBTyxXQUFLLFFBQVUsQ0FBQyxFQUFDOzs7S0FDcEUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEVuZHBvaW50LCBQcm92aWRlciwgUmVnaW9uSW5mb1Byb3ZpZGVyLCBVcmxQYXJzZXIgfSBmcm9tIFwiQGF3cy1zZGsvdHlwZXNcIjtcblxuZXhwb3J0IGludGVyZmFjZSBFbmRwb2ludHNJbnB1dENvbmZpZyB7XG4gIC8qKlxuICAgKiBUaGUgZnVsbHkgcXVhbGlmaWVkIGVuZHBvaW50IG9mIHRoZSB3ZWJzZXJ2aWNlLiBUaGlzIGlzIG9ubHkgcmVxdWlyZWQgd2hlbiB1c2luZyBhIGN1c3RvbSBlbmRwb2ludCAoZm9yIGV4YW1wbGUsIHdoZW4gdXNpbmcgYSBsb2NhbCB2ZXJzaW9uIG9mIFMzKS5cbiAgICovXG4gIGVuZHBvaW50Pzogc3RyaW5nIHwgRW5kcG9pbnQgfCBQcm92aWRlcjxFbmRwb2ludD47XG5cbiAgLyoqXG4gICAqIFdoZXRoZXIgVExTIGlzIGVuYWJsZWQgZm9yIHJlcXVlc3RzLlxuICAgKi9cbiAgdGxzPzogYm9vbGVhbjtcbn1cblxuaW50ZXJmYWNlIFByZXZpb3VzbHlSZXNvbHZlZCB7XG4gIHJlZ2lvbkluZm9Qcm92aWRlcjogUmVnaW9uSW5mb1Byb3ZpZGVyO1xuICB1cmxQYXJzZXI6IFVybFBhcnNlcjtcbiAgcmVnaW9uOiBQcm92aWRlcjxzdHJpbmc+O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEVuZHBvaW50c1Jlc29sdmVkQ29uZmlnIGV4dGVuZHMgUmVxdWlyZWQ8RW5kcG9pbnRzSW5wdXRDb25maWc+IHtcbiAgZW5kcG9pbnQ6IFByb3ZpZGVyPEVuZHBvaW50PjtcbiAgaXNDdXN0b21FbmRwb2ludDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNvbnN0IHJlc29sdmVFbmRwb2ludHNDb25maWcgPSA8VD4oXG4gIGlucHV0OiBUICYgRW5kcG9pbnRzSW5wdXRDb25maWcgJiBQcmV2aW91c2x5UmVzb2x2ZWRcbik6IFQgJiBFbmRwb2ludHNSZXNvbHZlZENvbmZpZyA9PiAoe1xuICAuLi5pbnB1dCxcbiAgdGxzOiBpbnB1dC50bHMgPz8gdHJ1ZSxcbiAgZW5kcG9pbnQ6IGlucHV0LmVuZHBvaW50ID8gbm9ybWFsaXplRW5kcG9pbnQoaW5wdXQpIDogKCkgPT4gZ2V0RW5kUG9pbnRGcm9tUmVnaW9uKGlucHV0KSxcbiAgaXNDdXN0b21FbmRwb2ludDogaW5wdXQuZW5kcG9pbnQgPyB0cnVlIDogZmFsc2UsXG59KTtcblxuY29uc3Qgbm9ybWFsaXplRW5kcG9pbnQgPSAoaW5wdXQ6IEVuZHBvaW50c0lucHV0Q29uZmlnICYgUHJldmlvdXNseVJlc29sdmVkKTogUHJvdmlkZXI8RW5kcG9pbnQ+ID0+IHtcbiAgY29uc3QgeyBlbmRwb2ludCwgdXJsUGFyc2VyIH0gPSBpbnB1dDtcbiAgaWYgKHR5cGVvZiBlbmRwb2ludCA9PT0gXCJzdHJpbmdcIikge1xuICAgIGNvbnN0IHByb21pc2lmaWVkID0gUHJvbWlzZS5yZXNvbHZlKHVybFBhcnNlcihlbmRwb2ludCkpO1xuICAgIHJldHVybiAoKSA9PiBwcm9taXNpZmllZDtcbiAgfSBlbHNlIGlmICh0eXBlb2YgZW5kcG9pbnQgPT09IFwib2JqZWN0XCIpIHtcbiAgICBjb25zdCBwcm9taXNpZmllZCA9IFByb21pc2UucmVzb2x2ZShlbmRwb2ludCk7XG4gICAgcmV0dXJuICgpID0+IHByb21pc2lmaWVkO1xuICB9XG4gIHJldHVybiBlbmRwb2ludCE7XG59O1xuXG5jb25zdCBnZXRFbmRQb2ludEZyb21SZWdpb24gPSBhc3luYyAoaW5wdXQ6IEVuZHBvaW50c0lucHV0Q29uZmlnICYgUHJldmlvdXNseVJlc29sdmVkKSA9PiB7XG4gIGNvbnN0IHsgdGxzID0gdHJ1ZSB9ID0gaW5wdXQ7XG4gIGNvbnN0IHJlZ2lvbiA9IGF3YWl0IGlucHV0LnJlZ2lvbigpO1xuXG4gIGNvbnN0IGRuc0hvc3RSZWdleCA9IG5ldyBSZWdFeHAoL14oW2EtekEtWjAtOV18W2EtekEtWjAtOV1bYS16QS1aMC05LV17MCw2MX1bYS16QS1aMC05XSkkLyk7XG4gIGlmICghZG5zSG9zdFJlZ2V4LnRlc3QocmVnaW9uKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkludmFsaWQgcmVnaW9uIGluIGNsaWVudCBjb25maWdcIik7XG4gIH1cblxuICBjb25zdCB7IGhvc3RuYW1lIH0gPSAoYXdhaXQgaW5wdXQucmVnaW9uSW5mb1Byb3ZpZGVyKHJlZ2lvbikpID8/IHt9O1xuICBpZiAoIWhvc3RuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IHJlc29sdmUgaG9zdG5hbWUgZnJvbSBjbGllbnQgY29uZmlnXCIpO1xuICB9XG5cbiAgcmV0dXJuIGlucHV0LnVybFBhcnNlcihgJHt0bHMgPyBcImh0dHBzOlwiIDogXCJodHRwOlwifS8vJHtob3N0bmFtZX1gKTtcbn07XG4iXX0=