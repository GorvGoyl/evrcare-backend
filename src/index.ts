import functions = require("firebase-functions");
import admin = require("firebase-admin");
// eslint-disable-next-line import/first
// import * as serviceAccount from "../dev-adminsdk.json";
// import sgMail = require("@sendgrid/mail");
// import util = require("util");
// import axios from "axios";

admin.initializeApp();
// admin.initializeApp(functions.config().firebase);
// admin.initializeApp({
//   // below serviceAccount is only used for local serve and debug
//   credential: admin.credential.cert(serviceAccount as any),

// });
const LOCATION = "asia-east2";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

export const bookService = functions
  .region(LOCATION)
  .https.onCall(async (data, context) => {
    // validating a request
    if (!data) {
      throw new functions.https.HttpsError(
        "invalid-argument",
        "data doesnt exist"
      );
    }
    validateUser(context);

    return admin
      .firestore()
      .collection("orders")
      .add(data)
      .then(() => {
        console.log("added a order successfully");
        return { response: "yeah" };
      })
      .catch((err) => {
        console.log(err);

        throw new functions.https.HttpsError(
          "internal",
          "some internal error try back later"
        );
      });
  });

export const helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

export const helloWorld2 = functions.https.onRequest((request, response) => {
  response.send("Hello from Firebase!");
});

// #region ## ----------------- utility methods ----------------- ##
// validate a user if it authenticated && has evrcare email and it is verified
function validateUser(context: functions.https.CallableContext): void {
  if (!context.auth) {
    throw new functions.https.HttpsError("unauthenticated", "no user found");
  }

  console.log(
    context.auth.uid,
    context.auth.token.email,
    context.auth.token.email_verified
  );

  if (!context.auth.token.email) {
    throw new functions.https.HttpsError(
      "failed-precondition",
      "user has no email id please update your profile"
    );
  }

  // if(!context.auth.token.email.match(/[a-z0-9._-]+@gmail+\.com/)){
  //     throw new functions.https.HttpsError("permission-denied","your are trying to access restriced resources!");
  // }

  if (!context.auth.token.email_verified) {
    throw new functions.https.HttpsError(
      "permission-denied",
      "email not verified"
    );
  }
}
