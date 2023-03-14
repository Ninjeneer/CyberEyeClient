import React, { useContext, useState, useMemo } from 'react'
import supabase from '../api/supabase'
import { Session } from '@supabase/supabase-js'

const AuthContext = React.createContext<Session>(null)

export function AuthProvider({ children }) {
    const [session, setSession] = useState<Session>()
    const [loading, setLoading] = useState(true)

    useMemo(async () => {
        // Check active sessions and sets the user
        const session = await supabase.auth.getSession()

        setSession(session?.data?.session ?? null)
        setLoading(false)

        // Listen for changes on auth state (logged in, signed out, etc.)
        const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
            setSession(session ?? null)
            setLoading(false)
        })

        return () => {
            listener?.subscription?.unsubscribe()
        }
    }, [])

    return <AuthContext.Provider value={session}> {!loading && children}</AuthContext.Provider>
}

export function useAuth() {
    return useContext(AuthContext)
}