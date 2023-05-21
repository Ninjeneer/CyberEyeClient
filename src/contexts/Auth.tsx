import React, { useContext, useState, useMemo, useEffect } from 'react'
import supabase from '../api/supabase'
import { AuthSession, Session, User } from '@supabase/supabase-js'
import { UserCredits, UserSettings } from '../models/settings'
import api from '../api/api'
import { USER_CREDIT_DEFAULTS } from '../defaults'
import { isEventCreateOrUpate } from '../utils/supabaseUtils'

type ExtendedSession = {
    session: Session
    settings?: UserSettings
    credits?: UserCredits
}

const AuthContext = React.createContext<ExtendedSession>(null)

export function AuthProvider({ children }) {
    const [session, setSession] = useState<Session>(null)
    const [settings, setSettings] = useState(null)
    const [credits, setCredits] = useState(null)
    const [loading, setLoading] = useState(true)

    useMemo(async () => {
        // Check active sessions and sets the user
        const session = await supabase.auth.getSession()
        if (session?.data?.session) {
            const [settings, credits] = await Promise.all([
                api.authenticated(session.data.session).settings.getAll(),
                api.authenticated(session.data.session).credits.getAll()
            ])
            setSettings(settings?.data)
            setCredits(credits?.data)
        }

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

    useEffect(() => {
        if (session) {
            Promise.all([
                api.authenticated(session).settings.getAll(),
                api.authenticated(session).credits.getAll()
            ]).then(([settings, credits]) => {
                setSettings(settings.data)
                setCredits(credits?.data || USER_CREDIT_DEFAULTS)
            }).catch(console.error)

            // Listen for changes in settings
            api.authenticated(session).settings.listenForSettings((change) => {
                if (isEventCreateOrUpate(change)) {
                    setSettings(change.new)
                } else {
                    setSettings(null)
                }
            })

            // Listen for changes in settings
            supabase.channel('user_credits')
                .on('postgres_changes', { event: '*', schema: 'public', table: 'user_credits' }, (change) => {
                    if (isEventCreateOrUpate(change)) {
                        setCredits(change.new)
                    } else {
                        setCredits(null)
                    }
                })
                .subscribe()
        }
    }, [session])

    return <AuthContext.Provider value={{ session, settings, credits }}>{!loading && children}</AuthContext.Provider>
}

export function useAuth() {
    return useContext(AuthContext) || {} as ExtendedSession
}