import { TotalIssueCount } from '@/types/apiResponseTypes'
import { NextResponse } from 'next/server'

export async function GET() {
	const testData: TotalIssueCount = {
		count: 10,
	}
	return NextResponse.json(testData)
}
