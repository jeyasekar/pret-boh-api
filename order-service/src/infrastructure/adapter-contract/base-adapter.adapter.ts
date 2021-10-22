export interface IBaseAdapter<TInput, TResult> {
    handle(data?: TInput, param?: any):
        Promise<TResult> | Promise<TResult[]>;
}