import Redis from "ioredis";
import { promisify } from "util";

const redisClient = new Redis();

// redisClient.flushdb(function (err, succeeded) {
//     console.log(succeeded); // will be true if successfull
// });

async function getRedis(value: string) {
    const asyncRedisGet = promisify(redisClient.get).bind(redisClient);
    return asyncRedisGet(value)
}

async function setRedis(key: string, value: string) {
    const timeout = 120
    const asyncRedisSet = promisify(redisClient.set).bind(redisClient)
    await redisClient.expire(key, 60)
    return await asyncRedisSet(key, value)

}

async function deleteCacheById(key: string) {
    return await redisClient.del(key);

}

export { redisClient, getRedis, setRedis, deleteCacheById };