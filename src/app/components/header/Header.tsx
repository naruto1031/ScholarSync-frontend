"use client"
import Link from 'next/link'
import header from './Header.module.scss'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import { signOut } from 'next-auth/react'

const Header = () => {
	return (
		<header className={header.header}>
			<div className={header.title} onClick={() => signOut()} >学生トップ</div>
			<div className={header.user}>
				<Link href={'/student/dashboard/top'}>
					<AccountCircleIcon style={{ color: '#fff', fontSize: '2em' }} />
				</Link>
			</div>
		</header>
	)
}

export default Header
