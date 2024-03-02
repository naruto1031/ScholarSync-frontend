import { ExemptionIssueCover } from '@/types/api-response-types'
import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'
import { Dispatch, SetStateAction } from 'react'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import dayjs from 'dayjs'
import LoadingButton from '@mui/lab/LoadingButton'
import { convertStatus } from '@/utils/statusUtils'

dayjs.extend(utc)
dayjs.extend(timezone)

interface Props {
	modalOpen: boolean
	setModalOpen: Dispatch<SetStateAction<boolean>>
	currentUpdateIssueCover: ExemptionIssueCover | null
	setCurrentUpdateIssueCover: Dispatch<SetStateAction<ExemptionIssueCover | null>>
	isStatusUpdateLoading: boolean
	onSubmit: () => Promise<void>
}

export const ApproveModal = ({
	currentUpdateIssueCover,
	modalOpen,
	setModalOpen,
	isStatusUpdateLoading,
	onSubmit,
}: Props) => {
	const theme = useTheme()
	return (
		<Modal open={modalOpen} onClose={() => false}>
			<Paper
				sx={{
					maxWidth: '700px',
					width: '100%',
					maxHeight: '80%',
					overflow: 'auto',
					position: 'absolute',
					top: '50%',
					left: '50%',
					boxShadow: '0px 0px 15px -5px #777777',
					borderRadius: '10px',
					transform: 'translate(-50%, -50%)',
					backgroundColor: '#fff',
					border: 'none',
					padding: '30px 60px',
					'&:focus': {
						outline: 'none',
					},
					'&:active': {
						outline: 'none',
					},
					[theme.breakpoints.down('md')]: {
						maxWidth: '70%',
						padding: '20px 30px',
					},
					[theme.breakpoints.down('sm')]: {
						padding: '15px 20px',
					},
				}}
			>
				<Box
					sx={{
						fontSize: '25px',
						fontWeight: 'bold',
						marginBottom: '20px',
					}}
				>
					免除課題申請詳細
				</Box>
				<Box>
					<Box>学科名: {currentUpdateIssueCover?.subject}</Box>
					<Box>課題No.{currentUpdateIssueCover?.task_number}</Box>
					<Box>課題名: {currentUpdateIssueCover?.name}</Box>
					<Box>
						提出期限:{' '}
						{dayjs
							.utc(currentUpdateIssueCover?.due_date)
							.tz('Asia/Tokyo')
							.format('YYYY/MM/DD HH:mm')}
					</Box>
				</Box>
				<Box
					sx={{
						marginTop: '20px',
						fontSize: '20px',
						fontWeight: 'bold',
					}}
				>
					学生情報
				</Box>
				<Box
					sx={{
						border: '1px solid #ccc',
						padding: '10px',
						borderRadius: '10px',
						marginTop: '10px',
						display: 'flex',
						gap: '20px',
						alignItems: 'center',
					}}
				>
					<Box
						sx={{
							width: '150px',
						}}
					>
						名前: {currentUpdateIssueCover?.student_name}
					</Box>
					<Box
						sx={{
							width: '150px',
						}}
					>
						学籍番号: {currentUpdateIssueCover?.registration_number}
					</Box>
					<Box
						sx={{
							width: '150px',
						}}
					>
						出席番号: {currentUpdateIssueCover?.attendance_number}
					</Box>
				</Box>
				<Box
					sx={{
						marginTop: '20px',
					}}
				>
					<Box
						sx={{
							fontSize: '20px',
							fontWeight: 'bold',
						}}
					>
						ステータス
					</Box>
					<Box>{convertStatus(currentUpdateIssueCover?.status)}</Box>
				</Box>

				<Box>
					<Box
						sx={{
							fontSize: '20px',
							fontWeight: 'bold',
							marginTop: '20px',
						}}
					>
						コメント
					</Box>
					<Box>{currentUpdateIssueCover?.comment || '無し'}</Box>
				</Box>

				<Box
					sx={{
						display: 'flex',
						gap: '40px',
						justifyContent: 'right',
						marginTop: '20px',
					}}
				>
					<LoadingButton
						loading={isStatusUpdateLoading}
						disabled={isStatusUpdateLoading}
						variant='outlined'
						onClick={() => setModalOpen(false)}
					>
						キャンセル
					</LoadingButton>
					{currentUpdateIssueCover?.status === 'pending_exemption_approval' && (
						<LoadingButton loading={isStatusUpdateLoading} variant='contained' onClick={onSubmit}>
							免除申請を許可
						</LoadingButton>
					)}
				</Box>
			</Paper>
		</Modal>
	)
}
