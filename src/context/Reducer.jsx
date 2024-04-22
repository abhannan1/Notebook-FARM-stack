

export const handlers = {
    INITIALIZE: (state, action)=>{
        const {isAuthenticated, user} = action.payload;
        return {
            ...state,
            isAuthenticated:isAuthenticated,
            isInitializad:true,
            user:user,
        }
    },

    LOGIN: (state,action)=>{
        const {user} = action.payload
        return{
            ...state,
            isAuthenticated:true,
            user
        }

    },
  
    LOGOUT : (state, action)=>{
        return {
            ...state,
            isAuthenticated:false,
            user:null
        }
    },

    fORWARD : (state, action)=>{
        return {
            ...state,
            isAuthenticated:true,
            user:action.payload.user
        }
    }

}

export const reducer = (state, action)=> handlers[action.type] ? handlers[action.type](state,action) : state;
