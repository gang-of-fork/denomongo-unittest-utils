import Collection from "./../mocks/testmock.ts"
import { MockCollection } from "../../mod.ts"
import { Filter, CountOptions,  Spy, assertSpyCallAsync, assertSpyCall, assertEquals  } from "../test_deps.ts"

Deno.test("Test instantiation", () => {
    let mockProxy = MockCollection.getMockWithProxy();
    assertEquals(typeof mockProxy.aggregate, "function");
    assertEquals(typeof mockProxy.countDocuments, "function");
    assertEquals(typeof mockProxy.createIndexes, "function");
    assertEquals(typeof mockProxy.delete, "function");
    assertEquals(typeof mockProxy.deleteMany, "function");
    assertEquals(typeof mockProxy.deleteOne, "function");
    assertEquals(typeof mockProxy.distinct, "function");
    assertEquals(typeof mockProxy.drop, "function");
    assertEquals(typeof mockProxy.dropIndexes, "function");
    assertEquals(typeof mockProxy.estimatedDocumentCount, "function");
    assertEquals(typeof mockProxy.find, "function");
    assertEquals(typeof mockProxy.findAndModify, "function");
    assertEquals(typeof mockProxy.findOne, "function");
    assertEquals(typeof mockProxy.insertMany, "function");
    assertEquals(typeof mockProxy.insertOne, "function");
    assertEquals(typeof mockProxy.listIndexes, "function");
    assertEquals(typeof mockProxy.replaceOne, "function");
    assertEquals(typeof mockProxy.updateMany, "function");
    assertEquals(typeof mockProxy.updateOne, "function");
})

Deno.test("Test Proxy Calls", () => {
    MockCollection.initMock({});
    let mockProxy = MockCollection.getMockWithProxy();
     mockProxy.aggregate([])
     mockProxy.countDocuments()
     mockProxy.createIndexes({indexes: []})
     mockProxy.delete({})
     mockProxy.deleteMany({})
     mockProxy.deleteOne({})
     mockProxy.distinct("")
     mockProxy.drop()
     mockProxy.dropIndexes({index: ""})
     mockProxy.estimatedDocumentCount()
     mockProxy.find()
     mockProxy.findAndModify()
     mockProxy.findOne()
     mockProxy.insertMany([])
     mockProxy.insertOne({})
     mockProxy.listIndexes()
     mockProxy.replaceOne({},{})
     mockProxy.updateMany({},[])
     mockProxy.updateOne({},{})
     assertSpyCall(MockCollection.getInstance().aggregate as Spy<any>, 0, {})
     assertSpyCall(MockCollection.getInstance().countDocuments as Spy<any>, 0, {})
     assertSpyCall(MockCollection.getInstance().createIndexes as Spy<any>, 0, {})
     assertSpyCall(MockCollection.getInstance().delete as Spy<any>, 0, {})
     assertSpyCall(MockCollection.getInstance().deleteMany as Spy<any>, 0, {})
     assertSpyCall(MockCollection.getInstance().deleteOne as Spy<any>, 0, {})
     assertSpyCall(MockCollection.getInstance().distinct as Spy<any>, 0, {})
     assertSpyCall(MockCollection.getInstance().drop as Spy<any>, 0, {})
     assertSpyCall(MockCollection.getInstance().dropIndexes as Spy<any>, 0, {})
     assertSpyCall(MockCollection.getInstance().estimatedDocumentCount as Spy<any>, 0, {})
     assertSpyCall(MockCollection.getInstance().find as Spy<any>, 0, {})
     assertSpyCall(MockCollection.getInstance().findAndModify as Spy<any>, 0, {})
     assertSpyCall(MockCollection.getInstance().findOne as Spy<any>, 0, {})
     assertSpyCall(MockCollection.getInstance().insertMany as Spy<any>, 0, {})
     assertSpyCall(MockCollection.getInstance().insertOne as Spy<any>, 0, {})
     assertSpyCall(MockCollection.getInstance().listIndexes as Spy<any>, 0, {})
     assertSpyCall(MockCollection.getInstance().replaceOne as Spy<any>, 0, {})
     assertSpyCall(MockCollection.getInstance().updateMany as Spy<any>, 0, {})
     assertSpyCall(MockCollection.getInstance().updateOne as Spy<any>, 0, {})

})

Deno.test("test mock initialization", () => {
    MockCollection.initMock({
        countDocuments: (_filter?: Filter<unknown> | undefined, _options?: CountOptions | undefined): Promise<number> => {
            return new Promise((resolve, _reject) => {
                resolve(1)
            })
        }
    })

    Collection.countDocuments()
    assertSpyCallAsync(MockCollection.getInstance().countDocuments as Spy<any>, 0, { returned: 1 })
})

Deno.test("Test mock reset", () => {
    MockCollection.initMock({
        countDocuments: (_filter?: Filter<unknown> | undefined, _options?: CountOptions | undefined): Promise<number> => {
            return new Promise((resolve, _reject) => {
                resolve(1)
            })
        }
    })

    Collection.countDocuments()
    assertSpyCallAsync(MockCollection.getInstance().countDocuments as Spy<any>, 0, { returned: 1 })
    MockCollection.initMock({
        countDocuments: (_filter?: Filter<unknown> | undefined, _options?: CountOptions | undefined): Promise<number> => {
            return new Promise((resolve, _reject) => {
                resolve(2)
            })
        }
    })
    Collection.countDocuments()
    assertSpyCallAsync(MockCollection.getInstance().countDocuments as Spy<any>, 0, { returned: 2 })
})