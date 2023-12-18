'use client'

import { Button } from '@mui/material'
import { signIn } from 'next-auth/react'

export const SignInButton = () => {
	return (
		<Button variant='contained' onClick={() => signIn()}>
			サインイン
		</Button>
	)
}