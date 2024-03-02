'use client'
import { Class } from '@/types/api-response-types'
import { StudentSchemaType, studentSchema } from '@/types/form/schema'
import { LoadingButton } from '@mui/lab'
import {
	Box,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	FormHelperText,
	useTheme,
} from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Toast } from '@/app/components'
import { useRouter } from 'next/navigation'

interface Props {
	classList: Class[]
}

export const SignUpContents = ({ classList }: Props) => {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [isRegistered, setIsRegistered] = useState<boolean>(false)
	const [isError, setIsError] = useState<boolean>(false)
	const router = useRouter()
	const theme = useTheme()

	const onSubmit = async ({ classId, studentId, studentNumber }: StudentSchemaType) => {
		try {
			setIsLoading(true)
			await fetch('/api/student/register', {
				method: 'POST',
				body: JSON.stringify({
					classId: classId,
					studentId: studentId,
					studentNumber: studentNumber,
				}),
			})
			setIsRegistered(true)
			router.push('/student/portal/top')
		} catch (error) {
			setIsError(true)
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
	} = useForm<StudentSchemaType>({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		resolver: zodResolver(studentSchema),
		defaultValues: {
			classId: '',
			studentId: '',
			studentNumber: '',
		},
	})

	return (
		<Box
			sx={{
				m: '0px auto',
				maxWidth: '500px',
				boxShadow: '0px 0px 15px -5px #777777',
				borderRadius: '10px',
				padding: '30px 60px',
				backgroundColor: '#fff',
				[theme.breakpoints.down('sm')]: {
					mx: '10px',
					padding: '30px 30px',
				},
			}}
		>
			<Box
				sx={{
					fontSize: '24px',
					fontWeight: 'bold',
					mb: '20px',
				}}
			>
				生徒新規登録
			</Box>
			<FormControl sx={{ width: '100%' }}>
				<InputLabel id='class'>クラス</InputLabel>
				<Select
					labelId='class'
					label='クラス'
					error={!!errors.classId}
					{...register('classId')}
					disabled={isLoading}
				>
					{classList.map((classData) => (
						<MenuItem key={classData.class_id} value={`${classData.class_id}`}>
							{classData.name}
						</MenuItem>
					))}
				</Select>
				<FormHelperText
					sx={{
						mb: '20px',
					}}
					error={!!errors.classId}
				>
					{errors.classId?.message}
				</FormHelperText>
				<TextField
					label='学籍番号'
					variant='outlined'
					error={!!errors.studentId}
					helperText={errors.studentId?.message}
					sx={{
						mb: '20px',
					}}
					{...register('studentId')}
					disabled={isLoading}
				/>
				<TextField
					label='出席番号'
					variant='outlined'
					helperText={errors.studentNumber?.message}
					error={!!errors.studentNumber}
					sx={{
						mb: '20px',
					}}
					{...register('studentNumber')}
					disabled={isLoading}
				/>
			</FormControl>
			<LoadingButton
				variant='contained'
				color='primary'
				size='large'
				loading={isLoading}
				onClick={handleSubmit(onSubmit)}
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
