import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import {MatTableDataSource} from "@angular/material/table";

// TODO: Replace this with your own data model type
export interface ListArtworkItem {
  artworkId: number;
  name: string;
  description: string;
  artiste : string;
  shippingWeight: number;
  amount: number;
  image1: string;
  image2: string;
  image3: string;
  recommended: number;
  newPrice: number;
  category: {
    categoryId: number;
    name: string;
    description: string;
  }
}


// TODO: replace this with real data from your application
// const EXAMPLE_DATA: ListArtworkItem[] = [
//   {artworkId: 1, name: 'Hydrogen',description:'',artiste:'',shippingWeight: 0 ,amount: 0},
//   {artworkId: 1, name: 'Hydrogen',description:'',artiste:'',shippingWeight: 0 ,amount: 0}
// ]


/**
 * Data source for the ListArtwork view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class ListArtworkDataSource extends MatTableDataSource<ListArtworkItem> {
  data: [] ;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: ListArtworkItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: ListArtworkItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.artworkId, +b.artworkId, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
