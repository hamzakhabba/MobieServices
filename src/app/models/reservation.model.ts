export interface Reservation {
    reservationId: number,
    travelDate: Date;
    busId: number;
    clientId: number;
    [key: string]: any
}

