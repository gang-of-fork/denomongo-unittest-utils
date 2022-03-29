import { MongoClient} from "../example_deps.ts"

interface IExample {
    id: string
}

export default new MongoClient().database().collection<IExample>("ExampleCollection")