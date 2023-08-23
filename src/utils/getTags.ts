import { BillsDataItemType } from "data";

export function getTags(items: BillsDataItemType[]): string[] {
    const filterTags: string[] = []
    items.map((item: BillsDataItemType) => {
        item.tags.map((tag: string) => {
            if (!filterTags.some(e => e === tag)) {
                filterTags.push(tag);
            }
        })
    })

    return filterTags
}