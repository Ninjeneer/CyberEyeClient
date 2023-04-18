import { RealtimePostgresChangesPayload, Session } from "@supabase/supabase-js";
import constants from "../constants";
import { SupabaseReport } from "../models/report";
import { Scan, ScanSettings, ScanWithProbes } from "../models/Scan";
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
        },
        onAuthStateChange: ((callback: (event, session) => void) => {
            supabaseClient.auth.onAuthStateChange(callback)
        })
    },
    authenticated: (user: Session) => {
        return {
            scans: {
                sendScanRequest: async (scanSettings: ScanSettings) => {
                    return await fetch(`${constants.requestServiceURL}/scans`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': user.access_token
                        },
                        body: JSON.stringify(scanSettings)
                    }).then((res) => res.json())
                },
                getScans: () => {
                    return supabaseClient.from('scans').select('*, probes(scanId)')
                },
                getScan: (id: string) => {
                    return supabaseClient.from('scans').select('*').eq('id', id).single()
                },
                getScanWithProbes: (id: string, lite = false) => {
                    return supabaseClient.from('scans').select(`*, probes(${lite ? 'name' : '*'})`).eq('id', id).single()
                },
                liteUpdateScan: (id: string, payload: Partial<Scan>) => {
                    return supabaseClient.from('scans').update(payload).eq('id', id)
                },
                updateScan: (id: string, scan: Partial<ScanSettings>) => {
                    return fetch(`${constants.requestServiceURL}/scans/${id}`, {
                        method: 'PATCH',
                        body: JSON.stringify(scan),
                        headers: {
                            'authorization': user.access_token
                        }
                    })
                },
                deleteScan: (id: string) => {
                    return supabaseClient.from('scans').delete({ count: 'exact' }).eq('id', id).single()
                },
                listenForScans: (onChange: (payload: RealtimePostgresChangesPayload<any>) => void) => {
                    supabaseClient.channel('scans')
                        .on('postgres_changes', { event: '*', schema: 'public', table: 'scans' }, onChange)
                        .subscribe()
                },
            },
            probes: {
                getAvailableProbes: () => {
                    return fetch(`${constants.requestServiceURL}/probes`, {
                        headers: {
                            'authorization': user.access_token
                        }
                    })
                },
            },
            reports: {
                getReports: () => {
                    return supabaseClient.from('reports').select<string, SupabaseReport>('*, scans!reports_scanId_fkey(*)').order('createdAt', { ascending: false })
                },
                getReportById: (id: string) => {
                    return supabaseClient.from('reports').select<string, SupabaseReport>('*').eq('id', id).single()
                },
                getReportResultsById: (id: string) => {
                    return fetch(`${constants.reportServiceURL}/reports/${id}`, {
                        headers: {
                            'authorization': user.access_token
                        }
                    })
                },
                rebuildReport: (id: string) => {
                    return fetch(`${constants.reportServiceURL}/reports/${id}/rebuild`, {
                        method: 'POST',
                        headers: {
                            'authorization': user.access_token
                        }
                    })
                }
            }
        }
    }
}