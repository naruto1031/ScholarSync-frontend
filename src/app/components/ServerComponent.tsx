import { Suspense } from 'react'
import Loading from '../loading'
import { getServerSession } from 'next-auth'
import { options } from '../options'

interface Greeting {
	greeting: string
}

const ServerComponent = async () => {
	const session = await getServerSession(options)

	const res = await fetch('http://127.0.0.1:8000/api/greeting', {
		headers: {
			Authorization: `Bearer ${session?.user.accessToken}`,
		},
	})

	const data = res

	let greeting = ''
	if (data.ok) {
		greeting = await data.json().then((data: Greeting) => {
			return data.greeting
		})
	}

	return (
		<>
			<Suspense fallback={<Loading />}>
				<h1>ServerComponent:{greeting}</h1>
			</Suspense>
		</>
	)
}

export default ServerComponent
