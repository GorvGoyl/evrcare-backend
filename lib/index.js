"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookService = void 0;
const admin = require("firebase-admin");
const functions = require("firebase-functions");
// import * as serviceAccount from "../dev-adminsdk.json";
admin.initializeApp();
// admin.initializeApp(functions.config().firebase);
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount as any),
//   databaseURL: "https://dev-evrcare-app.firebaseio.com",
// });
const LOCATION = "asia-east2";
// eslint-disable-next-line import/prefer-default-export
exports.bookService = functions
    .region(LOCATION)
    .https.onCall(async (data, context) => {
    var _a;
    console.log("inside bookService function");
    let E2;
    (function (E2) {
        E2[E2["A"] = process.hrtime()[0]] = "A";
    })(E2 || (E2 = {}));
    console.log("BUILD TIME:", process.env.BUILD);
    console.log("process.pid", process.pid);
    // validating a request
    if (!data || !data.formData) {
        throw new functions.https.HttpsError("invalid-argument", "data doesnt exist");
    }
    validateUser(context);
    const uid = (_a = context.auth) === null || _a === void 0 ? void 0 : _a.uid;
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
    }
    catch (err) {
        console.log("issue catch block");
        console.log(err);
        throw new functions.https.HttpsError("internal", "some internal error try back later");
    }
});
// #region ## ----------------- utility methods ----------------- ##
function validateUser(context) {
    console.log("validating user");
    if (!context.auth || !context.auth.uid) {
        console.log("validation issue!");
        throw new functions.https.HttpsError("unauthenticated", "no user found");
    }
    console.log("user validated");
}
//# sourceMappingURL=index.js.map