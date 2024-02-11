import { options } from '@/app/options'
import { NotificationRegisterSchemaType } from '@/types/form/schema'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
	const requestData: NotificationRegisterSchemaType = await request.json()
	const apiKey = process.env.ROOM_NOTIFY_API_KEY || ''
	const session = await getServerSession(options)
	if (!session) return new NextResponse('Unauthorized', { status: 401 })
	try {
		const res = await fetch(`${process.env.API_URL}/api/discord/guild/${requestData.classId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${session?.user.accessToken}`,
			},
		})
		if (!res.ok) return new NextResponse(res.statusText, { status: res.status })

		const guildData = await res.json()
		if (Object.keys(guildData).length === 0)
			return new NextResponse('Guild Not Found', { status: 404 })
		console.log(
			'guildData',
			guildData,
			'requestData',
			requestData,
			'session',
			session.user.name,
			'apiKey',
			apiKey,
			'process.env.ROOM_NOTIFY_API_URL',
			process.env.ROOM_NOTIFY_API_URL,
		)
		const notifyRes = await fetch(`${process.env.ROOM_NOTIFY_API_URL}`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'api-key': apiKey,
			},
			body: JSON.stringify({
				guild_id: guildData.guild_id,
				teacher: session.user.name,
				subject: requestData.subject,
				title: requestData.title,
				memo: requestData.memo,
				state: true,
				entry_user_avatar: '',
				entry_user_id: '',
				entry_user_name: session.user.name,
				entry_date: new Date().getTime(),
			}),
		})
		if (notifyRes.status !== 200)
			return new NextResponse(notifyRes.statusText, { status: notifyRes.status })

		return NextResponse.json(res.statusText, { status: 200 })
	} catch (error) {
		console.error(error)
		return new NextResponse('Internal Server Error', { status: 500 })
	}
}
