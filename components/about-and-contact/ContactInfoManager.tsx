"use client"

import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { ContactInfo } from "@/app/interfaces/contactinfo";
import { useContactInfo } from "@/app/hooks/useContactInfo";
import { useAuth } from "@/app/context/AuthContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";

export default function ContactInfoManager() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("")
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    name: "",
    email: "",
    phoneNumber: "",
    address: ""
  })

  const auth = useAuth();
  const user = auth.currentUser;

  const { fetchedContactInfo } = useContactInfo();

  const [isEditing, setIsEditing] = useState<boolean>(false);

  function onChange(fieldName: keyof ContactInfo, value: string) {
    setIsEditing(true);
    setContactInfo((prevState) => ({
      ...prevState,
      [fieldName]: value
    }))
  }  

  function onCancel() {
    setContactInfo(fetchedContactInfo);
    setIsEditing(false);
  }

  async function handleUpdate() {
    setLoading(true);
    try {
      const path = `${user?.email}/contact-info`
      const ref = doc(db, path);
      await updateDoc(ref, {
        name: contactInfo.name,
        email: contactInfo.email,
        address: contactInfo.address,
        phoneNumber: contactInfo.phoneNumber
      });
      setIsEditing(false);
    } catch (err) {
      setError("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    setContactInfo(fetchedContactInfo)
  }, [fetchedContactInfo])

  return (
    <div className="p-4 mt-1 mb-4 bg-orange-50 rounded-3xl w-10/12  h-3/5 ">
      <div className="relative flex top-0 w-full justify-between items-center">
        <div className="p-1 pl-4 text-amber-900 text-3xl font-semibold">Contact Info</div>
      </div>
      <div className="grid grid-cols-2 p-4 gap-6">
        <div className="flex flex-col gap-2">
          <Label>
            <h2 className="font-semibold">
              Name
            </h2>
          </Label>
          <Input type="text" value={contactInfo.name} onChange={(e) => onChange("name", e.target.value)}/>
        </div>
        <div className="flex flex-col gap-2">
          <Label>
            <h2 className="font-semibold">
              Email
            </h2>
          </Label>
          <Input type="text" value={contactInfo.email} onChange={(e) => onChange("email", e.target.value)}/>
        </div>
        <div className="flex flex-col gap-2">
          <Label>
            <h2 className="font-semibold">
              Phone Number
            </h2>
          </Label>
          <Input type="text" value={contactInfo.phoneNumber} onChange={(e) => onChange("phoneNumber", e.target.value)}/>
        </div>
        <div className="flex flex-col gap-2">
          <Label>
            <h2 className="font-semibold">
              Address
            </h2>
          </Label>
          <Input type="text" value={contactInfo.address} onChange={(e) => onChange("address", e.target.value)}/>
        </div>
      </div>
      <div className="flex p-4">
        {error && <h2 className="text-red-500 font-semibold">{error}</h2>}
        <div className="flex gap-2 ml-auto">
          {isEditing && <Button className="w-24" variant={"outline"} onClick={onCancel}>Cancel</Button>}
          <Button className="w-24" onClick={handleUpdate}>
            {!loading ? "Update" : "Updating..."}
          </Button>
        </div>
      </div>
    </div>
  )
}
