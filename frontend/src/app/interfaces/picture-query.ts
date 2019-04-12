export interface PictureQuery {
    start: number;
    end: number;
    queryString: string;
    type: "PathsOnly" | "Full"
}
