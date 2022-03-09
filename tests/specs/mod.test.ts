import Collection from "./../mocks/testmock.ts"
import { MockCollection } from "../../mod.ts"
import { Filter, CountOptions } from "../../test_deps.ts"
import { assertSpyCall, Spy, assertSpyCallAsync } from "../../test_deps.ts"

Deno.test("demo", () => {
MockCollection.initMock({
    countDocuments: (filter?: Filter<unknown> | undefined, options?: CountOptions | undefined): Promise<number> => {
        return new Promise((resolve, _reject) => {
            console.log("mock1 executing")
            resolve(1)
        })
    },
    name: "count of this mock is 1"
})

Collection.countDocuments()
assertSpyCallAsync(MockCollection.getInstance().countDocuments as Spy<any>, 0, { returned: 1 })
MockCollection.initMock({
    countDocuments: (filter?: Filter<unknown> | undefined, options?: CountOptions | undefined): Promise<number> => {
        return new Promise((resolve, _reject) => {
            console.log("mock2 executing")
            resolve(2)
        })
    },
    name: "count of this mock is 2"
})
Collection.countDocuments()
assertSpyCallAsync(MockCollection.getInstance().countDocuments as Spy<any>, 0, { returned: 2 })



})