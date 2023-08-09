import SingInButton from '@/app/components/button/SignInButton'
import { options } from '@/app/options'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import styles from './login.module.scss'

export default async function Component() {
	const session = await getServerSession(options)
	if (session?.user) {
		redirect('/student/dashboard/top')
	}
	return (
		<>
			<div className={styles.main}>
				<div className={styles.page}>
					<div className={styles.wrapper}>
						<div className='title'>
							<h1>学生サインイン</h1>
							<p>Microsoftアカウントが必要です</p>
						</div>
						<SingInButton />
					</div>
				</div>
			</div>
		</>
	)
}
