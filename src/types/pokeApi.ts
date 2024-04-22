export interface PokeApiTypes {
    count: number;
    next: number;
    previous: number;
    results: [
        {
            name: string;
            url: string
        }]
}

export interface QueryPokeAPiResult {
    count: number,
    next: string,
    previous: string,
    results: [
        {
            name: string,
            url: string
        }]
}