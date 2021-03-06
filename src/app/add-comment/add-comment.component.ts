import { Component, OnInit, Input } from '@angular/core';
import { Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray, Validators, PatternValidator } from '@angular/forms/';
import { Observable } from 'rxjs';



import { MatDialog, MatDialogRef } from '@angular/material';
import { MatSnackBar } from '@angular/material';
import { MAT_DIALOG_DATA } from '@angular/material';

import { CommentService } from '@services/comment.service';
import { CommentTypeService } from '@app/services/comment-type.service';
import { CommentType } from '@interfaces/comment-type';

import { DataUpdatedService } from '@app/services/data-updated.service';
import { FIELD_HELP_TEXT } from '@app/app.field-help-text';
import { APP_SETTINGS } from '@app/app.settings';
declare let gtag: Function;

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.scss']
})
export class AddCommentComponent implements OnInit {
  errorMessage = '';
  submitLoading = false;
  object_id;

  commentTypes: CommentType[];

  commentObjectString;

  commentForm: FormGroup;

  buildCommentForm() {
    this.commentForm = this.formBuilder.group({
      comment: '',
      comment_type: null,
      object_id: null,
      new_content_type: ''
    });
  }

  constructor(
    private formBuilder: FormBuilder,
    public snackBar: MatSnackBar,
    public addCommentDialogRef: MatDialogRef<AddCommentComponent>,
    private commentService: CommentService,
    private commentTypeService: CommentTypeService,
    private dataUpdatedService: DataUpdatedService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.buildCommentForm();
  }

  ngOnInit() {

    this.commentForm.get('object_id').setValue(this.data.object_id);

    switch (this.data.comment_object) {
      case 'event':
        this.commentObjectString = 'Event';
        this.commentForm.get('new_content_type').setValue('event');
        break;
      case 'eventlocation':
        this.commentObjectString = 'Event Location';
        this.commentForm.get('new_content_type').setValue('eventlocation');
        break;
      case 'servicerequest':
        this.commentObjectString = 'Service Request';
        this.commentForm.get('new_content_type').setValue('servicerequest');
        break;
      case 'eventgroup':
        this.commentObjectString = 'Event Group';
        this.commentForm.get('new_content_type').setValue('eventgroup');
        break;
    }

    // get comment types from the commentTypes service
    this.commentTypeService.getCommentTypes()
      .subscribe(
        commentTypes => {
          this.commentTypes = commentTypes;
          // if the comment context is  event comment or service request comment, remove the 'special' comment types
          if (this.data.comment_object === 'event' || this.data.comment_object === 'servicerequest') {
            for (const type of APP_SETTINGS.SPECIAL_COMMENT_TYPES) {
              for (const commentType of this.commentTypes) {
                if (commentType.id === type.id) {
                  this.commentTypes = this.commentTypes.filter(commenttype => commenttype.id !== type.id);
                }
              }
            }
          }
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
  }

  commentTooltip() {
    let string;
    if (this.data.comment_object === 'eventlocation') {
      string = FIELD_HELP_TEXT.editLocationCommentTooltip;
    } else if (this.data.comment_object === 'event') {
      string = FIELD_HELP_TEXT.eventCommentTooltip;
    } else if (this.data.comment_object === 'servicerequest') {
      string = FIELD_HELP_TEXT.serviceRequestCommentTooltip;
    } else if (this.data.comment_object === 'eventgroup') {
      string = 'Comments on Event Group';
    }
    return string;
   }

   commentTypeTooltip() {
    let string;
    if (this.data.comment_object === 'eventlocation') {
      string = FIELD_HELP_TEXT.locationCommentTypeTooltip;
    } else if (this.data.comment_object === 'event') {
      string = FIELD_HELP_TEXT.eventCommentTypeTooltip;
    }else if (this.data.comment_object === 'servicerequest') {
      string = 'Flags comment as belonging to a certain category.';
    } else if (this.data.comment_object === 'eventgroup') {
      string = 'Flags comment as belonging to a certain category.';
    }
    return string;
   }

  eventCommentTooltip() { const string = FIELD_HELP_TEXT.eventCommentTooltip; return string; }
  eventCommentTypeTooltip() { const string = FIELD_HELP_TEXT.eventCommentTypeTooltip; return string; }

  locationCommentTooltip() { const string = FIELD_HELP_TEXT.locationCommentTooltip; return string; }

  editLocationCommentTooltip() { const string = FIELD_HELP_TEXT.editLocationCommentTooltip; return string; }
  locationCommentTypeTooltip() { const string = FIELD_HELP_TEXT.locationCommentTypeTooltip; return string; }

  serviceRequestCommentTooltip() { const string = FIELD_HELP_TEXT.serviceRequestCommentTooltip; return string; }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  onSubmit(formValue) {

    this.submitLoading = true;

    this.commentService.create(formValue)
      .subscribe(
        (comment) => {
          this.submitLoading = false;
          this.openSnackBar('Comment Successfully Saved', 'OK', 5000);
          this.dataUpdatedService.triggerRefresh();
          this.addCommentDialogRef.close();
          gtag('event', 'click', { 'event_category': 'Comments', 'event_label': 'Comment submitted, type: ' + comment.comment_type });
        },
        error => {
          this.errorMessage = <any>error;
          this.openSnackBar('Error. Comment not saved. Error message: ' + error, 'OK', 8000);

        }
      );
  }

}
