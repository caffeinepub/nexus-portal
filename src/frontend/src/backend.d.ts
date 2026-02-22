import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type ContentId = string;
export interface Content {
    title: string;
    body: string;
}
export interface backendInterface {
    createContent(id: ContentId, title: string, body: string): Promise<void>;
    deleteContent(id: ContentId): Promise<void>;
    getAllContents(): Promise<Array<Content>>;
    getContent(id: ContentId): Promise<Content>;
    updateContent(id: ContentId, title: string, body: string): Promise<void>;
}
