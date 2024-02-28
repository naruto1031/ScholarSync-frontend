import { options } from '@/app/options'
import { IssueCoverStatusCount } from '@/types/api-response-types'
import { getServerSession } from 'next-auth'
import { TopContents } from './TopContents'

export default async function Top() {
	const session = await getServerSession(options)
	const res = await fetch(`${process.env.API_URL}/api/issue/cover/count`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${session?.user.accessToken}`,
		},
	})
	const issueCount: IssueCoverStatusCount = await res.json()
	return <TopContents count={issueCount} />
}
