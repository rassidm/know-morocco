import { supabase } from "./supabase"

/**
 * Test Supabase connection
 */
export async function testConnection(): Promise<{
  success: boolean
  message: string
  details?: any
}> {
  try {
    // Test database connection with a simple query
    const { data, error } = await supabase.from("knowledge_cards").select("id").limit(1)

    if (error) {
      return {
        success: false,
        message: "Database connection failed",
        details: error.message,
      }
    }

    return {
      success: true,
      message: "Connection successful",
      details: { cardsFound: data?.length || 0 },
    }
  } catch (err) {
    return {
      success: false,
      message: "Connection test failed",
      details: err instanceof Error ? err.message : "Unknown error",
    }
  }
}

export default testConnection
