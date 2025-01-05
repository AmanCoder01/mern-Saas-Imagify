import rateLimit from "express-rate-limit"

export const createBasicRateLimiter = (maxRequests, time) => {
    return rateLimit({
        max: maxRequests,
        windowMs: time,
        standardHeaders: true,
        legacyHeaders: false,
        message: "Too many requests, please try again later"
    })
}