'use client'
import { Class, Subject } from '@/app/types/apiResponseTypes'
import {
	StudentSchemaType,
	TeacherSchemaType,
	studentSchema,
	teacherSchema,
} from '@/app/types/form/schema'
import { LoadingButton } from '@mui/lab'
import {
	Box,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	FormHelperText,
	FormControlLabel,
	Radio,
	RadioGroup,
} from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Toast } from '@/app/components'
import { useRouter } from 'next/navigation'

interface Props {
	classList: Class[]
	subjects: Subject[]
}

export const SignUpContents = ({ classList, subjects }: Props) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isRegistered, setIsRegistered] = useState<boolean>(false)
	const [isError, setIsError] = useState<boolean>(false)
	const [hasClass, setHasClass] = useState<boolean>(false)
	const router = useRouter()

	const onSubmit = async ({ classId, teacherSubjects }: TeacherSchemaType) => {
		try {
			setIsLoading(true)
			await fetch('/api/teacher/register', {
				method: 'POST',
				body: JSON.stringify({
					classId: classId,
					teacherSubjects: teacherSubjects,
				}),
			})
			setIsRegistered(true)
			router.push('/entrance/teacher/dashboard')
		} catch (error: unknown) {
			if (error instanceof Error) {
				console.error(error)
				setIsError(true)
			}
			return
		}
	}

	const handleRegisterClose = () => {
		setIsRegistered(false)
	}

	const handleErrorClose = () => {
		setIsError(false)
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TeacherSchemaType>({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		resolver: zodResolver(teacherSchema),
		defaultValues: {
			classId: '',
			teacherSubjects: [],
		},
	})

	return (
		<Box
			sx={{
				m: '0px auto',
				width: '500px',
				boxShadow: '0px 0px 15px -5px #777777',
				borderRadius: '10px',
				padding: '30px 60px',
				backgroundColor: '#fff',
			}}
		>
			<Box
				sx={{
					fontSize: '24px',
					fontWeight: 'bold',
					mb: '20px',
				}}
			>
				教員新規登録
			</Box>
			<FormControl
				sx={{
					mb: '20px',
					width: 'fit-content',
				}}
			>
				<RadioGroup
					aria-label='has-class'
					name='has-class'
					value={hasClass}
					onChange={(_, value) => {
						setHasClass(value === 'true')
					}}
					sx={{
						width: 'fit-content',
					}}
				>
					<Box>担任クラスを持っていますか？</Box>
					<FormControlLabel value={false} control={<Radio />} label='いいえ' />
					<FormControlLabel value={true} control={<Radio />} label='はい' />
				</RadioGroup>
			</FormControl>

			<FormControl sx={{ width: '100%', mb: '30px' }}>
				<InputLabel id='class'>担任クラス</InputLabel>
				<Select
					labelId='class'
					label='担任クラス'
					error={!!errors.classId}
					{...register('classId')}
					disabled={isLoading || !hasClass}
					defaultValue={''}
				>
					{classList.map((classData) => (
						<MenuItem key={classData.class_id} value={`${classData.class_id}`}>
							{classData.name}
						</MenuItem>
					))}
				</Select>
			</FormControl>
			<FormControl sx={{ width: '100%', mb: '20px' }}>
				<InputLabel id='teacher-subjects'>担当教科</InputLabel>
				<Select
					labelId='teacher-subjects'
					label='担当教科'
					error={!!errors.teacherSubjects}
					{...register('teacherSubjects')}
					disabled={isLoading}
					multiple
					defaultValue={[]}
				>
					{subjects.map((subject) => (
						<MenuItem key={subject.id} value={`${subject.id}`}>
							{subject.name}
						</MenuItem>
					))}
				</Select>
				<FormHelperText>複数選択可</FormHelperText>
			</FormControl>
			<LoadingButton
				variant='contained'
				color='primary'
				size='large'
				loading={isLoading}
				onClick={handleSubmit(onSubmit)}
				sx={{
					width: 'fit-content',
					ml: 'auto',
				}}
			>
				登録
			</LoadingButton>
			<Toast
				message='登録しました'
				severity='success'
				open={isRegistered}
				handleClose={handleRegisterClose}
			/>
			<Toast
				message='登録に失敗しました'
				severity='error'
				open={isError}
				handleClose={handleErrorClose}
			/>
		</Box>
	)
}
