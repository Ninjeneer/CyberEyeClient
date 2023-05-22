import { RealtimePostgresChangesPayload, Session } from "@supabase/supabase-js";
import constants from "../constants";
import { SupabaseReport } from "../models/report";
import { Scan, ScanSettings, ScanWithProbes } from "../models/Scan";
import supabaseClient from './supabase'
import { UserCredits, UserSettings } from "../models/settings";
import { ProbeWithScan, SupabaseProbe } from "../models/Probe";

export default {
    auth: {
        logout: () => {
            return supabaseClient.auth.signOut();
        },
        onAuthStateChange: ((callback: (event, session) => void) => {
            supabaseClient.auth.onAuthStateChange(callback)
        })
    },
    authenticated: (session: Session) => {
        return {
            scans: {
                sendScanRequest: async (scanSettings: ScanSettings) => {
                    return await fetch(`${constants.requestServiceURL}/scans`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': session.access_token
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
                    return supabaseClient.from('scans').select(`*, probes(${lite ? 'name, price' : '*'})`).eq('id', id).single()
                },
                liteUpdateScan: (id: string, payload: Partial<Scan>) => {
                    return supabaseClient.from('scans').update(payload).eq('id', id)
                },
                updateScan: (id: string, scan: Partial<ScanSettings>) => {
                    return fetch(`${constants.requestServiceURL}/scans/${id}`, {
                        method: 'PATCH',
                        body: JSON.stringify(scan),
                        headers: {
                            'authorization': session.access_token
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
                            'authorization': session.access_token
                        }
                    })
                },
                getAllActiveProbes: async () => {
                    return await supabaseClient.from('probes').select<string, ProbeWithScan>('*, scans(userId, periodicity)').eq('scans.userId', session.user.id)
                },
                listenForProbes: (onChange: (payload: RealtimePostgresChangesPayload<SupabaseProbe>) => void) => {
                    supabaseClient.channel('probes')
                        .on('postgres_changes', { event: '*', schema: 'public', table: 'probes' }, onChange)
                        .subscribe()
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
                            'authorization': session.access_token
                        }
                    })
                },
                rebuildReport: (id: string) => {
                    return fetch(`${constants.reportServiceURL}/reports/${id}/rebuild`, {
                        method: 'POST',
                        headers: {
                            'authorization': session.access_token
                        }
                    })
                }
            },
            settings: {
                getAll: () => {
                    return supabaseClient.from('user_settings').select<string, UserSettings>('*', {}).eq('userId', session.user.id).maybeSingle()
                },
                update: (settings: Partial<UserSettings>) => {
                    return supabaseClient
                        .from('user_settings')
                        .upsert({ userId: session.user.id, ...settings }, { onConflict: 'userId' })
                        .eq('userId', session.user.id)
                        .select()
                        .maybeSingle()
                },
                listenForSettings: (onChange: (payload: RealtimePostgresChangesPayload<UserSettings>) => void) => {
                    supabaseClient.channel('user_settings')
                        .on('postgres_changes', { event: '*', schema: 'public', table: 'user_settings' }, onChange)
                        .subscribe()
                },
            },
            billing: {
                buyPlan: (priceId: string, isUpdate = false) => {
                    return fetch(`${constants.billingServiceURL}/checkout/sessions`, {
                        method: 'POST',
                        body: JSON.stringify({
                            priceId,
                            isUpdate
                        }),
                        headers: {
                            'Content-Type': 'application/json',
                            'authorization': session.access_token
                        }
                    })
                }
            },
            stats: {
                getMyStats: () => {
                    return fetch(`${constants.statsServiceURL}/users/${session.user.id}`, {
                        headers: {
                            'authorization': session.access_token
                        }
                    })
                }
            },
            credits: {
                getAll: () => supabaseClient.from('user_credits').select<string, UserCredits>('*').eq('userId', session.user.id).maybeSingle()
            }
        }
    }
}