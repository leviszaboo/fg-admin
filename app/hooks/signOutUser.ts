"use client"

import { signOut } from "firebase/auth";
import { getAuth } from "firebase/auth";
import { app } from "/Users/leventeszabo/Desktop/website/website.html/luigi-admin-ts/app/firebase/firebase.ts";

export const auth = getAuth(app);

export function signOutUser() {
    signOut(auth)
        .then(() => {
            console.log("User signed out");
        })
        .catch((error) => {
            console.log(error.message);
        });
}