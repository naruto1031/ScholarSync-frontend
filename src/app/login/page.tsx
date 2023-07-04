'use client'

import React, { ChangeEvent, useState } from 'react'
import axios from 'axios'

const LoginForm = () => {
	const [userInformation, setUserInformation] = useState({
		email: '',
		password: '',
	})

	// console.log(localStorage.getItem("auth_token"));

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault()

		const response = await axios.post('http://localhost:8000/api/register', userInformation)

		if (response.status) localStorage.setItem('auth_token', response.data.access_token)

		console.log(response)
	}

	const changeInformation = (e: ChangeEvent) => {
		let { target } = e
		if (!(target instanceof HTMLInputElement)) return

		setUserInformation({ ...userInformation, [target.name]: target.value })

		console.log(userInformation)
	}

	return (
		<form onSubmit={handleSubmit}>
			<label>
				Email:
				<input
					name='email'
					type='email'
					onChange={(e) => changeInformation(e)}
				/>
			</label>
			<label>
				Password:
				<input
					name='password'
					type='password'
					onChange={(e) => changeInformation(e)}
				/>
			</label>
			<input type='submit' value='Submit' />
		</form>
	)
}
export default LoginForm
