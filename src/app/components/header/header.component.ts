import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
    headerTitles = [
        { title: 'CẤU HÌNH', selected: false },
        { title: 'MUA HÀNG', selected: false },
        { title: 'KHO HÀNG', selected: false },
        { title: 'ĐIỀU PHỐI', selected: false },
        { title: 'MARKETING', selected: false },
        { title: 'E-COMMERCE', selected: true },
        { title: 'KINH DOANH', selected: false },
        { title: 'NHÂN SỰ', selected: false },
        { title: 'BÁO CÁO', selected: false },
    ];

    ngOnInit(): void {}
}
