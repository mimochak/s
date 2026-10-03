module.exports = {
  apps: [
    {
      name: "golden-spoon",
      cwd: __dirname,
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        // Overridable: PORT=3005 pm2 start ecosystem.config.js
        PORT: process.env.PORT || "3000",
      },
    },
  ],
};
