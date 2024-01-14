import { Box, CircularProgress } from '@mui/material'

export default function Loading() {
	return (
		<Box
			sx={{
				position: 'fixed',
				top: { xs: 0, sm: '64px' },
				left: { xs: 0, sm: '240px' },
				width: { xs: '100%', sm: 'calc(100% - 240px)' },
				height: { xs: '100%', sm: 'calc(100% - 64px)' },
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
