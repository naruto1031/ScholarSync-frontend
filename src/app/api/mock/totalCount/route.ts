import { TotalIssueCount } from '@/types/api-response-types'
import { NextResponse } from 'next/server'

export async function GET() {
	const testData: TotalIssueCount = {
		count: 10,
	}
	return NextResponse.json(testData)
}
