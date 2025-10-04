
import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase";

/**
 * Get the current user's balance
 * Auth is handled automatically by Firebase - user ID comes from request.auth.uid on backend
 */
export async function getUserBalance() {
	const fn = httpsCallable(functions, "user_getBalance");
	const result = await fn(); // No params needed - backend gets uid from request.auth
	return result.data;
}

/**
 * Update the current user's balance
 * Auth is handled automatically by Firebase - user ID comes from request.auth.uid on backend
 */
export async function updateUserBalance(newBalance) {
	const fn = httpsCallable(functions, "user_updateBalance");
	const result = await fn({ newBalance }); // Pass newBalance as data object
	return result.data;
}
