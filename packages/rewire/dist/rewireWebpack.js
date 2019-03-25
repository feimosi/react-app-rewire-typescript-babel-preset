"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = __importDefault(require("path"));
var paths_1 = __importDefault(require("react-scripts/config/paths"));
var customize_cra_1 = require("customize-cra");
var webpackUtils_1 = require("./webpackUtils");
var getLoader = function (rules, matcher) {
    var loader;
    rules.some(function (rule) {
        return (loader = matcher(rule)
            ? rule
            : getLoader(rule.use ||
                rule.oneOf ||
                (Array.isArray(rule.loader) && rule.loader) ||
                [], matcher));
    });
    return loader;
};
// Switch out the entry point index.js for index.tsx.
// We need to do this on module import to intercept react-script's preflight
// module check.
paths_1.default.appIndexJs = paths_1.default.appIndexJs.replace(/src[\\\/]index.js$/, "src" + path_1.default.sep + "index.tsx");
function default_1(c) {
    // Validate and narrow type
    var config = webpackUtils_1.getValidatedConfig(c);
    config.resolve.extensions.unshift(".web.ts", ".web.tsx", ".ts", ".tsx");
    // Locate the Webpack loader responsible for handling Javascript assets and
    // add TypeScript file extensions.
    var scriptLoader = getLoader(config.module.rules, scriptsLoaderMatcher);
    if (!scriptLoader)
        throw new Error("Unable to locate scripts loader.");
    scriptLoader.test = /\.(ts|tsx|js|mjs|jsx)$/;
    // Replace the babel-preset-react-app preset with the preset rewire from this
    // package. This is done so @babel/preset-flow can be removed.
    var babelLoader = customize_cra_1.getBabelLoader(config);
    if (!babelLoader || !babelLoader.options)
        throw new Error("Unable to locate Babel loader.");
    babelLoader.options.presets = [path_1.default.resolve(__dirname, "rewirePreset")];
    return config;
}
exports.default = default_1;
// Matcher to find JavaScript/JSX loader using getLoader util from
// react-app-rewired. We need to able to locate the script loader to change the
// regular expression for its file name matching.
var scriptsLoaderMatcher = function (rule) {
    return Boolean(rule.test &&
        // 2.0.2, 2.0.3
        (rule.test.toString() === /\.(js|jsx)$/.toString() ||
            // 2.0.4
            // https://github.com/facebook/create-react-app/commit/736561fa8b368daf27bc26646b10b8511e9d63a9
            rule.test.toString() === /\.(js|mjs|jsx)$/.toString()) &&
        rule.enforce !== "pre" &&
        typeof rule.loader === "string" &&
        /babel-loader/.test(rule.loader));
};
