export const CINEMA_CREATED = 'cinemas/CINEMA_CREATED';
export const RECEIVE_CINEMAS_DATA ='cinemas/RECEIVE_CINEMAS_DATA';

export const cinemaCreated = (created) => {
    return {
        type: CINEMA_CREATED,
        created: created
    }
};

export const receiveCinemasData = (cinemasData) => {
    return {
        type: RECEIVE_CINEMAS_DATA,
        cinemasData: cinemasData
    }
};

