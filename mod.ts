import { Collection } from "./deps.ts"
import { spy } from "./deps.ts"


/**
 * 
 * @param additional additional properties that should be set explicitly
 * @returns a spy-mock for mongo_deno Collections
 */

export function getMockCollection<T>(additional: Partial<Collection<T>>): Collection<T> {
    let props: Partial<Collection<T>> = {
        name: ""
    }

    let methods: (keyof Omit<Collection<T>, "name">)[] = [
        "aggregate",
        "count",
        "countDocuments",
        "createIndexes",
        "delete",
        "deleteMany",
        "deleteOne",
        "distinct",
        "drop",
        "dropIndexes",
        "estimatedDocumentCount",
        "find",
        "findAndModify",
        "findOne",
        "insert",
        "insertMany",
        "insertOne",
        "listIndexes",
        "replaceOne",
        "updateMany",
        "updateOne"
    ]



    let mockCollection = {
        ...props,
        ...additional
    }


    methods.forEach((method) => {
        mockCollection[method] = additional ? _wrapSpy(mockCollection[method]) : _wrapSpy();
    });


    return mockCollection as Collection<T>
}

export function _wrapSpy(func?: Function) {
    // deno-lint-ignore no-explicit-any
    return func ? spy(func as any) as any : spy();
}
