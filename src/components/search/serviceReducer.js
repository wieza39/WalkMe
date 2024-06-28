export const initialState = {
    location: "",
    startDate: new Date(),
    endDate: new Date(),
    serviceSelected: [],
    petAmount: []
};

export function serviceReducer(state, action) {
    switch (action.type) {
        case 'SET_LOCATION':
            return { ...state, location: action.payload };
        case 'SET_START_DATE':
            return { ...state, startDate: action.payload };
        case 'SET_END_DATE':
            return { ...state, endDate: action.payload };
        case 'TOGGLE_SERVICE':
            const serviceSelected = state.serviceSelected.includes(action.payload)
                ? state.serviceSelected.filter(service => service !== action.payload)
                : [...state.serviceSelected, action.payload];
            return { ...state, serviceSelected };
        case 'SET_PET_AMOUNT':
            const updatedPetAmount = state.petAmount.filter(pet => pet.type !== action.payload.type);
            updatedPetAmount.push(action.payload);
            return { ...state, petAmount: updatedPetAmount };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
}
