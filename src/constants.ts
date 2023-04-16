export default {
    requestServiceURL: import.meta.env.VITE_REQUEST_SERVICE_URL,
    reportServiceURL: import.meta.env.VITE_REPORT_SERVICE_URL,

    supabaseURL: import.meta.env.VITE_SUPABASE_URL,
    supabaseKey: import.meta.env.VITE_SUPABASE_KEY,

    nodeEnv: import.meta.env.VITE_NODE_ENV || 'production'
}