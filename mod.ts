import { Collection, Filter, CountOptions, AggregatePipeline, AggregateOptions, DeleteOptions, DropOptions, DropIndexOptions, DistinctOptions, FindOptions, IndexOptions, InsertOptions, UpdateOptions, ConnectOptions, CollationOptions, CreateUserOptions, CreateIndexOptions, FindAndModifyOptions, InsertDocument, Document, Bson, FindCursor, AggregateCursor, ListIndexesCursor,  UpdateFilter} from "./deps.ts"
import { spy } from "./deps.ts"




export class MockCollection<T> extends Collection<T> {
    static instance: Collection<any>

    static getInstance(): Collection<any> {
        return MockCollection.instance;
    }
    static initMock<T>(additional: Partial<Collection<T>>) {
        MockCollection.instance = MockCollection.getMockCollection<T>(additional)
    }

    static getMockWithProxy<T>() {
        return MockCollection.getMockCollection({
            aggregate: (pipeline: AggregatePipeline<any>[], options?: AggregateOptions | undefined): AggregateCursor<any> => MockCollection.instance.aggregate(pipeline, options),
            countDocuments: (filter?: Filter<unknown> | undefined, options?: CountOptions | undefined): Promise<number> => MockCollection.instance.countDocuments(filter, options),
            createIndexes: (options: CreateIndexOptions): Promise<{
                ok: number;
                createdCollectionAutomatically: boolean;
                numIndexesBefore: number;
                numIndexesAfter: number;
            }> => MockCollection.instance.createIndexes(options),
            delete: (filter: Filter<unknown>, options?: DeleteOptions | undefined): Promise<number> => MockCollection.instance.delete(filter, options),
            deleteMany: (filter: Filter<unknown>, options?: DeleteOptions | undefined): Promise<number> => MockCollection.instance.deleteMany(filter, options),
            deleteOne: (filter: Filter<unknown>, options?: DeleteOptions | undefined): Promise<number> => MockCollection.instance.deleteOne(filter, options),
            distinct: (key: string, query?: Filter<unknown> | undefined, options?: DistinctOptions | undefined): Promise<any> => MockCollection.instance.distinct(key, options),
            drop: (options?: DropOptions | undefined): Promise<void> => MockCollection.instance.drop(options),
            dropIndexes: (options: DropIndexOptions): Promise<{
                ok: number;
                nIndexesWas: number;
            }> => MockCollection.instance.dropIndexes(options),
            estimatedDocumentCount: (): Promise<number> => MockCollection.instance.estimatedDocumentCount(),
            find: (filter?: Filter<unknown> | undefined, options?: FindOptions | undefined): FindCursor<unknown> => MockCollection.instance.find(filter, options),
            findAndModify: (filter?: Filter<unknown> | undefined, options?: FindAndModifyOptions<unknown> | undefined): Promise<unknown> => MockCollection.instance.findAndModify(filter, options),
            findOne: (filter?: Filter<unknown> | undefined, options?: FindOptions | undefined): Promise<unknown> => MockCollection.instance.findOne(filter, options),
            insertMany: (docs: InsertDocument<T>[], options?: InsertOptions | undefined): Promise<{
                insertedIds: unknown[];
                insertedCount: number;
            }> => MockCollection.instance.insertMany(docs, options),
            insertOne: (doc: InsertDocument<T>, options?: InsertOptions | undefined): Promise<unknown> => MockCollection.instance.insertOne(doc, options),
            listIndexes: (): ListIndexesCursor<{
                v: number;
                key: Document;
                name: string;
                ns?: string | undefined;
            }> => MockCollection.instance.listIndexes(),
            replaceOne: (filter: Filter<unknown>, replacement: InsertDocument<T>, options?: UpdateOptions | undefined): Promise<{
                upsertedId: Bson.ObjectId;
                upsertedCount: number;
                matchedCount: number;
                modifiedCount: number;
            }> => MockCollection.instance.replaceOne(filter, replacement, options),
            updateMany: (filter: Filter<unknown>, doc: UpdateFilter<unknown>, options?: UpdateOptions | undefined): Promise<{
                upsertedIds: Bson.ObjectId[] | undefined;
                upsertedCount: number;
                modifiedCount: number;
                matchedCount: number;
            }> => MockCollection.instance.updateMany(filter, doc, options),
            updateOne: (filter: Filter<unknown>, update: UpdateFilter<unknown>, options?: UpdateOptions | undefined): Promise<{
                upsertedId: Bson.ObjectId;
                upsertedCount: number;
                matchedCount: number;
                modifiedCount: number;
            }> => MockCollection.instance.updateOne(filter, update, options)
        })
    }

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
