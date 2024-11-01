const jwt = require('jsonwebtoken');

const UserRole = Object.freeze({
    USER:'user',
    ADMIN:'admin',
    OWNER:'owner'
});

exports.verifyToken = (roles=[UserRole.USER,UserRole.ADMIN,UserRole.OWNER], allowOwnerOnly = false) => {
    return (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        return res.status(401).json({ message: 'Not authenticated.' });
    }

    const token = authHeader.split(' ')[1]; 
    if (!token) {
        return res.status(401).json({ message: 'Malformed token.' });
      }
    try {
        decodedToken = jwt.verify(token, 'heystar'); // Use the same secret key that was used to generate the token
    } catch (err) {
        return res.status(500).json({ message: 'Token verification failed.' });
    }

    if (!decodedToken) {
        return res.status(401).json({ message: 'Not authenticated.' });
    }
    if (allowOwnerOnly && decodedToken.role !== UserRole.OWNER) {
        return res.status(403).json({ message: 'Access forbidden: Only owners can add products.' });
    }
    if (!roles.includes(decodedToken.role)) {
        return res.status(403).json({ message: 'Access forbidden: Insufficient permissions.' });
    }

    req.id = decodedToken.id; // Attach userId from the token to the request
    req.role = decodedToken.role; 
    next();
};
};