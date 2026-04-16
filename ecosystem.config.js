module.exports = {
  apps: [
    {
      name: "front",
      script: "serve",
      env: {
        PM2_SERVE_PATH: "C:\\dev\\react-app\\build",
        PM2_SERVE_PORT: 3000
      }
    }
  ]
}