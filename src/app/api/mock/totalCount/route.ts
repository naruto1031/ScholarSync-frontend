import { TotalPageCount } from '@/app/types/apiResponseTypes'
import { NextResponse } from 'next/server'

export async function GET() {
	const testData: TotalPageCount = {
		totalPageCount: 3,
	}
	return NextResponse.json(testData)
}
