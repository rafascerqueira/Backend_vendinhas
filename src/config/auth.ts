import { config } from "dotenv";

config();

export default {
  hashSaltRounds: 10,
  jwt: {
    secret: process.env.JWT_SECRET as string,
    expiresIn: "1d",
    privateKey: process.env.PRIVATE_KEY as string,
    publicKey: process.env.PUBLIC_KEY as string,
  },
};
