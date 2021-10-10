import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookModel } from 'src/app/models/book-model';
import { GenreModel } from 'src/app/models/genre-model';
import { bookAddedAction, bookUpdatedAction } from 'src/app/redux/books-state';
import store from 'src/app/redux/store';
import { NotifyService } from 'src/app/services/notify.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-book-actions',
    templateUrl: './book-actions.component.html',
    styleUrls: ['./book-actions.component.css']
})
export class BookActionsComponent implements OnInit {

    public book: BookModel = history.state.data;
    public genres: GenreModel[] = store.getState().genres;
    public editStatus: boolean;

    constructor(private http: HttpClient, private notify: NotifyService, private router: Router) { }
    
    @HostListener("window:beforeunload", ["$event"]) 
    async unloadHandler(event: Event) {
        event.returnValue = false;
    }

    public async ngOnInit() {
        try {
            if(!this.book) {
                this.book = new BookModel();
            }
            else {
                this.editStatus = true;
            }
            if(!this.genres.length) this.genres = await this.http.get<GenreModel[]>(`${environment.libraryUrl}genres`).toPromise();
        }
        catch(err) {
            this.notify.error(err);
        }
    }
    
    public async send() {
        try {
            if(this.editStatus) {
                await this.http.patch<BookModel>(environment.libraryUrl + this.book.uuid, this.book).toPromise();
                store.dispatch(bookUpdatedAction(this.book));
                this.notify.success("The book was edited successfully !");
            }
            else {
                await this.http.post<BookModel>(environment.libraryUrl, this.book).toPromise();
                store.dispatch(bookAddedAction(this.book));
                this.notify.success("The book was successfully added !");
            }
            this.router.navigateByUrl("/home"); 
        }
        catch(err) {
            this.notify.error(err);
        }
    }
}
