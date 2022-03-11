import { MongoClient} from "https://deno.land/x/mongo@v0.29.2/mod.ts"

interface IExample {
    id: string
}

export default new MongoClient().database().collection("ExampleCollection")