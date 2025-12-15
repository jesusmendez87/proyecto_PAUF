import jwt from 'jsonwebtoken';

export const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // "Bearer <token>"
  if (!token) return res.status(401).json({ msg: 'Token requerido' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded._id, rol: decoded.rol }; // ✅ Seteamos req.user
    next();
  } catch (err) {
    return res.status(401).json({ msg: 'Token inválido' });
  }
};
