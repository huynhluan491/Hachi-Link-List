import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ListlinkService } from 'src/app/assets/services/listlink.service';

@Component({
    selector: 'app-linkaction',
    templateUrl: './linkaction.component.html',
    styleUrls: ['./linkaction.component.scss'],
})
export class LinkactionComponent implements OnChanges {
    // isPost: boolean = true;
    // isProduct: boolean = true;
    @Input() isPost: boolean = true;
    @Input() isProduct: boolean = true;
    isShowAddForm: boolean = false;
    @Input() onAddLink!: (link: object) => void;

    @Output() onCloseForm: EventEmitter<void> = new EventEmitter<void>();

    constructor(private myService: ListlinkService) {}

    handleShowAddForm = () => {
        this.isShowAddForm = !this.isShowAddForm;
    };

    ngOnChanges(changes: SimpleChanges): void {}

    handleShowPost(input: any) {
        this.isPost = input.target.checked;
        let checkObj = {
            post: this.isPost,
            product: this.isProduct,
        };
        this.myService.onFilter(checkObj);
    }

    handleShowProduct(input: any) {
        this.isProduct = input.target.checked;
        let checkObj = {
            post: this.isPost,
            product: this.isProduct,
        };
        this.myService.onFilter(checkObj);
    }

    handleCloseForm() {
        this.isShowAddForm = false;
    }

    onAddLinkHandler = (newLink: any) => {
        if (this.onAddLink) {
            this.onAddLink(newLink);
        }
    };

    updateCheckBox() {
        this.isPost = true;
        this.isProduct = true;
    }
}
