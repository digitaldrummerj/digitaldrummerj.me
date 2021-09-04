---
categories: ["Angular"]
date: 2020-04-14T00:00:00Z
draft: true
title: Export Angular Material Table to Excel
---

## Dependencies

Angular 8: 1.2.5
Angular 9: 9

```json
"mat-table-exporter": "^1.2.5",
```

```html
 <mat-table [hidden]="noResults" #table [dataSource]="dataSource" matSort matSortActive="identifier"
            matSortDirection="desc" (matSortChange)="handleSort($event)" matSortDisableClear class="mat-elevation-z8"
            data-cy="tblEntries" matTableExporter #exporter="matTableExporter" [hiddenColumns]="[0]">

            <ng-container matColumnDef="view">
                <mat-header-cell *matHeaderCellDef>
                    <button mat-icon-button type="button"
                    (click)="runReport()" title="Generate an Excel report" [disabled]="isLoadingResults" tabindex="-1" >
                    <fa-icon [icon]="['fas', 'download']" [fixedWidth]="true" size="lg" >
                    </fa-icon>
                </button>
                </mat-header-cell>
                <mat-cell *matCellDef="let element">
                    ...
                </mat-cell>
            </ng-container>
            </mat-table>
```

app.module.ts

```json
import { MatTableExporterModule } from 'mat-table-exporter';
 imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    CdkTableModule,
    FormsModule,
    MatSortModule,
    MatTableModule,
    SharedModule,
    MatTableExporterModule
  ],
```