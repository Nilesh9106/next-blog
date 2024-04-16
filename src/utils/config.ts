const EnvConfig = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  MONGODB_URI: process.env.MONGODB_URI ?? "mongodb://localhost:27017/myblog",
  JWT_SECRET: process.env.JWT_SECRET ?? "mysecretkey",
  SITEURL: process.env.SITEURL ?? "http://localhost:3000",
};

export default EnvConfig;
