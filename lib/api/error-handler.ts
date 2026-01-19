import { NextResponse } from 'next/server';
import { z } from 'zod';

/**
 * Standard API error response shape
 */
export interface ApiErrorResponse {
  success: false;
  error?: string;
  errors?: z.ZodIssue[];
}

/**
 * Standard API success response shape
 */
export interface ApiSuccessResponse<T = unknown> {
  success: true;
  data?: T;
  [key: string]: unknown;
}

/**
 * Handle API errors in a consistent way
 *
 * Usage:
 * ```ts
 * try {
 *   // ... your code
 * } catch (error) {
 *   return handleApiError(error, 'LEADS');
 * }
 * ```
 */
export function handleApiError(error: unknown, context: string): NextResponse<ApiErrorResponse> {
  // Handle Zod validation errors
  if (error instanceof z.ZodError) {
    return NextResponse.json(
      { success: false, errors: error.issues },
      { status: 400 }
    );
  }

  // Log and return generic error for everything else
  console.error(`[${context}] Error:`, error);
  return NextResponse.json(
    { success: false, error: 'Internal server error' },
    { status: 500 }
  );
}

/**
 * Create a database error response
 */
export function handleDatabaseError(
  error: { message?: string; code?: string } | null,
  context: string,
  operation: string = 'operation'
): NextResponse<ApiErrorResponse> {
  console.error(`[${context}] Database error during ${operation}:`, error);
  return NextResponse.json(
    { success: false, error: `Failed to ${operation}` },
    { status: 500 }
  );
}

/**
 * Create a not found error response
 */
export function notFoundResponse(resource: string): NextResponse<ApiErrorResponse> {
  return NextResponse.json(
    { success: false, error: `${resource} not found` },
    { status: 404 }
  );
}

/**
 * Create a bad request error response
 */
export function badRequestResponse(message: string): NextResponse<ApiErrorResponse> {
  return NextResponse.json(
    { success: false, error: message },
    { status: 400 }
  );
}

/**
 * Create a success response
 */
export function successResponse<T>(data: T, key?: string): NextResponse<ApiSuccessResponse<T>> {
  if (key) {
    return NextResponse.json({ success: true, [key]: data } as ApiSuccessResponse<T>);
  }
  return NextResponse.json({ success: true, data } as ApiSuccessResponse<T>);
}
