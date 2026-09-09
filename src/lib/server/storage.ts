import 'server-only';
import { Storage } from '@google-cloud/storage';
import { serverEnv } from './env';

/**
 * Cloud Storage for uploaded documents.
 *
 * apply.php wrote CVs into api/bewerbungen/ on the Hostinger filesystem and
 * protected them with a generated .htaccess. That is Apache-specific and has no
 * equivalent here; access control moves to IAM, and the bucket must have uniform
 * bucket-level access with no public objects. Nothing written here is ever
 * served publicly — files are read back by an authenticated signed URL.
 *
 * The old directory is also production data that exists only on that host: it
 * must be exported before Hostinger is decommissioned.
 */

let storage: Storage | undefined;

function client(): Storage {
  if (!storage) storage = new Storage({ projectId: serverEnv.projectId });
  return storage;
}

export function uploadsBucketName(): string {
  return process.env.UPLOADS_BUCKET || `${serverEnv.projectId}-uploads`;
}

export interface StoredFile {
  path: string;
  filename: string;
  size: number;
  contentType: string;
}

export async function storeFile(
  prefix: string,
  file: File,
  index: number
): Promise<StoredFile> {
  // Never trust the client-supplied name for a path segment.
  const safe = file.name.replace(/[^A-Za-z0-9._-]/g, '_').slice(-120) || `datei-${index}`;
  const path = `${prefix}/${String(index).padStart(2, '0')}-${safe}`;

  const buffer = Buffer.from(await file.arrayBuffer());
  await client()
    .bucket(uploadsBucketName())
    .file(path)
    .save(buffer, {
      contentType: file.type || 'application/octet-stream',
      resumable: false,
      metadata: { cacheControl: 'private, max-age=0, no-store' },
    });

  return { path, filename: safe, size: buffer.length, contentType: file.type };
}

/** Short-lived read URL, for the notification email. Never a public object. */
export async function signedReadUrl(path: string, ttlMs = 7 * 24 * 3600 * 1000): Promise<string> {
  const [url] = await client()
    .bucket(uploadsBucketName())
    .file(path)
    .getSignedUrl({ action: 'read', expires: Date.now() + ttlMs, version: 'v4' });
  return url;
}
