module.exports = function(config) {
    config.set({
        timeoutMS: 1200000,
        files: [
            "**/*",
            "!node_modules/**/*"
        ],
        mutate: [ 
            "src/**/*.spec.ts"
        ],
        
        mutator: "javascript",
        
        webpack: {
          configFile: "webpack.config.js",
          silent: true
        },
        
        tsconfigFile: "tsconfig.json",
        
        reporters: [
            "progress", 
            "clear-text", 
            "html",
            "dashboard"
        ],
        
        coverageAnalysis: "off"
    });
}