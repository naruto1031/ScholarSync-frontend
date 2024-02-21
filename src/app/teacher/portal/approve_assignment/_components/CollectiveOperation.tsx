import { IssueCoverSearchCondition } from '@/types/api-response-types'
import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import { Dispatch, SetStateAction } from 'react'

interface Props {
	setCollectiveModalStatus: Dispatch<SetStateAction<'approved' | 'reject'>>
	setCollectiveModalOpen: Dispatch<SetStateAction<boolean>>
	isIssueCoverExist: boolean
	issueCoverData: IssueCoverSearchCondition[]
}

export const CollectiveOperation = ({
	setCollectiveModalStatus,
	setCollectiveModalOpen,
	isIssueCoverExist,
	issueCoverData,
}: Props) => {
	return (
		<Box
			sx={{
				display: 'flex',
				gap: '40px',
				justifyContent: 'right',
			}}
		>
			<LoadingButton
				variant='outlined'
				color='error'
				disabled={
					!isIssueCoverExist ||
					!issueCoverData.some(
						(issueCover) =>
							issueCover.status === 'pending' ||
							issueCover.status === 'resubmission' ||
							issueCover.status === 'rejected',
					) ||
					issueCoverData.some((issueCover) => issueCover.status === 'not_submitted')
				}
				onClick={() => {
					setCollectiveModalStatus('reject')
					setCollectiveModalOpen(true)
				}}
			>
				一括差戻・拒否
			</LoadingButton>
			<LoadingButton
				variant='contained'
				color='primary'
				disabled={
					!isIssueCoverExist ||
					!issueCoverData.some(
						(issueCover) =>
							issueCover.status === 'pending' ||
							issueCover.status === 'rejected' ||
							issueCover.status === 'resubmission',
					) ||
					issueCoverData.some((issueCover) => issueCover.status === 'not_submitted')
				}
				onClick={() => {
					setCollectiveModalStatus('approved')
					setCollectiveModalOpen(true)
				}}
			>
				一括承認
			</LoadingButton>
		</Box>
	)
}
