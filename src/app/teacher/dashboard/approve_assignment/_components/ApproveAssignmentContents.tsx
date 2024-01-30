'use client'

import {
	IssueCoverSearchCondition,
	IssueCoverSearchConditionResponse,
	TeacherSubjectAssign,
} from '@/types/apiResponseTypes'
import { AssignmentSearchConditionSchemaType } from '@/types/form/schema'
import Box from '@mui/material/Box'
import { SearchCondition } from './SearchCondition'
import { ResultTable } from './ResultTable'
import { useState } from 'react'

interface Props {
	teacherSubjects: TeacherSubjectAssign[]
}

export const ApproveAssignmentContents = ({ teacherSubjects }: Props) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [issueCoverData, setIssueCoverData] = useState<IssueCoverSearchCondition[]>([])

	const onSubmit = async (data: AssignmentSearchConditionSchemaType) => {
		setIsLoading(true)
		const res = await fetch('/api/approve_assignment/search', {
			method: 'POST',
			body: JSON.stringify(data),
		})
		const resData: IssueCoverSearchConditionResponse = await res.json()
		setIssueCoverData(resData.issue_covers)
		console.log(resData.issue_covers)
		setIsLoading(false)
	}

	return (
		<Box
			sx={{
				mt: '20px',
				display: 'flex',
				flexDirection: 'column',
				gap: '20px',
			}}
		>
			<SearchCondition
				onSubmit={onSubmit}
				teacherSubjects={teacherSubjects}
				searchLoading={isLoading}
			/>
			<ResultTable issueCoverData={issueCoverData} isLoading={isLoading} />
		</Box>
	)
}
