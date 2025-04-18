import jwt from 'jsonwebtoken'

export const generateToken = (user) => {
  const token = jwt.sign(
    {
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
  return token;
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    return decoded;
  } catch (error) {
    return null;
  }
};
