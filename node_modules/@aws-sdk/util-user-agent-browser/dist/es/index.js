import { __awaiter, __generator } from "tslib";
import bowser from "bowser";
/**
 * Default provider to the user agent in browsers. It's a best effort to infer
 * the device information. It uses bowser library to detect the browser and version
 */
export var defaultUserAgent = function (_a) {
    var serviceId = _a.serviceId, clientVersion = _a.clientVersion;
    return function () { return __awaiter(void 0, void 0, void 0, function () {
        var parsedUA, sections;
        var _a, _b, _c, _d, _e, _f, _g;
        return __generator(this, function (_h) {
            parsedUA = (typeof window !== 'undefined' && ((_a = window === null || window === void 0 ? void 0 : window.navigator) === null || _a === void 0 ? void 0 : _a.userAgent)) ? bowser.parse(window.navigator.userAgent) : undefined;
            sections = [
                // sdk-metadata
                ["aws-sdk-js", clientVersion],
                // os-metadata
                ["os/" + (((_b = parsedUA === null || parsedUA === void 0 ? void 0 : parsedUA.os) === null || _b === void 0 ? void 0 : _b.name) || "other"), (_c = parsedUA === null || parsedUA === void 0 ? void 0 : parsedUA.os) === null || _c === void 0 ? void 0 : _c.version],
                // language-metadata
                // ECMAScript edition doesn't matter in JS.
                ["lang/js"],
                // browser vendor and version.
                ["md/browser", ((_e = (_d = parsedUA === null || parsedUA === void 0 ? void 0 : parsedUA.browser) === null || _d === void 0 ? void 0 : _d.name) !== null && _e !== void 0 ? _e : "unknown") + "_" + ((_g = (_f = parsedUA === null || parsedUA === void 0 ? void 0 : parsedUA.browser) === null || _f === void 0 ? void 0 : _f.version) !== null && _g !== void 0 ? _g : "unknown")],
            ];
            if (serviceId) {
                // api-metadata
                // service Id may not appear in non-AWS clients
                sections.push(["api/" + serviceId, clientVersion]);
            }
            return [2 /*return*/, sections];
        });
    }); };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUNBLE9BQU8sTUFBTSxNQUFNLFFBQVEsQ0FBQztBQUk1Qjs7O0dBR0c7QUFDSCxNQUFNLENBQUMsSUFBTSxnQkFBZ0IsR0FBRyxVQUFDLEVBR1A7UUFGeEIsU0FBUyxlQUFBLEVBQ1QsYUFBYSxtQkFBQTtJQUNxQyxPQUFBOzs7O1lBQzVDLFFBQVEsR0FBRyxDQUFDLE9BQU8sTUFBTSxLQUFLLFdBQVcsS0FBSSxNQUFBLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxTQUFTLDBDQUFFLFNBQVMsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO1lBQ2xJLFFBQVEsR0FBYztnQkFDMUIsZUFBZTtnQkFDZixDQUFDLFlBQVksRUFBRSxhQUFhLENBQUM7Z0JBQzdCLGNBQWM7Z0JBQ2QsQ0FBQyxTQUFNLENBQUEsTUFBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsRUFBRSwwQ0FBRSxJQUFJLEtBQUksT0FBTyxDQUFFLEVBQUUsTUFBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsRUFBRSwwQ0FBRSxPQUFPLENBQUM7Z0JBQzlELG9CQUFvQjtnQkFDcEIsMkNBQTJDO2dCQUMzQyxDQUFDLFNBQVMsQ0FBQztnQkFDWCw4QkFBOEI7Z0JBQzlCLENBQUMsWUFBWSxFQUFFLENBQUcsTUFBQSxNQUFBLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxPQUFPLDBDQUFFLElBQUksbUNBQUksU0FBUyxXQUFJLE1BQUEsTUFBQSxRQUFRLGFBQVIsUUFBUSx1QkFBUixRQUFRLENBQUUsT0FBTywwQ0FBRSxPQUFPLG1DQUFJLFNBQVMsQ0FBRSxDQUFDO2FBQ3JHLENBQUM7WUFFRixJQUFJLFNBQVMsRUFBRTtnQkFDYixlQUFlO2dCQUNmLCtDQUErQztnQkFDL0MsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQU8sU0FBVyxFQUFFLGFBQWEsQ0FBQyxDQUFDLENBQUM7YUFDcEQ7WUFFRCxzQkFBTyxRQUFRLEVBQUM7O1NBQ2pCO0FBckJtRCxDQXFCbkQsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByb3ZpZGVyLCBVc2VyQWdlbnQgfSBmcm9tIFwiQGF3cy1zZGsvdHlwZXNcIjtcbmltcG9ydCBib3dzZXIgZnJvbSBcImJvd3NlclwiO1xuXG5pbXBvcnQgeyBEZWZhdWx0VXNlckFnZW50T3B0aW9ucyB9IGZyb20gXCIuL2NvbmZpZ3VyYXRpb25zXCI7XG5cbi8qKlxuICogRGVmYXVsdCBwcm92aWRlciB0byB0aGUgdXNlciBhZ2VudCBpbiBicm93c2Vycy4gSXQncyBhIGJlc3QgZWZmb3J0IHRvIGluZmVyXG4gKiB0aGUgZGV2aWNlIGluZm9ybWF0aW9uLiBJdCB1c2VzIGJvd3NlciBsaWJyYXJ5IHRvIGRldGVjdCB0aGUgYnJvd3NlciBhbmQgdmVyc2lvblxuICovXG5leHBvcnQgY29uc3QgZGVmYXVsdFVzZXJBZ2VudCA9ICh7XG4gIHNlcnZpY2VJZCxcbiAgY2xpZW50VmVyc2lvbixcbn06IERlZmF1bHRVc2VyQWdlbnRPcHRpb25zKTogUHJvdmlkZXI8VXNlckFnZW50PiA9PiBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHBhcnNlZFVBID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdz8ubmF2aWdhdG9yPy51c2VyQWdlbnQpID8gYm93c2VyLnBhcnNlKHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KSA6IHVuZGVmaW5lZDtcbiAgY29uc3Qgc2VjdGlvbnM6IFVzZXJBZ2VudCA9IFtcbiAgICAvLyBzZGstbWV0YWRhdGFcbiAgICBbXCJhd3Mtc2RrLWpzXCIsIGNsaWVudFZlcnNpb25dLFxuICAgIC8vIG9zLW1ldGFkYXRhXG4gICAgW2Bvcy8ke3BhcnNlZFVBPy5vcz8ubmFtZSB8fCBcIm90aGVyXCJ9YCwgcGFyc2VkVUE/Lm9zPy52ZXJzaW9uXSxcbiAgICAvLyBsYW5ndWFnZS1tZXRhZGF0YVxuICAgIC8vIEVDTUFTY3JpcHQgZWRpdGlvbiBkb2Vzbid0IG1hdHRlciBpbiBKUy5cbiAgICBbXCJsYW5nL2pzXCJdLFxuICAgIC8vIGJyb3dzZXIgdmVuZG9yIGFuZCB2ZXJzaW9uLlxuICAgIFtcIm1kL2Jyb3dzZXJcIiwgYCR7cGFyc2VkVUE/LmJyb3dzZXI/Lm5hbWUgPz8gXCJ1bmtub3duXCJ9XyR7cGFyc2VkVUE/LmJyb3dzZXI/LnZlcnNpb24gPz8gXCJ1bmtub3duXCJ9YF0sXG4gIF07XG5cbiAgaWYgKHNlcnZpY2VJZCkge1xuICAgIC8vIGFwaS1tZXRhZGF0YVxuICAgIC8vIHNlcnZpY2UgSWQgbWF5IG5vdCBhcHBlYXIgaW4gbm9uLUFXUyBjbGllbnRzXG4gICAgc2VjdGlvbnMucHVzaChbYGFwaS8ke3NlcnZpY2VJZH1gLCBjbGllbnRWZXJzaW9uXSk7XG4gIH1cblxuICByZXR1cm4gc2VjdGlvbnM7XG59O1xuIl19