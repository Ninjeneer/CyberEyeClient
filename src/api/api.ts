import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";
import constants from "../constants";
import { ScanSettings } from "../models/Scan";
import supabaseClient from './supabase'


export default {
    auth: {
        register: (email: string, password: string) => {
            return supabaseClient.auth.signUp({ email, password })
        },

        login: (email: string, password: string) => {
            return supabaseClient.auth.signInWithPassword({ email, password })
        },
        logout: () => {
            return supabaseClient.auth.signOut();
        }
    },
    scans: {
        sendScanRequest: async (scanSettings: ScanSettings) => {
            console.log(`${constants.requestServiceURL}/scans`)
            return await fetch(`${constants.requestServiceURL}/scans`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(scanSettings)
            }).then((res) => res.json())
        },
        getScans: () => {
            return supabaseClient.from('scans').select('*')
        },
        getScan: (id: string) => {
            return supabaseClient.from('scans').select('*').eq('id', id).single()
        },
        listenForScans: (onChange: (payload: RealtimePostgresChangesPayload<any>) => void) => {
            supabaseClient.channel('scans')
                .on('postgres_changes', { event: '*', schema: 'public', table: 'reports' }, onChange)
                .subscribe()
        },
    },
    probes: {
        getAvailableProbes: () => {
            return fetch(`${constants.requestServiceURL}/probes`)
        },
    },
    reports: {
        getReportById: (id: string) => {
            return fetch(`${constants.requestServiceURL}/reports/${id}`)
        }
    }
}