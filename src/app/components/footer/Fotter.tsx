import { Box, Typography } from '@mui/material'

export const Footer = () => {
	return (
		<Box
			sx={{
				backgroundColor: '#fff',
				padding: '20px 0',
				textAlign: 'center',
			}}
		>
			<Typography
				variant='body1'
				sx={{
					color: '#929292',
					fontSize: '14px',
				}}
			>
				© 2024 scholar-sync All Rights Reserved.
			</Typography>
		</Box>
	)
}
