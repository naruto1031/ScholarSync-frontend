import { Suspense } from 'react'
import Loading from '../loading'

interface Greeting {
	greeting: string
}

const getGreeting = async (): Promise<Greeting> => {
	const response: Response = await fetch('http://127.0.0.1:8000/api/greeting')
	return response.json()
}

const stop = async () => {
	const data: Greeting = await new Promise((resolve) => {
		setTimeout(() => {
			resolve(getGreeting())
		}, 10000)
	})
	return data
}

const ServerComponent = async () => {
	const stop_data = await stop()
	return (
		<>
			<Suspense fallback={<Loading />}>
				<h1>ServerComponent: {stop_data.greeting}</h1>
			</Suspense>
		</>
	)
}

export default ServerComponent
