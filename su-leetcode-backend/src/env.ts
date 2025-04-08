export const env = {
    DATABASE_URL: process.env.DATABASE_URL ?? "postgresql://postgres:password@localhost:5432",
    DATABASE_NAME: process.env.DATABASE_NAME ?? "su-leetcode",
    PORT: isNaN(Number(process.env.PORT)) ? 3060 : Number(process.env.PORT),
    REDIS_URL: process.env.REDIS_URL,
    REDIS_CACHE_TIME: Number(process.env.REDIS_CACHE_TIME) ?? 60 * 60 * 24 * 7,
};
