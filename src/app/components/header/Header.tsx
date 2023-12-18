'use client'
import Link from 'next/link'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { signOut } from 'next-auth/react'
import { css } from '../../../../styled-system/css'

export const Header = () => {
	return (
		<header
			className={css({
				width: 'calc(100% - 250px)',
				height: '64px',
				backgroundColor: '#1664c0',
				marginLeft: '250px',
				display: 'flex',
				alignItems: 'center',
			})}
		>
			<div
				className={css({
					m: '0',
					color: '#fff',
					fontSize: '20px',
					marginLeft: '20px',
				})}
				onClick={() => signOut()}
			>
				学生トップ
			</div>
			<div
				className={css({
					justifyContent: 'flex-end',
					width: '50px',
					marginLeft: 'auto',
					marginRight: '20px',
				})}
			>
				<Link href={'/entrance/student/dashboard/top'}>
					<AccountCircleIcon style={{ color: '#fff', fontSize: '2em' }} />
				</Link>
			</div>
		</header>
	)
}
