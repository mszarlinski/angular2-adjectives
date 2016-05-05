import {Scale} from './scale';

export class Score {

    public scaleIds:string[] = [];
    public scaleNames:Object = {};
    public scalePoints:Object = {};

    constructor(private scales:Array<Scale>) {
        scales.forEach(scale => {
            this.scalePoints[scale.id] = 0;
            this.scaleNames[scale.id] = scale.name;
            this.scaleIds.push(scale.id);
        });
    }

    change(scaleId:string, delta:number) {
        this.scalePoints[scaleId] += delta;
    }
}
