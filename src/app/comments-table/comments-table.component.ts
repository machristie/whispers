import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { APP_UTILITIES } from '@app/app.utilities';
import { APP_SETTINGS } from '@app/app.settings';
import { FIELD_HELP_TEXT } from '@app/app.field-help-text';

import { EventService } from '@services/event.service';
import { CurrentUserService } from '@services/current-user.service';
import { CommentTypeService } from '@services/comment-type.service';
import { CommentService } from '@app/services/comment.service';

import { CommentType } from '@interfaces/comment-type';

import { EventDetailsComponent } from '@app/event-details/event-details.component';

@Component({
  selector: 'app-comments-table',
  templateUrl: './comments-table.component.html',
  styleUrls: ['./comments-table.component.scss']
})
export class CommentsTableComponent implements OnInit {

  errorMessage: string;
  currentUser;
  eventID: string;
  resultsLoading = false;
  eventData: any[];
  commentsDataSource;

  orderParams = '';

  initialSelection = [];
  allowMultiSelect = true;
  selection = new SelectionModel<Number>(this.allowMultiSelect, this.initialSelection);
  docsOnThisPage: any[] = [];
  from: number;
  pageSize: number;

  commentDisplayedColumns = [
    'comment',
    'comment_type',
    'created_date',
    'created_by_first_name',
    'created_by_last_name',
    'created_by_organization_string',
    'content_type_string'
  ];

  @ViewChild(MatPaginator) commentsPaginator: MatPaginator;
  @ViewChild(MatSort) commentsSort: MatSort;

  constructor(
    private route: ActivatedRoute,
    private eventService: EventService,
    private router: Router
  ) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.eventID = params.get('id');

      // Actual request to event details service, using id
      this.eventService.getEventDetails(this.eventID)
        .subscribe(
          (eventdetails) => {
            this.eventData = eventdetails;
            this.dosomething();
          },
          error => {

          }
        );
    });
  }

  dosomething() {
    console.log(this.eventData + ' hi');
  }
  _setDataSource(indexNumber) {
    setTimeout(() => {
      switch (indexNumber) {
        case 0:
          !this.commentsDataSource.paginator ? this.commentsDataSource.paginator = this.commentsDataSource : null;
          break;
      }
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.commentsDataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.commentsDataSource.data.forEach(row => this.selection.select(row));
  }
}

