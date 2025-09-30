import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "../firebase";

const functions = getFunctions(app, "africa-south1");

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