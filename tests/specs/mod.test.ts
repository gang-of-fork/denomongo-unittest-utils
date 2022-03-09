import Collection from "./../mocks/testmock.ts"
import { MockCollection } from "../../mod.ts"
import { Filter, CountOptions } from "../../test_deps.ts"
import { Spy, assertSpyCallAsync } from "../../test_deps.ts"

Deno.test("demo", () => {
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