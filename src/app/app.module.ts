import { NgModule, forwardRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatPaginator } from '@angular/material/paginator';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HeaderComponent } from './components/header/header.component';
import { LinkactionComponent } from './components/linkaction/linkaction.component';
import { SearchbarComponent } from './components/searchbar/searchbar.component';
import { ListlinkComponent } from './components/listlink/listlink.component';
import { FormupdateComponent } from './components/formupdate/formupdate.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPaginationModule, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        HeaderComponent,
        LinkactionComponent,
        SearchbarComponent,
        ListlinkComponent,
        FormupdateComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        MatFormFieldModule,
        MatPaginatorModule,
        MatTableModule,
        ReactiveFormsModule,
        NgbModule,
        NgbPaginationModule,
        NgbAlertModule,
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => FormupdateComponent),
            multi: true,
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
