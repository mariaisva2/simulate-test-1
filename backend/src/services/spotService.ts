import { injectable } from "tsyringe";
import { ISpot } from "../interfaces/spotInterface";
import Util from "../utils/util";
import { IError } from "../interfaces/errorInterface";

@injectable()
export default class SpotService{
    async getSpots():Promise<ISpot | ISpot[] | IError>{
        const data = await Util.fetchApi("https://jsonplaceholder.typicode.com/posts");
        return data;
    }
}
