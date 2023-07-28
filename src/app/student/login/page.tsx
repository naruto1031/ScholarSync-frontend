'use client'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation';

export default function Component() {
	const router = useRouter();
	const { data: session } = useSession()

	if (session?.user) {
		router.push('/student/dashboard/top')
	}

	if (session) {
		console.log(session)
		return (
			<>
				Signed in as {session.user?.email} <br />
				<button onClick={() => signOut()}>Sign out</button>
			</>
		)
	}
	return (
		<>
			Not signed in <br />
			<button onClick={() => signIn()}>Sign in</button>
		</>
	)
}
