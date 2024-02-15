"use client";

import { useEffect, useState } from "react";
import { ContactInfo } from "../interfaces/contactInfo";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export function useContactInfo() {
  const [error, setError] = useState<any>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [fetchedContactInfo, setFetchedContactInfo] = useState<ContactInfo>({
    name: "",
    email: "",
    address: "",
    phoneNumber: "",
  });

  const auth = useAuth();
  const user = auth.currentUser;
  const ref = `${user?.uid}/contact-info`;

  async function getContactInfo() {
    setLoading(true);
    try {
      const querySnapshot = await getDoc(doc(db, ref));

      if (querySnapshot.exists()) {
        setFetchedContactInfo(querySnapshot.data() as ContactInfo);
      } else {
        setError("Document doesn't exist.");
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getContactInfo();
  }, []);

  return { error, loading, fetchedContactInfo };
}
