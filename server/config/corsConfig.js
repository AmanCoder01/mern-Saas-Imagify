import cors from "cors"


export const configureCors = () => {
    return cors({
        origin: (origin, callback) => { //The origin option defines which origins are allowed to access your server.
            const allowedOrigins = [
                "http://localhost:5173",
                "https://imagify-ai-sigma.vercel.app"
            ]

            if (!origin || allowedOrigins.indexOf(origin) !== -1) {
                callback(null, true)
            } else {
                callback(new Error('Not allowed by CORS'))
            }
        },
        methods: ["GET", "POST", "PUT", "DELETE"], //methods specifies the HTTP methods that are allowed in CORS requests.
        allowedHeaders: ["Content-Type", "Authorization", "Accept-Version"], //allowedHeaders specifies which HTTP headers the client can include in requests.
        exposedHeaders: ["X-Total-Count", "Content-Range"], //exposedHeaders specifies which headers are accessible to the client in the response.
        credentials: true, //credentials is set to true to allow cookies, authorization headers, or TLS client certificates to be sent with requests.
        preflightContinue: false,
        //preflightContinue determines whether the server should pass the preflight request to the next middleware.
        // A preflight request is an automatic OPTIONS request sent by the browser before making CORS requests for non - simple methods(like POST or PUT).
        // Setting this to false means the preflight response will end the request.
        maxAge: 600, //maxAge specifies how long the preflight response can be cached by the browser in seconds
        optionsSuccessStatus: 204, //optionsSuccessStatus is used to set the status code for a successful preflight response.
    })
}
