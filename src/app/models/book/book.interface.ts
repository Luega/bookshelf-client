import { BookGenre } from "./book-genre.enum";

export interface IBook {
    id?: string;
    title: string;
    author: string;
    genre: BookGenre;
    pageCount: number;
    price: number;
    publishDate: Date;
}