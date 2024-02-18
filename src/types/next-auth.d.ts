import NextAuth, { DefaultSession } from 'next-auth'
import { JWT } from 'next-auth/jwt'

declare module 'next-auth' {
	/**
	 * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
	 */
	interface Session {
		user: {
			/** Oauth access token */
			accessToken?: accessToken
			idToken?: string
			refreshToken?: string
			groups?: string[] | null
			isTeacher?: boolean
			isStudent?: boolean
		} & DefaultSession['user']
	}
}

declare module 'next-auth/jwt' {
	/** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
	interface JWT {
		/** OpenID ID Token */
		idToken?: string
		accessToken?: string
		refreshToken?: string
		accessTokenExpires?: number
	}
}

export interface JwtToken {
	accessToken?: string
	idToken?: string
	refreshToken?: string
}
