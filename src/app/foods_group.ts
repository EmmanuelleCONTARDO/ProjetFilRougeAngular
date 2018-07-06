export interface AutoComplFoodsGroup {
    categorie: string;
    foods: string[];
}

export interface AutoComplFoods {
    value: string;
    title: string;
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

export interface ListFoods {
    id: number;
    name: string;
    categorie: string;
    glycIndex: number;
    energy: number;
    carboHydrates: number;
    proteins: number;
    lipids: number;
    comment: string;
 }
