import { Box, Paper, Typography } from '@mui/material'

const menuItems = ['教科一覧', '課題表紙提出', '提出状況']
const statusDetails = [
	{ title: '課題承認率', value: '81%' },
	{ title: '承認数/課題数', value: '9/11' },
	{ title: '承認待ち', value: '1' },
	{ title: '再提出数', value: '0' },
	{ title: '未提出数', value: '1' },
]
export const TopContents = () => {
	return (
		<Box>
			<Box
				sx={{
					display: 'flex',
					justifyContent: 'center',
					flexWrap: 'wrap',
					mt: '20px',
					gap: '100px',
					marginBottom: '50px',
				}}
			>
				{menuItems.map((item) => (
					<Paper
						key={item}
						sx={{
							width: '279px',
							height: '244px',
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
							boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
							cursor: 'pointer',
						}}
					>
						<Typography>{item}</Typography>
					</Paper>
				))}
			</Box>
			<Paper
				sx={{
					background: '#fff',
					boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
					maxWidth: '1091px',
					margin: '0 auto',
					paddingBottom: '30px',
				}}
			>
				<Box sx={{ padding: '6px', borderBottom: 1, borderColor: 'divider' }}>
					<Typography variant='h6'>課題提出ステータス</Typography>
				</Box>
				<Box
					sx={{
						display: 'flex',
						justifyContent: 'space-evenly',
						flexWrap: 'wrap',
						padding: '20px',
					}}
				>
					{statusDetails.map(({ title, value }) => (
						<Box key={title} sx={{ width: '202px', textAlign: 'center', margin: '10px' }}>
							<Typography variant='subtitle1'>{title}</Typography>
							<Typography variant='h6'>{value}</Typography>
						</Box>
					))}
				</Box>
			</Paper>
		</Box>
	)
}
