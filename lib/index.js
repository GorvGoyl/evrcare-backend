"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrders = exports.bookService = void 0;
const functions = require("firebase-functions");
const admin = require("firebase-admin");
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
exports.bookService = functions
    .region(LOCATION)
    .https.onCall(async (data, context) => {
    var _a, _b;
    // validating a request
    if (!data || !data.formData) {
        throw new functions.https.HttpsError("invalid-argument", "data doesnt exist");
    }
    validateUser(context);
    const uid = (_b = (_a = context.auth) === null || _a === void 0 ? void 0 : _a.uid) !== null && _b !== void 0 ? _b : "";
    // const { formName } = data;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const bookingDetails = data.formData;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    bookingDetails.created = admin.firestore.FieldValue.serverTimestamp();
    return admin
        .firestore()
        .collection("orders")
        .doc("users")
        .collection(uid)
        .doc()
        .set(bookingDetails)
        .then(() => {
        console.log("added order successfully");
        return { response: "ok" };
    })
        .catch((err) => {
        console.log(err);
        throw new functions.https.HttpsError("internal", "some internal error try back later");
    });
});
exports.getOrders = functions
    .region(LOCATION)
    .https.onCall(async (data, context) => {
    // validating a request
    if (data) {
        throw new functions.https.HttpsError("invalid-argument", "no arguments expected");
    }
    validateUser(context);
    return admin
        .firestore()
        .collection("orders")
        .get()
        .then((doc) => {
        const snap = [];
        doc.forEach((dx) => {
            // snap.push({ id: dx.id, details: dx.data() });
        });
        console.log("delivered a snapshot");
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        return { orders: snap };
    })
        .catch((err) => {
        console.log(err);
        throw new functions.https.HttpsError("internal", "some internal error try back later");
    });
});
// #region ## ----------------- utility methods ----------------- ##
// validate a user if it authenticated && has evrcare email and it is verified
function validateUser(context) {
    if (!context.auth || !context.auth.uid) {
        throw new functions.https.HttpsError("unauthenticated", "no user found");
    }
    console.log(context.auth.uid, context.auth.token.email, context.auth.token.email_verified);
    // if (!context.auth.token.email) {
    //   throw new functions.https.HttpsError(
    //     "failed-precondition",
    //     "user has no email id please update your profile"
    //   );
    // }
    // if(!context.auth.token.email.match(/[a-z0-9._-]+@gmail+\.com/)){
    //     throw new functions.https.HttpsError("permission-denied","your are trying to access restriced resources!");
    // }
    // if (!context.auth.token.email_verified) {
    //   throw new functions.https.HttpsError(
    //     "permission-denied",
    //     "email not verified"
    //   );
    // }
}
//# sourceMappingURL=index.js.map