"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.defaultUserAgent = void 0;
const tslib_1 = require("tslib");
const bowser_1 = tslib_1.__importDefault(require("bowser"));
/**
 * Default provider to the user agent in browsers. It's a best effort to infer
 * the device information. It uses bowser library to detect the browser and version
 */
const defaultUserAgent = ({ serviceId, clientVersion, }) => async () => {
    var _a, _b, _c, _d, _e, _f, _g;
    const parsedUA = (typeof window !== 'undefined' && ((_a = window === null || window === void 0 ? void 0 : window.navigator) === null || _a === void 0 ? void 0 : _a.userAgent)) ? bowser_1.default.parse(window.navigator.userAgent) : undefined;
    const sections = [
        // sdk-metadata
        ["aws-sdk-js", clientVersion],
        // os-metadata
        [`os/${((_b = parsedUA === null || parsedUA === void 0 ? void 0 : parsedUA.os) === null || _b === void 0 ? void 0 : _b.name) || "other"}`, (_c = parsedUA === null || parsedUA === void 0 ? void 0 : parsedUA.os) === null || _c === void 0 ? void 0 : _c.version],
        // language-metadata
        // ECMAScript edition doesn't matter in JS.
        ["lang/js"],
        // browser vendor and version.
        ["md/browser", `${(_e = (_d = parsedUA === null || parsedUA === void 0 ? void 0 : parsedUA.browser) === null || _d === void 0 ? void 0 : _d.name) !== null && _e !== void 0 ? _e : "unknown"}_${(_g = (_f = parsedUA === null || parsedUA === void 0 ? void 0 : parsedUA.browser) === null || _f === void 0 ? void 0 : _f.version) !== null && _g !== void 0 ? _g : "unknown"}`],
    ];
    if (serviceId) {
        // api-metadata
        // service Id may not appear in non-AWS clients
        sections.push([`api/${serviceId}`, clientVersion]);
    }
    return sections;
};
exports.defaultUserAgent = defaultUserAgent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLDREQUE0QjtBQUk1Qjs7O0dBR0c7QUFDSSxNQUFNLGdCQUFnQixHQUFHLENBQUMsRUFDL0IsU0FBUyxFQUNULGFBQWEsR0FDVyxFQUF1QixFQUFFLENBQUMsS0FBSyxJQUFJLEVBQUU7O0lBQzdELE1BQU0sUUFBUSxHQUFHLENBQUMsT0FBTyxNQUFNLEtBQUssV0FBVyxLQUFJLE1BQUEsTUFBTSxhQUFOLE1BQU0sdUJBQU4sTUFBTSxDQUFFLFNBQVMsMENBQUUsU0FBUyxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUMsZ0JBQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ3hJLE1BQU0sUUFBUSxHQUFjO1FBQzFCLGVBQWU7UUFDZixDQUFDLFlBQVksRUFBRSxhQUFhLENBQUM7UUFDN0IsY0FBYztRQUNkLENBQUMsTUFBTSxDQUFBLE1BQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLEVBQUUsMENBQUUsSUFBSSxLQUFJLE9BQU8sRUFBRSxFQUFFLE1BQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLEVBQUUsMENBQUUsT0FBTyxDQUFDO1FBQzlELG9CQUFvQjtRQUNwQiwyQ0FBMkM7UUFDM0MsQ0FBQyxTQUFTLENBQUM7UUFDWCw4QkFBOEI7UUFDOUIsQ0FBQyxZQUFZLEVBQUUsR0FBRyxNQUFBLE1BQUEsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFFLE9BQU8sMENBQUUsSUFBSSxtQ0FBSSxTQUFTLElBQUksTUFBQSxNQUFBLFFBQVEsYUFBUixRQUFRLHVCQUFSLFFBQVEsQ0FBRSxPQUFPLDBDQUFFLE9BQU8sbUNBQUksU0FBUyxFQUFFLENBQUM7S0FDckcsQ0FBQztJQUVGLElBQUksU0FBUyxFQUFFO1FBQ2IsZUFBZTtRQUNmLCtDQUErQztRQUMvQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxTQUFTLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FBQyxDQUFDO0tBQ3BEO0lBRUQsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQyxDQUFDO0FBeEJXLFFBQUEsZ0JBQWdCLG9CQXdCM0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcm92aWRlciwgVXNlckFnZW50IH0gZnJvbSBcIkBhd3Mtc2RrL3R5cGVzXCI7XG5pbXBvcnQgYm93c2VyIGZyb20gXCJib3dzZXJcIjtcblxuaW1wb3J0IHsgRGVmYXVsdFVzZXJBZ2VudE9wdGlvbnMgfSBmcm9tIFwiLi9jb25maWd1cmF0aW9uc1wiO1xuXG4vKipcbiAqIERlZmF1bHQgcHJvdmlkZXIgdG8gdGhlIHVzZXIgYWdlbnQgaW4gYnJvd3NlcnMuIEl0J3MgYSBiZXN0IGVmZm9ydCB0byBpbmZlclxuICogdGhlIGRldmljZSBpbmZvcm1hdGlvbi4gSXQgdXNlcyBib3dzZXIgbGlicmFyeSB0byBkZXRlY3QgdGhlIGJyb3dzZXIgYW5kIHZlcnNpb25cbiAqL1xuZXhwb3J0IGNvbnN0IGRlZmF1bHRVc2VyQWdlbnQgPSAoe1xuICBzZXJ2aWNlSWQsXG4gIGNsaWVudFZlcnNpb24sXG59OiBEZWZhdWx0VXNlckFnZW50T3B0aW9ucyk6IFByb3ZpZGVyPFVzZXJBZ2VudD4gPT4gYXN5bmMgKCkgPT4ge1xuICBjb25zdCBwYXJzZWRVQSA9ICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJiB3aW5kb3c/Lm5hdmlnYXRvcj8udXNlckFnZW50KSA/IGJvd3Nlci5wYXJzZSh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCkgOiB1bmRlZmluZWQ7XG4gIGNvbnN0IHNlY3Rpb25zOiBVc2VyQWdlbnQgPSBbXG4gICAgLy8gc2RrLW1ldGFkYXRhXG4gICAgW1wiYXdzLXNkay1qc1wiLCBjbGllbnRWZXJzaW9uXSxcbiAgICAvLyBvcy1tZXRhZGF0YVxuICAgIFtgb3MvJHtwYXJzZWRVQT8ub3M/Lm5hbWUgfHwgXCJvdGhlclwifWAsIHBhcnNlZFVBPy5vcz8udmVyc2lvbl0sXG4gICAgLy8gbGFuZ3VhZ2UtbWV0YWRhdGFcbiAgICAvLyBFQ01BU2NyaXB0IGVkaXRpb24gZG9lc24ndCBtYXR0ZXIgaW4gSlMuXG4gICAgW1wibGFuZy9qc1wiXSxcbiAgICAvLyBicm93c2VyIHZlbmRvciBhbmQgdmVyc2lvbi5cbiAgICBbXCJtZC9icm93c2VyXCIsIGAke3BhcnNlZFVBPy5icm93c2VyPy5uYW1lID8/IFwidW5rbm93blwifV8ke3BhcnNlZFVBPy5icm93c2VyPy52ZXJzaW9uID8/IFwidW5rbm93blwifWBdLFxuICBdO1xuXG4gIGlmIChzZXJ2aWNlSWQpIHtcbiAgICAvLyBhcGktbWV0YWRhdGFcbiAgICAvLyBzZXJ2aWNlIElkIG1heSBub3QgYXBwZWFyIGluIG5vbi1BV1MgY2xpZW50c1xuICAgIHNlY3Rpb25zLnB1c2goW2BhcGkvJHtzZXJ2aWNlSWR9YCwgY2xpZW50VmVyc2lvbl0pO1xuICB9XG5cbiAgcmV0dXJuIHNlY3Rpb25zO1xufTtcbiJdfQ==