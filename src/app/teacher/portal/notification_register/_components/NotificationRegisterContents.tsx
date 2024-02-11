'use client'
import { CheckDialog, ConfirmDialogProps, Toast } from '@/app/components'
import { TeacherSubjectAssign } from '@/types/api-response-types'
import { notificationRegisterSchema, NotificationRegisterSchemaType } from '@/types/form/schema'
import { notifyMessageTemplate } from '@/utils/notifyMessageTemplate'
import { zodResolver } from '@hookform/resolvers/zod'
import { LoadingButton } from '@mui/lab'
import Box from '@mui/material/Box'
import FormControl from '@mui/material/FormControl'
import FormHelperText from '@mui/material/FormHelperText'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import Image from 'next/image'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

// TODO: 承認待ちの課題表紙総数を表示(要対応な情報を表示)
interface Props {
	teacherSubjectAssignData: TeacherSubjectAssign[]
}

export const NotificationRegisterContents = ({ teacherSubjectAssignData }: Props) => {
	const [isLoading, setIsLoading] = useState(false)
	const [modalConfig, setModalConfig] = useState<ConfirmDialogProps | undefined>()
	const [currentTemplate, setCurrentTemplate] = useState<string>('')
	const [isSuccess, setIsSuccess] = useState(false)
	const [isError, setIsError] = useState(false)
	const {
		register,
		handleSubmit,
		watch,
		reset,
		setValue,
		formState: { errors },
	} = useForm<NotificationRegisterSchemaType>({
		mode: 'onBlur',
		reValidateMode: 'onBlur',
		resolver: zodResolver(notificationRegisterSchema),
		defaultValues: {
			subject: '',
			classId: '',
			title: '',
			memo: '',
		},
	})

	const onSubmit = async (data: NotificationRegisterSchemaType) => {
		setIsLoading(true)
		const ret = await new Promise<string>((resolve) => {
			setModalConfig({
				onClose: resolve,
				title: '生徒に通知します',
				message: '通知すると編集することができません。よろしいですか？',
			})
		})
		setModalConfig(undefined)
		if (ret === 'ok') {
			try {
				const res = await fetch('/api/notify', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(data),
				})
				if (!res.ok) {
					throw new Error('通知に失敗しました')
				}
				reset({
					title: '',
					memo: '',
				})
				setCurrentTemplate('')
				setIsSuccess(true)
			} catch (error) {
				console.error(error)
				setIsError(true)
			}
		}
		setIsLoading(false)
	}

	return (
		<Box>
			<Paper
				sx={{
					py: '20px',
					px: '40px',
					my: '20px',
				}}
			>
				<Box
					sx={{
						mb: '20px',
						width: '100%',
						borderBottom: '1px solid #E0E0E0',
						paddingBottom: '10px',
					}}
				>
					<Box
						sx={{
							fontSize: '20px',
							fontWeight: 'bold',
							display: 'flex',
							alignItems: 'center',
						}}
					>
						<Box
							sx={{
								mt: '5px',
							}}
						>
							<Image
								src='/room_notify_v2_icon_clear.png'
								width={30}
								height={30}
								alt='room_notify_v2_icon_clear'
							/>
						</Box>
						教室通知くんにメッセージを送信
					</Box>
				</Box>
				<Box
					sx={{
						width: '100%',
						display: 'flex',
						flexWrap: 'wrap',
						gap: '20px',
					}}
				>
					<FormControl sx={{ width: '200px' }} size='small'>
						<InputLabel id='teacher-subjects'>担当教科</InputLabel>
						<Select
							labelId='teacher-subjects'
							label='担当教科'
							error={!!errors.subject}
							{...register('subject')}
							defaultValue={''}
							disabled={teacherSubjectAssignData.length === 0 || isLoading}
						>
							{teacherSubjectAssignData.map((subject) => (
								<MenuItem key={subject.teacher_subject_id} value={`${subject.name}`}>
									{subject.name}
								</MenuItem>
							))}
						</Select>
						{errors.subject?.message && (
							<FormHelperText error>{errors.subject?.message}</FormHelperText>
						)}
					</FormControl>

					<FormControl sx={{ width: '200px' }} size='small'>
						<InputLabel id='school_class'>クラス</InputLabel>
						<Select
							labelId='school_class'
							label='クラス'
							error={!!errors.classId}
							{...register('classId')}
							defaultValue={''}
							disabled={watch('subject') === undefined || watch('subject') === '' || isLoading}
						>
							{watch('subject') &&
								teacherSubjectAssignData
									.find((subject) => subject.name === watch('subject'))
									?.departments.map((department) => {
										return department.classes.map((classData) => (
											<MenuItem key={classData.class_id} value={`${classData.class_id}`}>
												{department.name}
												{classData.name}
											</MenuItem>
										))
									})}
						</Select>
						{errors.classId?.message && (
							<FormHelperText error>{errors.classId?.message}</FormHelperText>
						)}
					</FormControl>
				</Box>

				<Box
					sx={{
						mt: '20px',
						width: '500px',
					}}
				>
					<FormControl sx={{ width: '200px' }} size='small'>
						<InputLabel id='template'>テンプレート</InputLabel>
						<Select
							labelId='template'
							label='テンプレート'
							disabled={isLoading}
							value={currentTemplate}
						>
							{notifyMessageTemplate.map((template) => (
								<MenuItem
									key={template.label}
									value={template.label}
									onClick={() => {
										setValue('title', template.title)
										setValue('memo', template.body)
										setCurrentTemplate(template.label)
									}}
								>
									{template.label}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</Box>
				<Box
					sx={{
						mt: '20px',
						maxWidth: '500px',
					}}
				>
					<FormControl sx={{ width: '100%' }}>
						<TextField
							label='タイトル'
							variant='outlined'
							error={!!errors.title}
							helperText={errors.title?.message}
							sx={{
								mb: '20px',
							}}
							value={watch('title')}
							{...register('title')}
							disabled={isLoading}
						/>
					</FormControl>
				</Box>
				<Box
					sx={{
						mt: '20px',
					}}
				>
					<FormControl sx={{ width: '100%' }}>
						<TextField
							label='本文'
							variant='outlined'
							error={!!errors.memo}
							multiline={true}
							helperText={errors.memo?.message}
							rows={3}
							sx={{
								mb: '20px',
							}}
							{...register('memo')}
							value={watch('memo')}
							disabled={isLoading}
						/>
					</FormControl>
				</Box>
				<Box
					sx={{
						width: '100%',
						display: 'flex',
						gap: '20px',
					}}
				>
					<LoadingButton
						variant='contained'
						size='large'
						onClick={handleSubmit(onSubmit)}
						loading={isLoading}
					>
						送信
					</LoadingButton>
				</Box>
			</Paper>
			{modalConfig && <CheckDialog {...modalConfig} />}
			<Toast
				open={isError}
				handleClose={() => setIsError(false)}
				severity='error'
				message='エラーが発生しました'
			/>
			<Toast
				open={isSuccess}
				handleClose={() => setIsSuccess(false)}
				severity='success'
				message='生徒への通知が完了しました。'
			/>
		</Box>
	)
}
