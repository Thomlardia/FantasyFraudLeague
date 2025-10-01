
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase";

export async function getUserBalance(userId) {
	const fn = httpsCallable(functions, "user_getBalance");
	const result = await fn(userId);
	return result.data;
}

export async function updateUserBalance(userId, newBalance) {
	const fn = httpsCallable(functions, "user_updateBalance");
	const result = await fn(userId, newBalance);
	return result.data;
}
