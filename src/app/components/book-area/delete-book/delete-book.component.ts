import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookModel } from 'src/app/models/book-model';
import { bookDeletedAction, bookUpdatedAction } from 'src/app/redux/books-state';
import store from 'src/app/redux/store';
import { NotifyService } from 'src/app/services/notify.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-delete-book',
    templateUrl: './delete-book.component.html',
    styleUrls: ['./delete-book.component.css']
})
export class DeleteBookComponent implements OnInit {

    constructor(private notify: NotifyService, private http: HttpClient, private activatedRoute: ActivatedRoute, private router: Router) {}

    public async ngOnInit() {
        try {
            const uuid = this.activatedRoute.snapshot.params.uuid;

            const answer = confirm("Are you sure?");
            if(!answer) {
                this.router.navigateByUrl("/home");
                return;
            }

            await this.http.delete<BookModel>(environment.libraryUrl + uuid).toPromise();
            store.dispatch(bookDeletedAction(uuid));

            this.notify.success("The book was successfully deleted !");
            this.router.navigateByUrl("/home");
        }
        catch (err) {
            this.notify.error(err);
            console.log(err);
        }
    }

}
