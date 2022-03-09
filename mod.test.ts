import Collection from "./testmock.ts"
import { MockCollection } from "./mod.ts"
import { Filter, CountOptions } from "./deps.ts"
import { assertSpyCall, Spy, assertSpyCallAsync } from "https://deno.land/x/mock@0.13.0/mod.ts"

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