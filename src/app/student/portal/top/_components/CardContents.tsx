'use client'
import { Box, Paper, SvgIconTypeMap } from '@mui/material'
import { OverridableComponent } from '@mui/material/OverridableComponent'
import Link from 'next/link'

interface Props {
	title: string
	icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
		muiName: string
	}
	url: string
}

export const CardContents = (props: Props) => {
	return (
		<Link
			href={`/student/portal/${props.url}`}
			style={{
				width: 'fit-content',
				textDecoration: 'none',
			}}
			prefetch={true}
		>
			<Paper
				sx={{
					width: '100px',
					padding: '10px',
				}}
			>
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Box
						sx={{
							fontSize: '24px',
						}}
					>
						<props.icon
							sx={{
								fontSize: '50px',
							}}
						/>
					</Box>
					<Box>
						<Box>{props.title}</Box>
					</Box>
				</Box>
			</Paper>
		</Link>
	)
}
