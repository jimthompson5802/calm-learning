export class HttpError extends Error {
  readonly status: number;
  readonly data: unknown;
  readonly path: string;

  constructor(message: string, status: number, path: string, data: unknown) {
    super(message);
    this.name = "HttpError";
    this.status = status;
    this.path = path;
    this.data = data;
  }
}
