"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
class HttpError extends Error {
    status;
    data;
    path;
    constructor(message, status, path, data) {
        super(message);
        this.name = "HttpError";
        this.status = status;
        this.path = path;
        this.data = data;
    }
}
exports.HttpError = HttpError;
