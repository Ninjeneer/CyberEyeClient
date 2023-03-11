import { createClient } from '@supabase/supabase-js'
import constants from '../constants'

const supabase = createClient(constants.supabaseURL, constants.supabaseKey)

export default supabase