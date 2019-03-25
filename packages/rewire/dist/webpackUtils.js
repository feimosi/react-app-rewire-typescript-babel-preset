"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getValidatedConfig(config) {
    var error;
    var matchesShape = function (c) {
        error = (function () {
            if (!c.resolve)
                return "resolve is undefined";
            if (!c.resolve.extensions)
                return "resolve.extensions is undefined";
            if (!c.module)
                return "module is undefined";
            return undefined;
        })();
        return error === undefined;
    };
    if (matchesShape(config))
        return config;
    throw new Error("Unexpected Webpack config shape: " + error + ".");
}
exports.getValidatedConfig = getValidatedConfig;
