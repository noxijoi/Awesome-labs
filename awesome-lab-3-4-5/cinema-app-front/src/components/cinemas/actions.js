export const CINEMA_CREATED = 'cinemas/CINEMA_CREATED';

export const cinemaCreated = (created) =>{
    return{
        type: CINEMA_CREATED,
        created: created
    }
};

