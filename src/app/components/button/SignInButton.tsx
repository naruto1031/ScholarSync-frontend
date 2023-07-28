"use client";

import { Button } from "@mui/material";
import { signIn } from "next-auth/react";

const SignInButton = () => {
	return (
		<Button variant="contained" onClick={() => signIn()}>サインイン</Button>
	)
}

export default SignInButton;