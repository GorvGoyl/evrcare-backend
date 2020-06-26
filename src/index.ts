import admin = require("firebase-admin");
import functions = require("firebase-functions");
import { BookingForm } from "./types";
// import * as serviceAccount from "../dev-adminsdk.json";

admin.initializeApp();
// admin.initializeApp(functions.config().firebase);

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount as any),
//   databaseURL: "https://dev-evrcare-app.firebaseio.com",
// });
const LOCATION = "asia-east2";

// eslint-disable-next-line import/prefer-default-export
export const bookService = functions
  .region(LOCATION)
  .https.onCall(async (data: BookingForm, context) => {
    console.log("inside bookService function");

    // validating a request
    if (!data || !data.formData) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "data doesnt exist"
      );
    }
    validateUser(context);
    const uid = context.auth?.uid as string;
    // const { formName } = data;

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const bookingDetails = data.formData;
    console.log("bookingDetails set", bookingDetails);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    bookingDetails.created = admin.firestore.Timestamp.now();

    const db = admin.firestore();

    try {
      const x = await db
        .collection("orders")
        .doc("users")
        .collection(uid)
        .doc()
        .set(bookingDetails);
      console.log("added order successfully");
      return { response: "ok" };
    } catch (err) {
      console.log("issue catch block");
      console.log(err);

      throw new functions.https.HttpsError(
        "internal",
        "some internal error try back later"
      );
    }
  });

// #region ## ----------------- utility methods ----------------- ##

function validateUser(context: functions.https.CallableContext): void {
  console.log("validating user");

  if (!context.auth || !context.auth.uid) {
    console.log("validation issue!");

    throw new functions.https.HttpsError("unauthenticated", "no user found");
  }
  console.log("user validated");
}
