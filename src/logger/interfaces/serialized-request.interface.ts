export interface ISerializedRequest {
    id: string;
    method: string;
    url: string;
    // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
    query: Record<string, string> | unknown;
    userAgent: string | undefined | string[];
}
