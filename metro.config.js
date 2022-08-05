/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const sourceExts = require("metro-config/src/defaults/defaults").sourceExts;

module.exports = {
    transformer: {
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: false,
            },
        }),
    },
    resolver: {
        sourceExts: [...sourceExts, 'cjs']
    }
};
