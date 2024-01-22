import { useState } from "react";

import { PencilLine } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { useAuth } from "@/app/context/AuthContext";
import { Input } from "../ui/input";
import { DialogProps } from "@/app/interfaces/dialogProps";
import { Label } from "../ui/label";

type UserData = {
  userData: "email" | "password";
};

type UserDataDialogProps = Omit<DialogProps, "id"> & UserData;

export default function UpdateUserDataDialog({
  userData,
  dialogOpen,
  setDialogOpen,
}: UserDataDialogProps) {
  const [data, setData] = useState<string>("");
  const [confirmData, setConfirmData] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const auth = useAuth();
  const user = auth.currentUser;

  async function updateData() {
    setLoading(true);
    setError("");
    setSuccess("");

    if (userData === "email" && data !== confirmData) {
      setError("The data you entered does not match. Try again.");
      setLoading(false);
      return;
    }

    try {
      if (userData === "email") {
        await auth.updateUserEmail(data);
        setSuccess(
          "A verification email has been sent to your new email adress. After clicking the link in the email, your email adress will be updated. ",
        );
      } else if (userData === "password") {
        if (!user || !user.email) {
          setError("Something went wrong. Try again.");
          setLoading(false);
          return;
        }

        await auth.resetPassword(user.email);
        setSuccess(
          "A verification email has been sent to your new email adress. ",
        );
      }
    } catch (err) {
      setError("Something went wrong. Try again.");
      console.log(err);
    }

    setLoading(false);
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogContent className="w-96">
        <DialogHeader>
          <DialogTitle>
            <div className="flex h-6 pb-1 items-end">
              <div>
                <PencilLine className="h-5 w-5 mr-2" />
              </div>
              <div className="">
                {`Update your ${
                  userData === "email" ? "email adress" : "password"
                }`}
              </div>
            </div>
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col pt-2 pb-2">
          {error && <div className="text-sm text-red-500 mb-2">{error}</div>}
          {success && (
            <div className="text-sm text-green-500 mb-2">{success}</div>
          )}
          {userData === "email" && (
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor={userData}
                  className={`text-left ${error ? "text-red-500" : null}`}
                >
                  {userData === "email" ? "New Email" : "New Password"}
                </Label>
                <Input
                  name={userData}
                  id={userData}
                  type={userData}
                  value={data}
                  onChange={(e) => setData(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-1">
                <Label
                  htmlFor="confirmUserData"
                  className={`text-left ${error ? "text-red-500" : null}`}
                >
                  Confirm {userData === "email" ? "New Email" : "New Password"}
                </Label>
                <Input
                  name="confirmUserData"
                  id="confirmUserData"
                  type={userData}
                  value={confirmData}
                  onChange={(e) => setConfirmData(e.target.value)}
                />
              </div>
            </div>
          )}
          {userData === "password" && (
            <DialogDescription>
              By clicking the button below, an email with further instructions
              to reset your password will be sent to your current email adress.
            </DialogDescription>
          )}
        </div>
        <DialogFooter>
          <Button variant={"black"} onClick={updateData} disabled={loading}>
            {!loading ? `Update ${userData}` : "Updating..."}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
