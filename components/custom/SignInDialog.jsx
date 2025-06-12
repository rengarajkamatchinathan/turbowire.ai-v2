"use client";
import React, { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Lookup from "@/data/Lookup";
import { Button } from "../ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import uuid4 from "uuid4";

function SignInDialog({ openDialog, closeDialog }) {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const CreateUser = useMutation(api.users.CreateUser);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: "Bearer " + tokenResponse?.access_token } }
      );

      console.log(userInfo);
      const user = userInfo.data;
      await CreateUser({
        name: user?.name,
        email: user?.email,
        picture: user?.picture,
        uid: uuid4(),
      });
      if (typeof window !== undefined) {
        localStorage.setItem("user", JSON.stringify(user));
      }
      setUserDetail(userInfo?.data);
      closeDialog(false);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });
  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent>
  <DialogHeader>
    <DialogTitle className="text-2xl text-white text-center">
      {Lookup.SIGNIN_HEADING}
    </DialogTitle>
    <DialogDescription className="text-center text-sm mt-2">
      {Lookup.SIGNIN_SUBHEADING}
    </DialogDescription>
    <div className="flex flex-col justify-center items-center gap-3 mt-4">
      <Button
        className="bg-blue-500 text-white hover:bg-blue-400 mt-3"
        onClick={() => googleLogin()}
      >
        Sign In With Google
      </Button>
      <p className="text-xs text-muted-foreground">
        {Lookup.SIGNIn_AGREEMENT_TEXT}
      </p>
    </div>
  </DialogHeader>
</DialogContent>

    </Dialog>
  );
}

export default SignInDialog;
