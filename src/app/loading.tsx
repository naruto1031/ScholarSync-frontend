import { Box, CircularProgress } from '@mui/material'

export default function Loading() {
	return (
		<Box
			sx={{
				position: 'fixed',
				top: 0,
				left: 0,
				width: '100%',
				height: '100%',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: 'rgba(255, 255, 255, 0.9)',
				zIndex: 1000,
			}}
		>
			<CircularProgress />
		</Box>
	)
}
