import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "../firebase";

const functions = getFunctions(app, "africa-south1");

export async function getUserDefenses() {
	const fn = httpsCallable(functions, "user_getDefenses");
	const result = await fn();
	return result.data;
}

export async function buyDefense(defenseId) {
	const fn = httpsCallable(functions, "user_buyDefense");
	const result = await fn({ defenseId });
	return result.data;
}

export async function upgradeDefense(defenseId) {
	const fn = httpsCallable(functions, "user_upgradeDefense");
	const result = await fn({ defenseId });
	return result.data;
}
