import { BookModel } from "../models/book-model";
import { GenreModel } from "../models/genre-model";


export class BooksState {
    public books: BookModel[] = [];
    public genres: GenreModel[] = [];
}

export enum BookActionType {
    booksDownloaded = "booksDownloaded",
    genresDownloaded = "genresDownloaded",
    bookAdded = "bookAdded",
    bookUpdated = "bookUpdated",
    bookDeleted = "bookDeleted"
}

export interface BookAction {
    type: BookActionType;
    payload: any;
}

export function booksDownloadedAction(books: BookModel[]): BookAction {
    return { type: BookActionType.booksDownloaded, payload: books };
}
export function genresDownloadedAction(genres: GenreModel[]): BookAction {
    return { type: BookActionType.genresDownloaded, payload: genres };
}
export function bookAddedAction(book: BookModel): BookAction {
    return { type: BookActionType.bookAdded, payload: book };
}
export function bookUpdatedAction(book: BookModel): BookAction {
    return { type: BookActionType.bookUpdated, payload: book };
}
export function bookDeletedAction(uuid: string): BookAction {
    return { type: BookActionType.bookUpdated, payload: uuid };
}

export function booksReducer(currentState: BooksState = new BooksState(), action: BookAction): BooksState {
    
    const newState = { ...currentState };

    switch(action.type) {
        case BookActionType.booksDownloaded:
            newState.books = action.payload;
            break;
        case BookActionType.genresDownloaded:
            newState.genres = action.payload;
            break;
        case BookActionType.bookAdded: 
            newState.books.push(action.payload);
            break;
        case BookActionType.bookUpdated: { 
            const index = newState.books.findIndex(b => b.uuid === action.payload.uuid);
            newState.books[index] = action.payload;
            break;
        }
        case BookActionType.bookDeleted: 
            const indexToDelete = newState.books.findIndex(b => b.uuid === action.payload);
            newState.books.splice(indexToDelete, 1);
            break;
    }

    return newState;
}