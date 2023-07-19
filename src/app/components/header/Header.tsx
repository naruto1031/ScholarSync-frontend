import Link from 'next/link';
import header from './Header.module.scss'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const Header = () => {
	return (
		<header className={header.header}>
			<div className={header.title}>学生トップ</div>
			<div className={header.user}>
				<Link href={''}>
					<AccountCircleIcon style={{color: "#fff", fontSize: "2em"}} />
				</Link>
			</div>
		</header>
	)
}

export default Header
