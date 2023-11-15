import { options } from '@/app/options'
import { getServerSession } from 'next-auth'

export async function POST() {
	const session = await getServerSession(options)
	const res = await fetch(`${process.env.NEXTAPI_URL}/api/greeting`, {
		method: 'POST',
		headers: {
			Authorization: `Bearer ${session?.user.accessToken}`,
		},
	})
	const json = await res.json()
	console.log(json)

	return Response.json({ json })
}
