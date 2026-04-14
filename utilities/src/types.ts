export interface GlobalOptions {
  baseUrl?: string;
  out?: string;
  verbose?: boolean;
  timeout?: string;
}

export interface RequestOptions {
  method: "GET" | "POST";
  path: string;
  baseUrl: string;
  body?: unknown;
  timeoutMs?: number;
  verbose?: boolean;
}

export interface ResponsePayload {
  status: number;
  headers: Record<string, string>;
  data: unknown;
}

export interface CommandOutputContext {
  action: string;
  path: string;
}

export interface NamespaceCreateRequest {
  name: string;
  description: string;
}

export interface ArchitectureCreateRequest {
  name: string;
  description: string;
  architectureJson: string;
}
