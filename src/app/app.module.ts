import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

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
import { AdministrativeLevelOneService } from '@app/services/administrative-level-one.service';
import { DisplayValuePipe } from './pipes/display-value.pipe';
import { EventTypeService } from '@services/event-type.service';
import { DiagnosisTypeService } from '@services/diagnosis-type.service';
import { DiagnosisService } from '@services/diagnosis.service';
import { SpeciesService } from '@services/species.service';
import { CountyService } from '@services/county.service';
import { LegalStatusService } from '@app/services/legal-status.service';
import { CountryService } from '@app/services/country.service';
import { LandOwnershipService } from '@app/services/land-ownership.service';
import { AgeBiasService } from '@app/services/age-bias.service';
import { SexBiasService } from '@app/services/sex-bias.service';

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
    NgxDatatableModule,
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
  providers: [
    EventService,
    EventTypeService,
    LegalStatusService,
    LandOwnershipService,
    CountryService,
    AdministrativeLevelOneService,
    CountyService,
    DiagnosisTypeService,
    DiagnosisService,
    SpeciesService,
    AgeBiasService,
    SexBiasService
  ],
  bootstrap: [AppComponent],
  entryComponents: [SearchDialogComponent]
})
export class AppModule { }


