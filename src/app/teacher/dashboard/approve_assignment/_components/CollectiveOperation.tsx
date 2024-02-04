import LoadingButton from '@mui/lab/LoadingButton'
import Box from '@mui/material/Box'
import { Dispatch, SetStateAction } from 'react'

interface Props {
	setCollectiveModalStatus: Dispatch<SetStateAction<'approved' | 'reject'>>
	setCollectiveModalOpen: Dispatch<SetStateAction<boolean>>
	isIssueCoverExist: boolean
}

export const CollectiveOperation = ({
	setCollectiveModalStatus,
	setCollectiveModalOpen,
	isIssueCoverExist,
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
				disabled={!isIssueCoverExist}
				onClick={() => {
					setCollectiveModalStatus('reject')
					setCollectiveModalOpen(true)
				}}
			>
				一括差戻
			</LoadingButton>
			<LoadingButton
				variant='contained'
				color='primary'
				disabled={!isIssueCoverExist}
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
