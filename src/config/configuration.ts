export default () => ({
  port: parseInt(process.env.PORT, 10) || 3000,
  database: process.env.DATABASE_CONNECTION_STRING,
  redis: {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
  },
});
