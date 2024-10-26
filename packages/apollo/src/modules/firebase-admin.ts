// Using standard Firestore SDK
// import { Firestore } from "@google-cloud/firestore";
// const firestore = new Firestore({ projectId: "engagement-management-dev" });

// Using Firebase SDK
import { env } from "./env";
import { config } from "./config";
import * as admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

if (!admin.apps.length) {
  admin.initializeApp({
    projectId: config.GOOGLE_PROJECT_ID,
  });
}
const firestore = getFirestore("(default)");

export { firestore };
