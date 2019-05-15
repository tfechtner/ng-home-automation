import { TestBed, async } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { StoreState } from './store.state';
import { StoreAction } from './store.actions';

describe('Store actions', () => {
    let store: Store;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [NgxsModule.forRoot([StoreState])]
        }).compileComponents();
        store = TestBed.get(Store);
    }));

    it('should create an action and add an item', () => {
        store.dispatch(new StoreAction('item-1'));
        store.select(state => state.store.items).subscribe((items: string[]) => {
            expect(items).toEqual(jasmine.objectContaining(['item-1']));
        });
    });

});
