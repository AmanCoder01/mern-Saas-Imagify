import jwt from "jsonwebtoken";

const verifyUserToken = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];

        if (!authHeader && !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const token = authHeader.split(" ")[1];

        if (!token) return res.status(401).json({ success: false, message: 'Access denied. No token provided.' });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (!decoded.id) {
            return res.status(401).json({ success: false, message: 'Access denied. Invalid' });
        }

        req.userId = decoded.id;
        next();

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
}

export default verifyUserToken