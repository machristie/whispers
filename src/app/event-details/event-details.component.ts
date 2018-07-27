import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { MatPaginator, MatSort, MatTableDataSource } from '@angular/material';
declare let L: any;

import { MatSnackBar } from '@angular/material';

import 'rxjs/add/operator/switchMap';
import { EventService } from '@services/event.service';
import { AdministrativeLevelOneService } from '@services/administrative-level-one.service';

import { EventDetail } from '@interfaces/event-detail';
import { EventLocation } from '@interfaces/event-location';
import { LocationSpecies } from '@interfaces/location-species';
import { EditEventComponent } from '@app/edit-event/edit-event.component';
import { AddEventDiagnosisComponent } from '@app/add-event-diagnosis/add-event-diagnosis.component';
import { EditSpeciesComponent } from '@app/edit-species/edit-species.component';
import { AddSpeciesDiagnosisComponent } from '@app/add-species-diagnosis/add-species-diagnosis.component';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit {

  //@ViewChild('speciesTable') table: any;
  id: string;
  map;
  states = [];

  locationSpeciesDataSource: MatTableDataSource<LocationSpecies>;

  editEventDialogRef: MatDialogRef<EditEventComponent>;
  addEventDiagnosisDialogRef: MatDialogRef<AddEventDiagnosisComponent>;
  editSpeciesDialogRef: MatDialogRef<EditSpeciesComponent>;
  addSpeciesDiagnosisDialogRef: MatDialogRef<AddSpeciesDiagnosisComponent>;

  eventData: EventDetail;
  eventLocationSpecies: LocationSpecies[] = [];

  selection;

  eventDataLoading = true;

  // speciesTableRows = [];
  // expanded: any = {};
  // timeout: any;
  // speciesTableColumns = [
  //   { prop: 'Species' },
  //   { name: 'Population' },
  //   { name: 'Sick' },
  //   { name: 'Dead' },
  //   { name: 'Estimated Sick' },
  //   { name: 'Estimated Dead' }
  // ];

  errorMessage;

  locationSpeciesDisplayedColumns = [
    'select',
    'species',
    'location',
    'population',
    'sick',
    'dead',
    'sick_estimated',
    'dead_estimated'
  ];

  @ViewChild(MatPaginator) locationSpeciesPaginator: MatPaginator;
  @ViewChild(MatSort) locationSpeciesSort: MatSort;

  constructor(private route: ActivatedRoute,
    private _eventService: EventService,
    private dialog: MatDialog,
    private adminLevelOneService: AdministrativeLevelOneService,
    public snackBar: MatSnackBar
  ) {
    this.eventLocationSpecies = [];
  }

  ngOnInit() {

    const initialSelection = [];
    const allowMultiSelect = true;
    this.selection = new SelectionModel<LocationSpecies>(allowMultiSelect, initialSelection);

    this.eventLocationSpecies = [];

    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');

      // Actual request to event details service, using id
      this._eventService.getEventDetails(this.id)
        .subscribe(
          (eventdetails) => {
            this.eventData = eventdetails;

            for (const event_location of this.eventData.event_locations) {
              for (const location_species of event_location.location_species) {
                location_species.administrative_level_two_string = event_location.administrative_level_two_string;
                location_species.administrative_level_one_string = event_location.administrative_level_one_string;
                location_species.country_string = event_location.country_string;
                this.eventLocationSpecies.push(location_species);
              }
            }
            
            this.locationSpeciesDataSource = new MatTableDataSource(this.eventLocationSpecies);
            //this.speciesTableRows = this.eventLocationSpecies;
            this.eventDataLoading = false;
          },
          error => {
            this.errorMessage = <any>error;
          }
        );

    });

    // get states from the state service
    this.adminLevelOneService.getAdminLevelOnes()
      .subscribe(
        (states) => {
          this.states = states;
        },
        error => {
          this.errorMessage = <any>error;
        }
      );

    /*setTimeout(() => {
      this.map = new L.Map('map', {
        center: new L.LatLng(39.8283, -98.5795),
        zoom: 4,
      });

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(this.map);

    }, 500);*/
  }

  openSnackBar(message: string, action: string, duration: number) {
    this.snackBar.open(message, action, {
      duration: duration,
    });
  }

  editEvent(id: string) {
    // Open dialog for editing event
    this.editEventDialogRef = this.dialog.open(EditEventComponent, {
      data: {
        eventData: this.eventData
      }
      // minWidth: 200
      // height: '75%'
    });

    this.editEventDialogRef.afterClosed()
      .subscribe(
        () => {
          this._eventService.getEventDetails(this.id)
            .subscribe(
              (eventdetails) => {
                this.eventData = eventdetails;

                this.eventLocationSpecies = [];
                for (const event_location of this.eventData.event_locations) {
                  for (const location_species of event_location.location_species) {
                    location_species.administrative_level_two_string = event_location.administrative_level_two_string;
                    location_species.administrative_level_one_string = event_location.administrative_level_one_string;
                    location_species.country_string = event_location.country_string;
                    this.eventLocationSpecies.push(location_species);
                  }

                }
                console.log('eventLocationSpecies:', this.eventLocationSpecies);
                //this.speciesTableRows = this.eventLocationSpecies;
                this.eventDataLoading = false;
              },
              error => {
                this.errorMessage = <any>error;
              }
            );
        },
        error => {
          this.errorMessage = <any>error;
        }
      );
  }

  addEventDiagnosis(id: string) {
    // Open dialog for adding event diagnosis
    this.addEventDiagnosisDialogRef = this.dialog.open(AddEventDiagnosisComponent, {
      data: {
        event_id: id
      }
      // minWidth: 200
      // height: '75%'
    });
  }

  editSpecies(id: string) {
    if (this.selection.selected.length > 1 || this.selection.selected.length == 0) {
      this.openSnackBar('Please select a species (only one) to edit', 'OK', 5000);
    } else if (this.selection.selected.length === 1) {
      // Open dialog for adding event diagnosis
      this.editSpeciesDialogRef = this.dialog.open(EditSpeciesComponent, {
        data: {
          species: this.selection.selected[0]
        }
        // minWidth: 200
        // height: '75%'
      });
    }
  }

  addSpeciesDiagnosis(id: string) {
    // Open dialog for adding event diagnosis
    this.addSpeciesDiagnosisDialogRef = this.dialog.open(AddSpeciesDiagnosisComponent, {
      // minWidth: 200
      // height: '75%'
    });
  }

  // Determine comment type based on id, return for display in app along side comment
  getCommentType(comment_id) {
    let comment_type;
    switch(comment_id) {
      case 1:
        comment_type = "Site description";
        break;
      case 2:
        comment_type = "History";
        break;
      case 3:
        comment_type = "Environmental factors";
        break;
      case 4:
        comment_type = "Clinical signs";
        break;
      case 5:
        comment_type = "General";
        break;
  }
    return comment_type;
  }

  // From angular material table sample on material api reference site
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.locationSpeciesDataSource.data.length;
    return numSelected == numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.locationSpeciesDataSource.data.forEach(row => this.selection.select(row));
  }


  // toggleExpandRow(row) {
  //   console.log('Toggled Expand Row!', row);
  //   this.table.rowDetail.toggleExpandRow(row);
  // }

  // onDetailToggle(event) {
  //   console.log('Detail Toggled', event);
  // }

}
