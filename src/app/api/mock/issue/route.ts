import { PendingIssuesResponse } from '@/app/types/apiResponseTypes'
import { NextResponse } from 'next/server'
export async function GET() {
	const testData: PendingIssuesResponse = {
		issues: [
			{
				issueID: 1,
				issueName: '基本的なプログラミング概念',
				subjectName: 'CS11',
				dueDate: '2023-10-01',
				challengeProblemFlag: true,
				challengeProblemFullMark: 15,
			},
			{
				issueID: 2,
				issueName: 'オブジェクト指向設計',
				subjectName: 'CS12',
				dueDate: '2023-10-05',
				challengeProblemFlag: true,
				challengeProblemFullMark: 20,
			},
			{
				issueID: 3,
				issueName: 'データ構造とアルゴリズム',
				subjectName: 'CS13',
				dueDate: '2023-10-10',
				challengeProblemFlag: true,
				challengeProblemFullMark: 18,
			},
			{
				issueID: 4,
				issueName: 'ウェブ開発の基礎',
				subjectName: 'CS14',
				dueDate: '2023-10-15',
				challengeProblemFlag: false,
				challengeProblemFullMark: 0,
			},
			{
				issueID: 5,
				issueName: 'データベースシステム',
				subjectName: 'CS15',
				dueDate: '2023-10-20',
				challengeProblemFlag: true,
				challengeProblemFullMark: 20,
			},
			{
				issueID: 6,
				issueName: 'ソフトウェアテストと品質保証',
				subjectName: 'CS16',
				dueDate: '2023-10-25',
				challengeProblemFlag: true,
				challengeProblemFullMark: 15,
			},
			{
				issueID: 7,
				issueName: 'モバイルアプリ開発',
				subjectName: 'CS17',
				dueDate: '2023-10-30',
				challengeProblemFlag: false,
				challengeProblemFullMark: 0,
			},
			{
				issueID: 8,
				issueName: '機械学習の基礎',
				subjectName: 'CS18',
				dueDate: '2023-11-01',
				challengeProblemFlag: true,
				challengeProblemFullMark: 20,
			},
			{
				issueID: 9,
				issueName: 'クラウドコンピューティング',
				subjectName: 'CS19',
				dueDate: '2023-11-05',
				challengeProblemFlag: true,
				challengeProblemFullMark: 18,
			},
			{
				issueID: 10,
				issueName: 'セキュリティと暗号化',
				subjectName: 'CS20',
				dueDate: '2023-11-10',
				challengeProblemFlag: true,
				challengeProblemFullMark: 15,
			},
		],
	}

	return NextResponse.json(testData)
}
