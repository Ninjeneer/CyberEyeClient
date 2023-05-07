export default {
    requestServiceURL: import.meta.env.VITE_REQUEST_SERVICE_URL,
    reportServiceURL: import.meta.env.VITE_REPORT_SERVICE_URL,
    billingServiceURL: import.meta.env.VITE_BILLING_SERVICE_URL,
    statsServiceURL: import.meta.env.VITE_STATS_SERVICE_URL,

    supabaseURL: import.meta.env.VITE_SUPABASE_URL,
    supabaseKey: import.meta.env.VITE_SUPABASE_KEY,

    nodeEnv: import.meta.env.VITE_NODE_ENV || 'production'
}