import { getServerSession } from 'next-auth'
import { options } from '../options'
import { redirect } from 'next/navigation'

interface Greeting {
	greeting: string
}

const ServerComponent = async () => {
	const session = await getServerSession(options)

	const res = await fetch(`${process.env.API_URL}/api/greeting`, {
		headers: {
			Authorization: `Bearer ${session?.user.accessToken}`,
		},
	})

	const data = res
	// console.log(data)
	let greeting = ''
	if (data.ok) {
		greeting = await data.json().then((data: Greeting) => {
			return data.greeting
		})
	} else {
		console.log(data.status)
		if (data.status === 500) {
			redirect('/student/login')
		}
	}

	return (
		<>
			<h1>
				ServerComponent:{greeting}
				{data.status}
			</h1>
		</>
	)
}

export default ServerComponent
