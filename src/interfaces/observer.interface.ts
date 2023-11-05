export interface ObserverInterface<TModel> {
    created: (model: TModel) => Promise<void> | void
    updated: (model: TModel) => Promise<void> | void
    deleted: (model: TModel) => Promise<void> | void
}