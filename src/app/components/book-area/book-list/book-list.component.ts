import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BookModel } from 'src/app/models/book-model';
import { GenreModel } from 'src/app/models/genre-model';
import { booksDownloadedAction, genresDownloadedAction } from 'src/app/redux/books-state';
import store from 'src/app/redux/store';
import { NotifyService } from 'src/app/services/notify.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-book-list',
    templateUrl: './book-list.component.html',
    styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {

    public books: BookModel[];
    public genres: GenreModel[];

    constructor(private http: HttpClient, private notify: NotifyService) { }

    public async ngOnInit() {
        try {
            this.genres = await this.http.get<GenreModel[]>(`${environment.libraryUrl}genres`).toPromise();
            store.dispatch(genresDownloadedAction(this.genres));

            this.books = await this.http.get<BookModel[]>(environment.libraryUrl).toPromise();
            store.dispatch(booksDownloadedAction(this.books));
        }
        catch(err) {
            this.notify.error(err);
        }
    }

    public getBooksByGenre(event: MouseEvent): void {
        const genreId = (event.target as HTMLButtonElement).value;
        this.books = store.getState().books.filter(book => book.genreId === parseInt(genreId));
    }

    public getAllBooks = () => this.books = store.getState().books; 

    public searchBook(event: Event) {
        const searchWord = (event.target as HTMLInputElement).value;
        this.books = store.getState().books.filter(b => b.bookName.includes(searchWord));
        if(!searchWord) this.getAllBooks();
    }

}
