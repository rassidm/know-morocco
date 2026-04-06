# Feature: Supabase Client and Database Setup

## Metadata

- **Feature ID:** 005
- **Phase:** 1 - Foundation Setup
- **Status:** Completed
- **Estimated Time:** 30 minutes
- **Dependencies:** 001 (Project Configuration)

---

## Goals

Set up the Supabase client for database connectivity, authentication, and storage. This feature establishes the connection layer to the Supabase backend that all data operations will use.

### Acceptance Criteria

- [x] Supabase client configured with environment variables
- [x] Supabase client singleton exported
- [x] Auth helpers created (getSession, getUser)
- [x] Database types integrated
- [x] Error handling wrapper created
- [x] React Query client setup (optional for caching)
- [x] Connection test function created

---

## Implementation Steps

### Step 1: Install Supabase Dependencies

Install the Supabase client library:

```bash
npm install @supabase/supabase-js
```

Note: This may already be installed. Verify in package.json.

---

### Step 2: Create Supabase Client Module

**File:** `app/services/supabase.ts`
```typescript
import { createClient, SupabaseClient } from '@supabase/supabase-js'
import { ENV } from '@/config/env'
import type { Database } from '@/types/database.types'

/**
 * Supabase client instance
 * This is a singleton - only one instance should exist
 */
let supabaseInstance: SupabaseClient<Database> | null = null

/**
 * Get or create Supabase client instance
 */
export function getSupabaseClient(): SupabaseClient<Database> {
  if (!supabaseInstance) {
    supabaseInstance = createClient<Database>(
      ENV.supabaseUrl,
      ENV.supabaseAnonKey,
      {
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: true,
          flowType: 'pkce',
        },
        db: {
          schema: 'public',
        },
      }
    )
  }
  return supabaseInstance
}

/**
 * Export the client instance directly for convenience
 */
export const supabase = getSupabaseClient()

/**
 * Get the current session
 */
export async function getSession() {
  const { data: { session }, error } = await supabase.auth.getSession()
  if (error) {
    console.error('Error getting session:', error)
    return null
  }
  return session
}

/**
 * Get the current user
 */
export async function getUser() {
  const { data: { user }, error } = await supabase.auth.getUser()
  if (error) {
    console.error('Error getting user:', error)
    return null
  }
  return user
}

/**
 * Get access token for API calls
 */
export async function getAccessToken() {
  const session = await getSession()
  return session?.access_token ?? null
}

/**
 * Sign out the current user
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut()
  if (error) {
    console.error('Error signing out:', error)
    return false
  }
  return true
}

export default supabase
```

---

### Step 3: Create Database Query Helpers

**File:** `app/services/databaseHelpers.ts`
```typescript
import { supabase } from './supabase'
import type { PostgrestError } from '@supabase/supabase-js'

/**
 * Standard database operation result
 */
export interface DatabaseResult<T> {
  data: T | null
  error: PostgrestError | null
  success: boolean
}

/**
 * Handle database errors consistently
 */
export function handleDatabaseError(error: PostgrestError | null): void {
  if (error) {
    console.error('Database error:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
    })
  }
}

/**
 * Wrap a database call with error handling
 */
export async function withErrorHandling<T>(
  operation: () => Promise<{ data: T | null; error: PostgrestError | null }>,
  errorMessage?: string
): Promise<DatabaseResult<T>> {
  try {
    const { data, error } = await operation()
    
    if (error) {
      handleDatabaseError(error)
      return { data: null, error, success: false }
    }
    
    return { data, error: null, success: true }
  } catch (err) {
    const error = err instanceof Error ? err : new Error('Unknown error')
    console.error(errorMessage || 'Database operation failed:', error)
    return { 
      data: null, 
      error: { 
        message: error.message, 
        details: error.stack, 
        hint: '', 
        code: 'UNKNOWN_ERROR' 
      }, 
      success: false 
    }
  }
}

/**
 * Check if user is authenticated
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await supabase.auth.getSession()
  return !!session.data.session
}

/**
 * Require authentication - throw error if not authenticated
 */
export async function requireAuth(): Promise<string> {
  const session = await supabase.auth.getSession()
  if (!session.data.session) {
    throw new Error('Authentication required')
  }
  return session.data.session.user.id
}

export default {
  handleDatabaseError,
  withErrorHandling,
  isAuthenticated,
  requireAuth,
}
```

---

### Step 4: Create Supabase Storage Helper

**File:** `app/services/storage.ts`
```typescript
import { supabase } from './supabase'

/**
 * Upload a file to Supabase Storage
 */
export async function uploadFile(
  bucket: string,
  path: string,
  file: File | Blob,
  options?: {
    cacheControl?: string
    contentType?: string
    upsert?: boolean
  }
) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .upload(path, file, options)

  if (error) {
    console.error('Error uploading file:', error)
    return null
  }

  return data
}

/**
 * Get public URL for a file
 */
export async function getPublicUrl(bucket: string, path: string): Promise<string | null> {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path)
  return data?.publicUrl || null
}

/**
 * Download a file from Supabase Storage
 */
export async function downloadFile(bucket: string, path: string) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .download(path)

  if (error) {
    console.error('Error downloading file:', error)
    return null
  }

  return data
}

/**
 * Delete a file from Supabase Storage
 */
export async function deleteFile(bucket: string, path: string) {
  const { error } = await supabase.storage
    .from(bucket)
    .remove([path])

  if (error) {
    console.error('Error deleting file:', error)
    return false
  }

  return true
}

/**
 * List files in a storage bucket
 */
export async function listFiles(bucket: string, path: string) {
  const { data, error } = await supabase.storage
    .from(bucket)
    .list(path)

  if (error) {
    console.error('Error listing files:', error)
    return null
  }

  return data
}

export default {
  uploadFile,
  getPublicUrl,
  downloadFile,
  deleteFile,
  listFiles,
}
```

---

### Step 5: Create Test Connection Function

**File:** `app/services/testConnection.ts`
```typescript
import { supabase } from './supabase'

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
    const { data, error } = await supabase
      .from('knowledge_cards')
      .select('id')
      .limit(1)

    if (error) {
      return {
        success: false,
        message: 'Database connection failed',
        details: error.message,
      }
    }

    return {
      success: true,
      message: 'Connection successful',
      details: { cardsFound: data?.length || 0 },
    }
  } catch (err) {
    return {
      success: false,
      message: 'Connection test failed',
      details: err instanceof Error ? err.message : 'Unknown error',
    }
  }
}

export default testConnection
```

---

### Step 6: Update Database Types

Ensure the database types file is complete.

**File:** `types/database.types.ts`

This was created in Feature 001. Verify it matches your Supabase schema.

To auto-generate types from Supabase:
```bash
npx supabase gen types typescript --project-id your-project-id > types/database.types.ts
```

---

## Mock Data (If Applicable)

Not applicable - this is a backend infrastructure feature.

---

## Integration Points

### Connects To

- **Feature 001** - Uses environment configuration
- **Feature 006** - Auth context will use Supabase client
- **Feature 009** - Auth service will use Supabase auth

### Used By

- **Feature 025** - Supabase Schema
- **Feature 030** - Knowledge Card Service
- **Feature 031** - Category Service
- All database operations

---

## Testing Checklist

- [ ] TypeScript compiles without errors (`npm run compile`)
- [ ] ESLint passes (`npm run lint`)
- [ ] Supabase client initializes without errors
- [ ] Environment variables are loaded correctly
- [ ] `getSession()` returns null when not authenticated
- [ ] `getUser()` returns null when not authenticated
- [ ] Error handling works correctly
- [ ] Storage helper functions are accessible
- [ ] Test connection function works (when Supabase is configured)

---

## Notes

- The Supabase client is a singleton to prevent multiple instances
- PKCE flow type is used for enhanced security
- Database types should be regenerated when schema changes
- Consider adding React Query for advanced caching in a future iteration

---

## References

- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Supabase Auth](https://supabase.com/docs/guides/auth)
- [Supabase Storage](https://supabase.com/docs/guides/storage)
- [PKCE Authentication Flow](https://supabase.com/docs/guides/auth/auth-pkce-flow)
