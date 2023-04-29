import React, { useContext, useState, useMemo } from 'react'
import supabase from '../api/supabase'
import { Session, User } from '@supabase/supabase-js'
import { UserSettings } from '../models/settings'
import api from '../api/api'

type ExtendedSession = Session & {
    user: ExtendedUser
}

type ExtendedUser = User & {
    settings?: UserSettings
}

const AuthContext = React.createContext<ExtendedSession>(null)

export function AuthProvider({ children }) {
    const [session, setSession] = useState<ExtendedSession>()
    const [loading, setLoading] = useState(true)

    useMemo(async () => {
        // Check active sessions and sets the user
        const session = await supabase.auth.getSession()
        const extendedSession: ExtendedSession = session?.data?.session

        if (extendedSession) {
            try {
                const settings = await api.authenticated(session.data.session).settings.getAll()
                if (settings.data) {
                    extendedSession.user.settings = settings.data
                }
            } catch (e) {
                console.log(e)
            }
        }

        setSession(extendedSession ?? null)
        setLoading(false)

        // Listen for changes on auth state (logged in, signed out, etc.)
        const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
            const extendedSession: ExtendedSession = session
            if (extendedSession) {
                const settings = await api.authenticated(session).settings.getAll()
                if (settings.data) {
                    extendedSession.user.settings = settings.data
                }
            }
            setSession(extendedSession ?? null)
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