//prodCollection will be replaced by the mockCollection via import map
import prodCollection from "./prodCollection.ts";
//replace ../../mod.ts with https://deno.land/x/denomongo_unittest_utils@VERSION/mod.ts
import { MockCollection } from "../../mod.ts"
import { Filter, FindOptions, assertSpyCallAsync, Spy } from "../example_deps.ts"

//example function to be tested
function exampleDatabaseCall() {
    prodCollection.findOne({ id: "example" }, {limit: 1})
}


Deno.test("simple example", () => {
    //define the MockCollections behaviour when calling the findOne function
    MockCollection.initMock({
        findOne: (_filter?: Filter<unknown> | undefined, _options?: FindOptions | undefined): Promise<unknown> => {
            return new Promise((resolve, _reject) => {
                resolve({ id:"example"})
            })
        }
    })

    //execute the function
    exampleDatabaseCall()

    //check whether the findOne Method was called correctly and returned the correct values
    assertSpyCallAsync(MockCollection.getInstance().findOne as Spy<any>, 0, {args: [{id: "example"}, {limit: 1}], returned: {id: "example"}})

})