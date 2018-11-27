export interface Org {
    id: number;
    name: string;
    sub: Org[];
}