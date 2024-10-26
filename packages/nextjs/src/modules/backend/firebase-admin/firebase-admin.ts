import { env } from "@/modules/env";
import * as admin from "firebase-admin";
import { getFirestore } from "firebase-admin/firestore";

if (!admin.apps.length) {
  admin.initializeApp({ projectId: env.vars.GOOGLE_PROJECT_ID });
}
const firestore = getFirestore("(default)");

export { firestore };
