import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';


import { AppComponent } from './app.component';
import { ROUTING } from './app.routing';
import { HomeComponent } from './home/home.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { EventSubmissionComponent } from './event-submission/event-submission.component';
import { DiagnosticServicesComponent } from './diagnostic-services/diagnostic-services.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { EventService } from '@app/services/event.service';
import { SearchDialogComponent } from './search-dialog/search-dialog.component';
import { StateService } from '@app/services/state.service';
import { DisplayValuePipe } from './pipes/display-value.pipe';
import { EventTypeService } from '@services/event-type.service';
import { DiagnosisTypeService } from '@services/diagnosis-type.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EventDetailsComponent,
    EventSubmissionComponent,
    DiagnosticServicesComponent,
    UserDashboardComponent,
    SearchDialogComponent,
    DisplayValuePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    ROUTING,
    FlexLayoutModule,
    MatToolbarModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule
  ],
  providers: [EventService, EventTypeService, StateService, DiagnosisTypeService],
  bootstrap: [AppComponent],
  entryComponents: [SearchDialogComponent]
})
export class AppModule { }


