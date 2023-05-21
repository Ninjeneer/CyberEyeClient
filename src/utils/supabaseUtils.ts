import { RealtimePostgresChangesPayload, RealtimePostgresDeletePayload, RealtimePostgresInsertPayload, RealtimePostgresUpdatePayload } from "@supabase/supabase-js";

type CreateOrUpdate<T> = RealtimePostgresInsertPayload<T> | RealtimePostgresUpdatePayload<T>

export const isEventCreate = <T = any>(change: RealtimePostgresChangesPayload<T>): change is RealtimePostgresInsertPayload<T> => {
    return change.eventType === 'INSERT'
}
export const isEventUpate = <T = any>(change: RealtimePostgresChangesPayload<T>): change is RealtimePostgresUpdatePayload<T> => {
    return change.eventType === 'UPDATE'
}
export const isEventDelete = <T = any>(change: RealtimePostgresChangesPayload<T>): change is RealtimePostgresDeletePayload<T> => {
    return change.eventType === 'DELETE'
}
export const isEventCreateOrUpate = <T = any>(change: RealtimePostgresChangesPayload<T>): change is CreateOrUpdate<T> => {
    return isEventCreate<T>(change) || isEventUpate<T>(change)
}