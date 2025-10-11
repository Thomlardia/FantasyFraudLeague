import { httpsCallable } from "firebase/functions";
import { functions } from "../firebase";

export async function getEasyWave() {
  const fn = httpsCallable(functions, "user_getEasyWave");
  const result = await fn();
  return result.data;
}

export async function getMediumWave() {
  const fn = httpsCallable(functions, "user_getMediumWave");
  const result = await fn();
  return result.data;
}

export async function getHardWave() {
  const fn = httpsCallable(functions, "user_getHardWave");
  const result = await fn();
  return result.data;
}

export async function getAttackDeduction() {
  const fn = httpsCallable(functions, "user_getAttackDeduction");
  const result = await fn();
  return result.data;
}

export async function adminMassAttackCustom(customWave) {
  const fn = httpsCallable(functions, "admin_massAttackCostum");
  const result = await fn({ wave: customWave });
  return result.data;
}

export async function getUserAttackLogs(limit = null) {
  const fn = httpsCallable(functions, "user_getAttackLogs");
  const result = await fn({ limit });
  return result.data;
}