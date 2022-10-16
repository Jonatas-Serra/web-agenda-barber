import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react'
import api from '../services/api'

interface AuthState {
  token: string
  user: object
}

interface SignInCredentials {
  email: string
  password: string
}

interface AuthContextData {
  user: object
  signIn(credentioals: SignInCredentials): Promise<void>
  signOut(): void
}
interface Props {
  children: React.ReactNode
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData)

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@AgendaBarber:token')
    const user = localStorage.getItem('@AgendaBarber:user')
    const tokenGoogle = localStorage.getItem('@AgendaBarber:tokenGoogle')

    if (token && (tokenGoogle || user)) {
      return { token: tokenGoogle || token, user: JSON.parse(user) }
    }

    return {} as AuthState
  })

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('auth/login', {
      email,
      password,
    })
    const { token, user } = response.data

    localStorage.setItem('@AgendaBarber:token', token)
    localStorage.setItem('@AgendaBarber:user', JSON.stringify(user))

    setData({ token, user })
  }, [])

  const signOut = useCallback(() => {
    localStorage.removeItem('@AgendaBarber:token')
    localStorage.removeItem('@AgendaBarber:tokenGoogle')
    localStorage.removeItem('@AgendaBarber:user')

    setData({} as AuthState)
  }, [])

  const user = useMemo(
    () => ({ user: data.user, signIn, signOut }),
    [data.user, signIn, signOut],
  )

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>
}

function useAuth(): AuthContextData {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }

  return context
}

export { AuthProvider, useAuth }
