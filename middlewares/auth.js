const jwt = require('jsonwebtoken');
const { prisma } = require('../prisma/prisma-client');

const auth = async (req, res, next) => {
    try {
        let token = req.headers.authorization?.split(' ')[1];
        const decodedId = jwt.verify(token, process.env.JWT_SECRET).id;
        const user = await prisma.user.findFirst({ where: { id: decodedId } });

        req.user = user;

        next();
    } catch (error) {
        res.status(401).json({ message: 'Не авторизован' });
    }
}

module.exports = {
    auth
}