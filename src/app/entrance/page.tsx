import { Container } from "@mui/material";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { options } from "../options";

export default async function Entrance() {
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
  return (    
    <Container>
      <h1>Entrance</h1>
      {(isStudent || isAdministrator) && (
        <Link href={'/entrance/student/dashboard/submit_assignment'}>学生ページへ</Link>
      )}
      {(isTeacher || isAdministrator) && (
        <Link href={'/entrance/teacher'}>教員ページへ</Link>
      )}
    </Container>
  )
}