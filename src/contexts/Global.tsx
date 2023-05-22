import React, { useContext, useState, useMemo, useEffect } from 'react'
import supabase from '../api/supabase'
import { AuthSession, Session, User } from '@supabase/supabase-js'
import { UserCredits, UserSettings } from '../models/settings'
import clientAPI from '../api/api'
import { USER_CREDIT_DEFAULTS } from '../defaults'
import { isEventCreate, isEventCreateOrUpate, isEventUpate } from '../utils/supabaseUtils'
import { SupabaseProbe } from '../models/Probe'
import { useAuth } from './Auth'
import { getAllCreditsUsedByProbesForMonth } from '../utils/probe.utils'



const GlobalContext = React.createContext(null)

export const GlobalProvider = ({ children }) => {

    // To be used to provide some global context...

    return <GlobalContext.Provider value={null}>{children}</GlobalContext.Provider>
}

export function useGlobal() {
    return useContext(GlobalContext) || {}
}