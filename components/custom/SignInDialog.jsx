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
import { Zap, Cpu } from "lucide-react";

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
          <div className="flex items-center justify-center mb-4">
            <Zap className="w-6 h-6 text-blue-400 mr-2 neon-text-blue" />
            <span className="text-xl font-bold hologram-text">TURBOWIRE</span>
            <Cpu className="w-5 h-5 text-orange-400 ml-2 neon-text-orange" />
          </div>
          <DialogTitle className="text-2xl text-white text-center neon-text-blue">
            {Lookup.SIGNIN_HEADING}
          </DialogTitle>
          <DialogDescription className="text-center text-sm mt-2">
            {Lookup.SIGNIN_SUBHEADING}
          </DialogDescription>
          <div className="flex flex-col justify-center items-center gap-3 mt-4">
            <Button
              className="neon-btn-blue mt-3"
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