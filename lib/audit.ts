import { createClient } from '@/lib/supabase/server';
import type { UserRole } from '@/lib/supabase/types';

export type AuditAction =
  | 'LOGIN'
  | 'LOGOUT'
  | 'LOGIN_FAILED'
  | 'CREATE'
  | 'UPDATE'
  | 'DELETE'
  | 'VIEW'
  | 'DOWNLOAD'
  | 'EXPORT'
  | 'STATUS_CHANGE'
  | 'ASSIGNMENT';

export interface AuditLogEntry {
  user_id?: string;
  user_email?: string;
  user_role?: UserRole;
  action: AuditAction;
  entity_type?: string;
  entity_id?: string;
  entity_name?: string;
  metadata?: Record<string, unknown>;
  changes?: Record<string, { old: unknown; new: unknown }>;
  ip_address?: string;
  user_agent?: string;
}

export interface AuditLogRecord {
  id: string;
  user_id: string | null;
  user_email: string | null;
  user_role: string | null;
  action: AuditAction;
  entity_type: string | null;
  entity_id: string | null;
  entity_name: string | null;
  metadata: Record<string, unknown>;
  changes: Record<string, { old: unknown; new: unknown }> | null;
  ip_address: string | null;
  user_agent: string | null;
  created_at: string;
}

/**
 * Log an audit event
 */
export async function logAuditEvent(entry: AuditLogEntry): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();

    const { error } = await supabase.from('audit_logs').insert({
      user_id: entry.user_id,
      user_email: entry.user_email,
      user_role: entry.user_role,
      action: entry.action,
      entity_type: entry.entity_type,
      entity_id: entry.entity_id,
      entity_name: entry.entity_name,
      metadata: entry.metadata || {},
      changes: entry.changes,
      ip_address: entry.ip_address,
      user_agent: entry.user_agent,
    });

    if (error) {
      console.error('Audit log error:', error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err) {
    console.error('Audit log error:', err);
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

/**
 * Log a login event
 */
export async function logLogin(
  userId: string,
  email: string,
  role?: UserRole,
  ip?: string,
  userAgent?: string
) {
  return logAuditEvent({
    user_id: userId,
    user_email: email,
    user_role: role,
    action: 'LOGIN',
    ip_address: ip,
    user_agent: userAgent,
  });
}

/**
 * Log a logout event
 */
export async function logLogout(userId: string, email?: string) {
  return logAuditEvent({
    user_id: userId,
    user_email: email,
    action: 'LOGOUT',
  });
}

/**
 * Log a failed login attempt
 */
export async function logLoginFailed(email: string, ip?: string, userAgent?: string) {
  return logAuditEvent({
    user_email: email,
    action: 'LOGIN_FAILED',
    ip_address: ip,
    user_agent: userAgent,
  });
}

/**
 * Log a view event
 */
export async function logView(
  userId: string,
  entityType: string,
  entityId: string,
  entityName?: string
) {
  return logAuditEvent({
    user_id: userId,
    action: 'VIEW',
    entity_type: entityType,
    entity_id: entityId,
    entity_name: entityName,
  });
}

/**
 * Log a download event
 */
export async function logDownload(
  userId: string,
  entityType: string,
  entityId: string,
  entityName?: string
) {
  return logAuditEvent({
    user_id: userId,
    action: 'DOWNLOAD',
    entity_type: entityType,
    entity_id: entityId,
    entity_name: entityName,
  });
}

/**
 * Log an export event
 */
export async function logExport(
  userId: string,
  entityType: string,
  metadata?: Record<string, unknown>
) {
  return logAuditEvent({
    user_id: userId,
    action: 'EXPORT',
    entity_type: entityType,
    metadata,
  });
}

/**
 * Get recent audit logs
 */
export async function getAuditLogs(options: {
  limit?: number;
  offset?: number;
  userId?: string;
  action?: AuditAction;
  entityType?: string;
  entityId?: string;
  startDate?: string;
  endDate?: string;
}): Promise<{ data: AuditLogRecord[] | null; error: string | null; count: number }> {
  const supabase = await createClient();

  let query = supabase
    .from('audit_logs')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false });

  if (options.limit) {
    query = query.limit(options.limit);
  }

  if (options.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 50) - 1);
  }

  if (options.userId) {
    query = query.eq('user_id', options.userId);
  }

  if (options.action) {
    query = query.eq('action', options.action);
  }

  if (options.entityType) {
    query = query.eq('entity_type', options.entityType);
  }

  if (options.entityId) {
    query = query.eq('entity_id', options.entityId);
  }

  if (options.startDate) {
    query = query.gte('created_at', options.startDate);
  }

  if (options.endDate) {
    query = query.lte('created_at', options.endDate);
  }

  const { data, error, count } = await query;

  return {
    data: data as AuditLogRecord[] | null,
    error: error?.message || null,
    count: count || 0,
  };
}

/**
 * Get audit logs for a specific entity
 */
export async function getEntityAuditHistory(
  entityType: string,
  entityId: string,
  limit = 50
): Promise<{ data: AuditLogRecord[] | null; error: string | null }> {
  const { data, error } = await getAuditLogs({
    entityType,
    entityId,
    limit,
  });

  return { data, error };
}
