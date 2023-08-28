'use client'

import React, { ChangeEvent, useState } from 'react'
import axios from 'axios'
import signup from './signup.module.scss'

const Signup = () => {
	const [userInformation, setUserInformation] = useState({
		name: '',
		email: '',
		password: '',
	})

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault()

		const response = await axios.post('http://127.0.0.1:8000/api/register', userInformation)

		localStorage.setItem('auth_token', response.data.access_token)

		console.log(response)
	}

	const changeInformation = (e: ChangeEvent) => {
		let { target } = e
		if (!(target instanceof HTMLInputElement)) return

		setUserInformation({ ...userInformation, [target.name]: target.value })

		console.log(userInformation)
	}

	return (
		<>
			<div className={signup.page}>
				<form className={signup.form_content} onSubmit={handleSubmit}>
					<div className={signup.title}>
						<h2>会員登録画面</h2>
					</div>
					<div className={signup.name}>
						<label>
							Name:
							<input type='text' name='name' onChange={(e) => changeInformation(e)} />
						</label>
					</div>
					<div className={signup.name}>
						<label>
							Email:
							<input type='email' name='email' onChange={(e) => changeInformation(e)} />
						</label>
					</div>
					<div className={signup.password}>
						<label>
							Password:
							<input type='password' name='password' onChange={(e) => changeInformation(e)} />
						</label>
					</div>
					<div className={signup.submit}>
						<label className='submit-label'>
							<input type='submit' value='Submit' />
						</label>
					</div>
				</form>
			</div>
		</>
	)
}

export default Signup
