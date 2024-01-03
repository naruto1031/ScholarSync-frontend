import { TotalIssueCount } from '@/app/types/apiResponseTypes'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
	const testData: TotalIssueCount = {
		count: 10,
	}
	return NextResponse.json(testData)
}
