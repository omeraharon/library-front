import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { BookModel } from 'src/app/models/book-model';
import { bookDeletedAction } from 'src/app/redux/books-state';
import store from 'src/app/redux/store';
import { NotifyService } from 'src/app/services/notify.service';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-book-card',
    templateUrl: './book-card.component.html',
    styleUrls: ['./book-card.component.css']
})
export class BookCardComponent {

    @Input()
    public book: BookModel;

}
