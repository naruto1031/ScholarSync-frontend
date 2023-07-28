"use client";

import { Button } from "@mui/material";
import { signOut } from "next-auth/react";

const SignOutButton = () => {
	return (
		<Button variant="contained" onClick={() => signOut()}>SignOut</Button>
	)
}

export default SignOutButton;