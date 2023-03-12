import { Component, EventEmitter, Output, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ListlinkService } from 'src/app/assets/services/listlink.service';
@Component({
    selector: 'app-formupdate',
    templateUrl: './formupdate.component.html',
    styleUrls: ['./formupdate.component.scss'],
})
export class FormupdateComponent implements OnInit {
    myForm!: FormGroup;

    @Input() isProductType!: string;
    @Input() isPostType!: string;
    @Input() descriptionValue!: string;
    @Input() oldSiteValue!: string;
    @Input() newSiteValue!: string;
    @Input() isShowEditForm!: boolean;
    @Input() selectedLink!: any;

    @Output() handleCloseEditForm: EventEmitter<void> = new EventEmitter<void>();
    @Output() handleCloseForm: EventEmitter<void> = new EventEmitter<void>();

    constructor(private myService: ListlinkService) {}

    ngOnInit(): void {
        this.myForm = new FormGroup({
            linkType: new FormControl(this.selectedLink?.linkType, Validators.required),
            description: new FormControl(this.selectedLink?.description, Validators.required),
            oldSite: new FormControl(this.selectedLink?.oldSite, Validators.required),
            newSite: new FormControl(this.selectedLink?.newSite, Validators.required),
        });

        this.myForm.get('linkFormGroup.linkType')?.valueChanges.subscribe((value) => {
            this.myForm.get('linkFormGroup')?.patchValue({ linkType: value }, { emitEvent: false });
        });
    }

    ngOnChanges(simpleChanges: SimpleChanges) {
        // set value by onChanges when click edit button to bind value of selectedLink to form
        this.myForm?.controls['linkType'].setValue(this.selectedLink?.type);
        this.myForm?.controls['description'].setValue(this.selectedLink?.description);
        this.myForm?.controls['oldSite'].setValue(this.selectedLink?.old_link);
        this.myForm?.controls['newSite'].setValue(this.selectedLink?.new_link);
    }

    handleOnSubmit = () => {
        if (
            this.myForm.value.description != undefined &&
            this.myForm.value.oldSite != undefined &&
            this.myForm.value.newSite != undefined
        ) {
            if (this.myForm.value.linkType) {
                const newUpdatedLink = {
                    type: this.myForm.value.linkType,
                    description: this.myForm.value.description,
                    oldLink: this.myForm.value.oldSite,
                    newLink: this.myForm.value.newSite,
                };

                if (this.isShowEditForm) {
                    this.myService.editLink(this.selectedLink.id, newUpdatedLink);
                    this.myForm.reset();
                    window.alert('EDIT SUCCESSFULLY');
                } else {
                    this.myService.addLink(newUpdatedLink);
                    this.myForm.reset();
                    window.alert('ADD SUCCESSFULLY');
                }
            } else {
                window.alert('Please fill all of fields');
            }
        } else if (
            this.descriptionValue == undefined &&
            this.isPostType == undefined &&
            this.isProductType == undefined &&
            this.oldSiteValue == undefined &&
            this.newSiteValue == undefined
        ) {
            window.alert('Please fill all of fields');
        }
    };

    handleResetForm() {
        this.myForm.reset({
            linkFormGroup: {
                linkType: 'product',
            },
        });
    }

    findControl(controlPath: string) {
        return this.myForm.get(controlPath);
    }

    handleRadioClick(event: MouseEvent) {
        event.preventDefault();
    }

    handleClose(event: MouseEvent) {
        event.preventDefault();
        if (this.isShowEditForm) {
            this.handleCloseEditForm.emit();
        } else {
            this.handleCloseForm.emit();
        }
    }
}
