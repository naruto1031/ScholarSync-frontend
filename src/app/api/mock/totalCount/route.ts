import { TotalIssueCount } from '@/app/types/apiResponseTypes'
import { NextResponse } from 'next/server'

export async function GET() {
	const testData: TotalIssueCount = {
		totalIssueCount: 10,
	}
	return NextResponse.json(testData)
}
