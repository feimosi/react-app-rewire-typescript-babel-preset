import * as webpack from "webpack";
interface ReactScriptsConfig extends webpack.Configuration {
    resolve: {
        extensions: string[];
    };
    module: {
        rules: webpack.Rule[];
    };
}
export declare function getValidatedConfig(config: webpack.Configuration): ReactScriptsConfig;
export {};
