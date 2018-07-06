export interface AutoComplFoodsGroup {
    categorie: string;
    foods: string[];
}

export interface FoodsGroup {
    id: number;
    name: string;
}

export interface Foods {
    id: number;
    name: string;
    foodsGroup: FoodsGroup;
    glycIndex: number;
    energy: number;
    carboHydrates: number;
    proteins: number;
    lipids: number;
    comment: string;
    createDate: string;
}
