import {ChangeDetectorRef, ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, Pipe, PipeTransform} from "@angular/core";
import {Grocery} from "../../shared/grocery/grocery";
import {GroceryStore} from "../../shared/grocery/grocery-list.service";

@Pipe({
  name: "itemStatus"
})
export class ItemStatusPipe implements PipeTransform {
  value: Array<Grocery> = [];
  constructor(private _ref: ChangeDetectorRef) {}
  transform(items: Array<Grocery>, deleted: boolean) {
    if (items && items.length) {
      this.value = items.filter((grocery: Grocery) => {
        return grocery.deleted == deleted;
      });
      this._ref.markForCheck();
    }
    return this.value;
  }
}

@Component({
  selector: "grocery-list",
  template: `
    <ListView [items]="store.items | async | itemStatus:showDeleted" row="2" class="small-spacing" >
        <template let-item="item">
            <GridLayout columns="30, *, auto">
            <StackLayout class="toggle-button" col="0" (tap)="toggleDone(item)">
                <Image [src]="imageSource(item)"></Image>
            </StackLayout>
            <Label col="1" [text]="item.name" class="medium-spacing" [class.done]="item.done && !item.deleted"></Label>
            <StackLayout col="2" class="delete-container" (tap)="delete(item)" *ngIf="!item.deleted">
                <Image src="res://delete"></Image>
            </StackLayout>
            </GridLayout>
        </template>
    </ListView>
  `,
  styleUrls: ["./pages/list/grocery-list.css"],
  pipes: [ItemStatusPipe],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GroceryList {
  @Input() showDeleted: boolean;
  @Output() itemsLoaded = new EventEmitter();

  constructor(private store: GroceryStore) {}

  ngOnInit() {
    this.store.load()
      .subscribe(() => this.itemsLoaded.emit("itemsLoaded"));
  }

  imageSource(grocery) {
    if (grocery.deleted) {
      return grocery.done ? "res://selected" : "res://nonselected"
    }
    return grocery.done ? "res://checked" : "res://unchecked";
  }

  toggleDone(grocery: Grocery) {
    if (grocery.deleted) {
      grocery.done = !grocery.done;
      return;
    }

    this.store.toggleDoneFlag(grocery)
      .subscribe(
        () => {},
        () => { alert("An error occurred managing your grocery list") }
      );
  }

  delete(grocery: Grocery) {
    this.store.setDeleteFlag(grocery)
      .subscribe(
        () => {},
        () => alert("An error occurred while deleting an item from your list.")
      );
  }
}
