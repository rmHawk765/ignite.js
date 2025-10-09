export declare class ImportError extends Error {
    constructor(message?: string);
}
export declare class ClientNotReadyError extends Error {
    constructor(message?: string);
}
export declare class ComponentMissingError extends Error {
    constructor(id?: string, message?: string);
}
export declare class ComponentPendingUseError extends Error {
    constructor(id?: string, message?: string);
}
