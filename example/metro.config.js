const {getDefaultConfig} = require("expo/metro-config")
const getWorkspaces = require("get-yarn-workspaces")
const path = require("node:path")

/**
 * @param {import('expo/metro-config').MetroConfig} config
 * @param {string} dirname
 */
function mutateConfigForMonorepo(config, dirname) {
    const workspaces = getWorkspaces(dirname).filter((pathItem) => !path.extname(pathItem))
    const workspaceRoot = path.resolve(dirname, "..")

    config.resolver.watchFolders = [
        dirname,
        path.resolve(dirname, "../node_modules"),
        ...workspaces,
    ]

    config.resolver.nodeModulesPaths = [
        path.join(dirname, "./node_modules"),
        path.join(workspaceRoot, "./node_modules"),
        ...workspaces.map((directory) => path.resolve(directory, "node_modules")),
    ]
}

/**
 * See:
 *   - https://github.com/gregberge/react-merge-refs/issues/35
 *   - https://microsoft.github.io/rnx-kit/docs/tools/metro-serializer-esbuild#metro--esm-support
 */
function mutateConfigForEsmSupport(config) {
    config.resolver.resolverMainFields = ["react-native", "browser", "main", "module"]
}

function getMetroConfig(dirname) {
    const config = getDefaultConfig(dirname)

    mutateConfigForMonorepo(config, dirname)
    mutateConfigForEsmSupport(config)
    return config
}

module.exports = getMetroConfig(__dirname)
