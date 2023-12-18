import { options } from '@/app/options'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { SignInButton } from '@/app/components'
import styles from './login.module.scss'

export default async function Component() {
	const session = await getServerSession(options)
  const studentGroupID = process.env.STUDENT
  const teacherGroupID = process.env.TEACHER
  if (!studentGroupID) {
    throw new Error('STUDENT environment variable is not set.')
  }
  if (!teacherGroupID) {
    throw new Error('TEACHER environment variable is not set.')
  }
  const isStudent = session?.user.groups?.includes(studentGroupID)
  const isTeacher = session?.user.groups?.includes(teacherGroupID)
  const isAdministrator = session?.user.groups?.includes(teacherGroupID) && session?.user.groups?.includes(studentGroupID)
  if (isAdministrator) redirect('/entrance')
  if (isStudent) redirect('/entrance/student/dashboard/submit_assignment')
  if (isTeacher) redirect('/entrance/teacher')
	return (
		<>
			<div className={styles.main}>
				<div className={styles.page}>
					<div className={styles.wrapper}>
						<div className='title'>
							<h1>サインイン</h1>
							<p>Microsoftアカウントが必要です</p>
						</div>
						<SignInButton />
					</div>
				</div>
			</div>
		</>
	)
}
