import jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import crypto from "core/config/auth";

const sign = (user: User) => {
	const payload = { id: user.id, role: user.role };
	return jwt.sign(payload, crypto.jwt.privateKey, {
		algorithm: "RS256",
		expiresIn: "15m",
	});
};

const decode = (token: string): any => jwt.decode(token);

const verify = (token: string) =>
	jwt.verify(token, crypto.jwt.publicKey, (err: any, data: any) => {
		if (err) throw err;

		return data;
	});

export { sign, verify, decode };
