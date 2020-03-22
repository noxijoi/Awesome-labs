export const SEANCE_CREATED = 'seances/SEANCE_CREATED';
export const RECEIVE_SEANCES_DATA ='seances/RECEIVE_SEANCES_DATA';
export const RECEIVE_SEANCE_DATA = 'seances/RECEIVE_SEANCE_DATA';

export const seanceCreated = (created) => {
    return {
        type: SEANCE_CREATED,
        created: created
    }
};

export const receiveSeancesData = (seancesData) => {
    return {
        type: RECEIVE_SEANCES_DATA,
        seancesData: seancesData
    }
};

export const receiveSeanceData = (seanceData) =>{
    return{
        type: RECEIVE_SEANCE_DATA,
        seance: seanceData
    }
};