module.exports = {
  apps: [
    {
      name: "golden-spoon",
      cwd: __dirname,
      script: "npm",
      args: "start",
      env: {
        NODE_ENV: "production",
        PORT: "3000",
      },
    },
  ],
};
