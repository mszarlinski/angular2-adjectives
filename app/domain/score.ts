import {Scale} from './scale';

export class Score {

    public scales:number[] = [];
    public scaleNames:Object = {};
    public scalePoints:Object = {};

    constructor(public scales:Array<Scale>) {
        scales.forEach(scale => {
            this.scalePoints[scale.id] = 0;
            this.scaleNames[scale.id] = scale.name;
            this.scales.push(scale.id);
        });
    }

    change(scaleId:string, delta:number) {
        this.scalePoints[scaleId] += delta;
    }
}
