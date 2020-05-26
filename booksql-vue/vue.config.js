module.exports = {
  "pluginOptions": {
    "apollo": {
      "enableMocks": true,
      "enableEngine": true,
      "lintGQL": false,
      "serverFolder": "./apollo-server",
      "cors": "*",
      "timeout": 120000,
      "integratedEngine": true,
      "typescript": true,
      "serverOptions": {}
    }
  },
  "transpileDependencies": [
    "vuetify"
  ]
}