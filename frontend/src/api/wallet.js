
import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "../firebase";

const functions = getFunctions(app, "africa-south1");

export async function getUserBalance() {
	const fn = httpsCallable(functions, "user_getBalance");
	const result = await fn();
	return result.data;
}

export async function updateUserBalance() {
	const fn = httpsCallable(functions, "user_updateBalance");
	const result = await fn();
	return result.data;
}
