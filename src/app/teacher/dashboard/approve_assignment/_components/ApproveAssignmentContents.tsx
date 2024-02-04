'use client'

import {
	IssueCoverSearchCondition,
	IssueCoverSearchConditionResponse,
	TeacherSubjectAssign,
} from '@/types/api-response-types'
import { AssignmentSearchConditionSchemaType } from '@/types/form/schema'
import Box from '@mui/material/Box'
import { SearchCondition } from './SearchCondition'
import { ResultTable } from './ResultTable'
import { useState } from 'react'
import { CollectiveOperation } from './CollectiveOperation'
import { CollectiveDetailModal } from './CollectiveDetailModal'
import { Toast } from '@/app/components'

interface Props {
	teacherSubjects: TeacherSubjectAssign[]
}

export const ApproveAssignmentContents = ({ teacherSubjects }: Props) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [issueCoverData, setIssueCoverData] = useState<IssueCoverSearchCondition[]>([])
	const [collectiveModalStatus, setCollectiveModalStatus] = useState<'approved' | 'reject'>(
		'approved',
	)
	const [collectiveModalOpen, setCollectiveModalOpen] = useState<boolean>(false)
	const [currentScore, setCurrentScore] = useState<number>(0)
	const [isError, setIsError] = useState<boolean>(false)
	const [isSuccess, setIsSuccess] = useState<boolean>(false)
	const [isSetEvaluation, setIsSetEvaluation] = useState<boolean>(false)

	const onSubmit = async (data: AssignmentSearchConditionSchemaType) => {
		setIsLoading(true)
		try {
			const res = await fetch('/api/approve_assignment/search', {
				method: 'POST',
				body: JSON.stringify(data),
			})
			if (!res.ok) {
				throw new Error('Network response was not ok')
			}
			const resData: IssueCoverSearchConditionResponse = await res.json()
			setIssueCoverData(resData.issue_covers)
			console.log(resData.issue_covers)
		} catch (error) {
			console.error(error)
		}
		setIsLoading(false)
	}

	const onSubmitCollective = async () => {
		setIsLoading(true)
		try {
			const res = await fetch('/api/approve_assignment/collective', {
				method: 'POST',
				body: JSON.stringify({
					issue_cover_ids: issueCoverData.map((issueCover) => String(issueCover.issue_cover_id)),
					status: collectiveModalStatus,
					evaluation: isSetEvaluation ? String(currentScore) : undefined,
				}),
			})
			if (!res.ok) {
				throw new Error('Network response was not ok')
			}
			const resData: IssueCoverSearchConditionResponse = await res.json()
			setIssueCoverData(resData.issue_covers)
			setIsSuccess(true)
		} catch (error) {
			console.error(error)
			setIsError(true)
		}
		setIsLoading(false)
		setCollectiveModalOpen(false)
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
			<CollectiveOperation
				setCollectiveModalStatus={setCollectiveModalStatus}
				setCollectiveModalOpen={setCollectiveModalOpen}
				isIssueCoverExist={issueCoverData.length > 0}
			/>
			<ResultTable issueCoverData={issueCoverData} isLoading={isLoading} />
			<CollectiveDetailModal
				isOpen={collectiveModalOpen}
				modalStatus={collectiveModalStatus}
				issueCoverData={issueCoverData}
				setIsModalOpen={setCollectiveModalOpen}
				currentScore={currentScore}
				setCurrentScore={setCurrentScore}
				onSubmitCollective={onSubmitCollective}
				isSetEvaluation={isSetEvaluation}
				setIsSetEvaluation={setIsSetEvaluation}
			/>
			<Toast
				open={isError}
				handleClose={() => setIsError(false)}
				severity='error'
				message='エラーが発生しました'
			/>
			<Toast
				open={isSuccess}
				handleClose={() => setIsSuccess(false)}
				severity='success'
				message='生徒情報を登録しました'
			/>
		</Box>
	)
}
