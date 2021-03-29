import {Guid} from "guid-typescript";

export class Reservation{

    ClientId: string;
    carid: string;
    rentalstartdate: Date;
    rentalenddate: Date;
    pickuplocation: string;
    dropofflocation: string;
    totalprice: number;

}