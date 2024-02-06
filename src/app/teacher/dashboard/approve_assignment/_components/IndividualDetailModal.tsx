import Box from '@mui/material/Box'
import Modal from '@mui/material/Modal'
import Paper from '@mui/material/Paper'
import { useTheme } from '@mui/material/styles'

export const IndividualDetailModal = () => {
	const theme = useTheme()
	// TODO: ステータス変更、チャレンジ問題の点数変更(チャレンジ問題がある場合のみ)、再提出コメントと再提出日を追加(再提出の場合のみ)、
	return (
		<Modal open={true} onClose={() => false}>
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
				<Box>個別評価設定</Box>
			</Paper>
		</Modal>
	)
}
