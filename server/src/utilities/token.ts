import jwt from "jsonwebtoken";

const setToken = (id: string): string => {
  const token = jwt.sign({ userId: id }, process.env.JWT_SECRET_KEY as string, {
    expiresIn: "1d",
  });
  return token;
};

export { setToken };
