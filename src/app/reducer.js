import { REHYDRATE } from 'redux-persist'

const initialState = {
    user:{
        Id: void 0,
        NickName: void 0,
        Status: void 0,
    }
}

const UserReducer = (state = initialState, action) => {
    switch (action.type) {
        case REHYDRATE:
            return {
                ...state
            }
        default:
            console.log('DEFAULT', action.type)
    }
}

export default UserReducer