import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Link } from '../link';
import { ListlinkService } from '../assets/services/listlink.service';
import { LinkactionComponent } from '../components/linkaction/linkaction.component';
@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
    @ViewChild(LinkactionComponent) child!: LinkactionComponent;
    isShowAddForm: boolean = false;
    isSearchValue: boolean = false;
    isPost: boolean = true;
    isProduct: boolean = true;
    constructor(private listLink: ListlinkService) {}

    ngOnInit(): void {}

    onCloseForm() {
        this.isShowAddForm = false;
    }

    onCheckSearchValue(input: string) {
        if (input) {
            this.isSearchValue = true;
        } else if (input.length == 0 || input == '') {
            this.isSearchValue = false;
        }
        console.log(this.isSearchValue);
    }

    handleResetType = () => {
        this.isPost = true;
        this.isProduct = true;
        this.child.updateCheckBox();
    };
}
