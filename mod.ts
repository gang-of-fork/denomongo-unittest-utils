import {AggregatePipeline, AggregateOptions, Collection, Filter, CountOptions} from "./deps.ts"
import { spy } from "./deps.ts"



export class MockCollection<T> extends Collection<T> {
    static instance: Collection<any>

    static getInstance(): Collection<any> {
        return MockCollection.instance;
    }
    static initMock<T>(additional: Partial<Collection<T>>) {
        MockCollection.instance = MockCollection.getMockCollection<T>(additional)
        console.log("updated mock to " + additional.name)
    }

    static getMockWithProxy<T>() {
        return MockCollection.getMockCollection({
            countDocuments: (filter?: Filter<unknown> | undefined, options?: CountOptions | undefined): Promise<number> => MockCollection.instance.countDocuments(filter, options)  
        })
    }

/*
    static countDocuments(filter?: Filter<any> | undefined, options?: CountOptions | undefined): Promise<number> {
        return MockCollection.instance.countDocuments(filter, options)
    }
    */

    /**
     * 
     * @param additional additional properties that should be set explicitly
     * @returns a spy-mock for mongo_deno Collections
     */
    private static getMockCollection<T>(additional: Partial<Collection<T>>): Collection<T> {
        const props: Partial<Collection<T>> = {
            name: "",
        }

        const methods: (keyof Omit<Collection<T>, "name">)[] = [
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



        const mockCollection = {
            ...props,
            ...additional
        }


        methods.forEach((method) => {
            mockCollection[method] = additional ? _wrapSpy(mockCollection[method]) : _wrapSpy();
        });


        return mockCollection as Collection<T>
    }


    
}

export function _wrapSpy(func?: Function) {
    // deno-lint-ignore no-explicit-any
    return func ? spy(func as any) as any : spy();
}
