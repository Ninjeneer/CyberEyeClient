import React, { useContext, useState, useEffect, useMemo } from 'react'
import supabase from '../api/supabase'
import { User } from '@supabase/supabase-js'
import api from '../api/api'

const AuthContext = React.createContext<User>(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState<User>()
    const [loading, setLoading] = useState(true)

    useMemo(async () => {
        // Check active sessions and sets the user
        const session = await supabase.auth.getUser()

        setUser(session?.data?.user ?? null)
        setLoading(false)

        // Listen for changes on auth state (logged in, signed out, etc.)
        const { data: listener } = supabase.auth.onAuthStateChange(async (event, session) => {
            setUser(session?.user ?? null)
            setLoading(false)
        })

        return () => {
            listener?.subscription?.unsubscribe()
        }
    }, [])

    return <AuthContext.Provider value={user}> {!loading && children}</AuthContext.Provider>
}

export function useAuth() {
    return useContext(AuthContext)
}