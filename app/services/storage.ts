import { supabase } from "./supabase"

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
  },
) {
  const { data, error } = await supabase.storage.from(bucket).upload(path, file, options)

  if (error) {
    console.error("Error uploading file:", error)
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
  const { data, error } = await supabase.storage.from(bucket).download(path)

  if (error) {
    console.error("Error downloading file:", error)
    return null
  }

  return data
}

/**
 * Delete a file from Supabase Storage
 */
export async function deleteFile(bucket: string, path: string) {
  const { error } = await supabase.storage.from(bucket).remove([path])

  if (error) {
    console.error("Error deleting file:", error)
    return false
  }

  return true
}

/**
 * List files in a storage bucket
 */
export async function listFiles(bucket: string, path: string) {
  const { data, error } = await supabase.storage.from(bucket).list(path)

  if (error) {
    console.error("Error listing files:", error)
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
