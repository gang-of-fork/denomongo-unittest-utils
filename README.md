# denomongo-unittest-utils
[![CI](https://github.com/lumaghg/denomongo-unittest-utils/actions/workflows/testing.yml/badge.svg)](https://github.com/lumaghg/denomongo-unittest-utils/actions/workflows/testing.yml) 
[![tag](https://shields.io/github/tag/lumaghg/denomongo-unittest-utils.svg)](https://github.com/lumaghg/denomongo-unittest-utils/releases)  
Simple [Deno](https://deno.land) Module to provide Spy Mocks for creating Unittests with [mongo](https://deno.land/x/mongo)

## Purpose
The purpose of this module is to help with creating Unit-Tests for applications that use the [mongo driver for deno](https://deno.land/x/mongo). The module provides Spy Mocks for Colletions, meaning that their behaviour can be adjusted and function calls can be asserted with the [mock](https://deno.land/x/mock) package.

## Prerequisites
To use this module efficiently, you should outsource each mongo collection into a seperate file and export the collection as default. By doing this, you can easily redirect the imports of this collection easily via an [import map](https://deno.land/manual/linking_to_external_code/import_maps) as shown in the usage example below.

## Installation
This is a [Deno](https://deno.land) Module available at the [deno registry](https://deno.land/x/denomongo_unittest_utils). 
Before looking at the usage example it, [download and install Deno](https://deno.land/#installation).  
Run the unittests with `deno test`.  
Analyze the code coverage with `deno test --coverage=./cov` and `deno coverage ./cov`

## Usage Example
The following usage example can be viewed in /examples/simple_example and refer to the README for instructions to run the code yourself.
Please note that you have to call `mockCollection.initMock()` also if you don't want to specify special behaviours.
To reset the mockCollection / change the behaviour, e.g. for a different test case, simply call `mockCollection.initMock()` again.

### exampletest.ts
```ts
//prodCollection will be replaced by the mockCollection via import map
import prodCollection from "./prodCollection.ts";
import { MockCollection } from "https://deno.land/x/denomongo_unittest_utils@VERSION/mod.ts"
import { Filter, FindOptions } from "https://deno.land/x/mongo@v0.29.2/mod.ts"
import {assertSpyCallAsync, Spy} from "https://deno.land/x/mock@0.13.0/mod.ts"

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
```
### import_map.json
```ts
{
    "imports":{
        "./prodCollection.ts" : "https://deno.land/x/denomongo_unittest_utils@VERSION/mod.ts"
    }
}
```

### prodCollection.ts
```ts
import { MongoClient} from "https://deno.land/x/mongo@v0.29.2/mod.ts"

interface IExample {
    id: string
}
//MongoClient is not connected in this case, because it is not the focus of this example
export default new MongoClient().database().collection("ExampleCollection")
```
## Further explanations
The module exports a class that has a static attribute `instance`. Upon initializing the mockCollection by calling `ìnitMock()`, the instance attribute will be filled.
The module exports an instance of this class as default, which proxies every call to the according function on the mock. This allows the prodCollection to be replaced by the mock via the import map at startup while being able to set the mocks behaviour at runtime.
