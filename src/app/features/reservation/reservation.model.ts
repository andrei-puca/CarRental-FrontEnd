import {Guid} from "guid-typescript";

export class Reservation{

    ClientId: string;
    carid: string;
    rentalstartdate: number;
    rentalenddate: number;
    pickuplocation: string;
    dropofflocation: string;
    totalprice: number;

}