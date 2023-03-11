import { Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { listLink } from 'src/app/listLink';
import { Link } from 'src/app/link';

@Injectable({
    providedIn: 'root',
})
export class ListlinkService {
    private listLink$ = new BehaviorSubject<Link[]>(listLink);
    private searchValue$ = new BehaviorSubject<string>('');
    selectedLinkList: [] = [];
    isShowProduct: boolean = true;
    isShowPost: boolean = true;

    getListLink(): Observable<Link[]> {
        if (this.searchValue$.value.length <= 0) {
            if ((this.isShowProduct && this.isShowPost) || (!this.isShowProduct && !this.isShowPost)) {
                this.listLink$.next(listLink);
            }
            if (!this.isShowProduct && this.isShowPost) {
                const filteredList = this.listLink$.value.filter((item) => item.type != 'product');
                this.listLink$.next(filteredList);
            }
            if (this.isShowProduct && !this.isShowPost) {
                const filteredList = this.listLink$.value.filter((item) => item.type != 'post');
                this.listLink$.next(filteredList);
            }
        } else if (this.searchValue$.value.length > 0) {
            if ((this.isShowProduct && this.isShowPost) || (!this.isShowProduct && !this.isShowPost)) {
                const filteredData = listLink.filter((item) => {
                    console.log(item.description);
                    console.log(this.searchValue$.value);
                    const result = item.description
                        .toLocaleLowerCase()
                        .includes(this.searchValue$.value.toLocaleLowerCase());
                    console.log(result);
                    return result;
                });

                this.listLink$.next(filteredData);
            }
            if (!this.isShowProduct && this.isShowPost) {
                let filteredTypeList = listLink.filter((item) => item.type != 'product');
                let searchedList = filteredTypeList.filter((list) => {
                    return list.description.toLocaleLowerCase().includes(this.searchValue$.value.toLocaleLowerCase());
                });
                console.log(searchedList);
                this.listLink$.next(searchedList);
                console.log(this.listLink$.value);
            }
            if (this.isShowProduct && !this.isShowPost) {
                let filteredTypeList = listLink.filter((item) => item.type != 'post');
                let searchedList = filteredTypeList.filter((list) => {
                    return list.description.toLocaleLowerCase().includes(this.searchValue$.value.toLocaleLowerCase());
                });
                console.log(searchedList);
                this.listLink$.next(searchedList);
                console.log(this.listLink$.value);
            }
        }
        return this.listLink$.asObservable();
    }

    getSearchQuery = (input: string) => {
        this.searchValue$.next(input);
        console.log(this.searchValue$.value);
        this.getListLink();
    };

    getLinksByDescription(description: string) {
        const link = this.listLink$.value.filter((item) =>
            item.description.toLocaleLowerCase().includes(description.toLocaleLowerCase()),
        )!;
        const filteredLinks = of(link);
        return filteredLinks;
    }

    addLink = (newlink: { type: string; description: string; oldLink: string; newLink: string }) => {
        const newObjectLink = {
            id: this.listLink$.value[this.listLink$.value.length - 1].id + 1,
            type: newlink.type,
            description: newlink.description,
            old_link: newlink.oldLink,
            new_link: newlink.newLink,
        };

        this.listLink$.next([...this.listLink$.value, newObjectLink]);
        window.alert('ADD SUCCESSFULLY');
    };

    editLink = (id: number, newlink: { type: string; description: string; oldLink: string; newLink: string }) => {
        const index = this.listLink$.value.findIndex((x) => x.id == id);
        if (index === -1) {
            window.alert('Khong tim thay link');
        }
        const updatedLink = {
            ...this.listLink$.value[index],
            type: newlink.type,
            description: newlink.description,
            old_link: newlink.oldLink,
            new_link: newlink.newLink,
        };
        const updatedList = [...this.listLink$.value];
        updatedList[index] = updatedLink;
        this.listLink$.next(updatedList);
        window.alert('EDIT SUCCESSFULLY');
    };

    deleteLink = (id: number) => {
        const deletedLink = this.listLink$.value.filter((list) => list.id !== id);
        this.listLink$.next(deletedLink);
        window.alert('DELETE SUCCESSFULLy');
    };

    deleteSelectedList(ids: number[]): Observable<Link[]> {
        if (ids.length > 0) {
            const currentLinks = this.listLink$.getValue();
            const newLinks = currentLinks.filter((link) => !ids.includes(link.id));
            this.listLink$.next(newLinks);
            window.alert('DELETE SUCCESSFULLy');
            return of(newLinks);
        } else {
            window.alert('SelectedLink Not Found');
            return this.listLink$;
        }
    }

    onFilter = (filter: { post: boolean; product: boolean }) => {
        this.isShowPost = filter.post;
        this.isShowProduct = filter.product;
        console.log(filter);
        this.getListLink();
        console.log(this.listLink$);
    };

    onResetFilter = () => {
        this.isShowPost = true;
        this.isShowProduct = true;
        this.getListLink();
    };
}
