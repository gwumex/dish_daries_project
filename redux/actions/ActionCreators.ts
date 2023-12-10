import { baseUrl } from '../../shared/baseUrl';
import { addPromos, promosLoading, promosFailed } from '../reducers/promotions-slice';
import {addLeaders, leadersLoading, leadersFailed} from '../reducers/leaders-slice'
import {addFavourites, favouritesLoading, favouritesFailed} from '../reducers/favourites-slice'
import {addDishes, dishesLoading, dishesFailed} from '../reducers/dishes-slice'
import {addComments, addComment, commentsFailed} from '../reducers/comments-slice'
import {  loginRequest,
    loginSuccess,
    loginFailure,
    logoutRequest,
    logoutSuccess,
    setUser} from '../reducers/auth-slice'
import { setLoginModal, setSignUpModal } from '../reducers/other-slice';
import { handleError } from '@/app/hooks';
import { AppDispatch } from '../store';
import { Creds, Comment } from '@/app/type';

/***
 * @function loginWithToken
 * @param {token} token - auth token from local storage
 * @returns {Promise<any>} - A promise that resolves with the response JSON if successful.
 */
export const loginWithToken = (token: any) => async (dispatch: any)=> {

     try {
        const response = await fetch(baseUrl + 'users/checkJWTtoken',
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });
        if (!response.ok) {
            throw new Error('Token validation failed');
        }
        const data = await response.json();
        dispatch(loginSuccess(token));
        dispatch(setUser(data.user));

        // Handle the response data
        console.log(data);
    } catch (error) {
        console.error('Error:', error);
    }
}


/***
 * @function loginUser
 * @param {Creds} creds - username and password
 * @returns {Promise<any>} - A promise that resolves with the response JSON if successful.
 */
export const loginUser = (creds: Creds) => async (dispatch: AppDispatch) => {
    dispatch(loginRequest(creds));

    return fetch(baseUrl + 'users/login', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {

            return handleError(response)

        }
    })
    .then(response => {
        if (response.success) {
            localStorage.setItem('token', response.token);
            dispatch(setUser({"username": creds.username}));
            dispatch(fetchFavourites());
            dispatch(loginSuccess(response));
            dispatch(setLoginModal());
        } else {
            // If the API response includes an unsuccessful login status
            throw new Error(response.status);
        }
    })
    .catch(error => {
        // Dispatching login failure with the error message
        dispatch(loginFailure(error.message));
    });
};


/***
 * @function signUpUser
 * @param {Creds} creds - userdetails
 * @returns {Promise<any>} - A promise that resolves with the response JSON if successful.
 */

export const signUpUser = (creds: Creds) => (dispatch: AppDispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
        dispatch(loginRequest(creds))

    return fetch(baseUrl + 'users/signup', {
        method: 'POST',
        headers: { 
            'Content-Type':'application/json' 
        },
        body: JSON.stringify(creds)
    })
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            return handleError(response)
        }
        },
        error => {
            throw error;
        })
    .then(response => response.json())
    .then(response => {
        if (response.success) {
            // If login was successful, set the token in local storage
            localStorage.setItem('token', response.token);
            dispatch(setUser({"username": creds.username}));
            // Dispatch the success action
            dispatch(loginSuccess(response));
            dispatch(setSignUpModal());
            dispatch(fetchFavourites());
        }
        else {
            var error:any = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(loginFailure(error.message)))
};

export const logoutUser = () => (dispatch: any) => {
    dispatch(logoutRequest())
    localStorage.removeItem('token');
    dispatch(favouritesFailed("Error 401: Unauthorized"));
    dispatch(logoutSuccess())
}


/**
 * @function postComment comment on dish 
 * @returns comment
 */
export const postComment = (dishId: any, rating: any, comment: any) => (dispatch: AppDispatch) => {

    const newComment = {
        dish: dishId,
        rating: rating,
        comment: comment
    }
    console.log('Comment ', newComment);

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'comments', {
        method: 'POST',
        body: JSON.stringify(newComment),
        headers: {
            'Content-Type': 'application/json',
            'Authorization': bearer
        },
        credentials: 'same-origin'
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            return handleError(response)
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(response => dispatch(addComment(response)))
    .catch(error => { console.log('Post comments ', error.message);
        alert('Your comment could not be posted\nError: '+ error.message); })
}

/**
 * 
 * @returns dishes list
 */

export const fetchDishes = () => (dispatch : AppDispatch) => {
    dispatch(dishesLoading(true));

    return fetch(baseUrl + 'dishes')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error: any = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(dishes => dispatch(addDishes(dishes)))
        .catch(error => dispatch(dishesFailed(error.message)));
}
/**
 * 
 * @returns comments on dish
 */

export const fetchComments = () => (dispatch: AppDispatch) => {
    return fetch(baseUrl + 'comments')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error: any = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(comments => dispatch(addComments(comments)))
        .catch(error => dispatch(commentsFailed(error.message)));
}

/**
 * 
 * @returns promotion list
 */
export const fetchPromos = () => (dispatch: AppDispatch) => {
    dispatch(promosLoading(true));

    return fetch(baseUrl + 'promotions')
        .then(response => {
            if (response.ok) {
                return response;
            }
            else {
                var error: any = new Error('Error ' + response.status + ': ' + response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(promos => dispatch(addPromos(promos)))
        .catch(error => dispatch(promosFailed(error.message)));
}

/**
 * 
 * @returns leaders list
 */
export const fetchLeaders = () => (dispatch: AppDispatch) => {
    
    dispatch(leadersLoading(true));

    return fetch(baseUrl + 'leaders')
    .then(response => {
        if (response.ok) {
            return response;
        } else {
            var error: any = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
        },
        error => {
            var errmess = new Error(error.message);
            throw errmess;
        })
    .then(response => response.json())
    .then(leaders => dispatch(addLeaders(leaders)))
    .catch(error => dispatch(leadersFailed(error.message)));
}

/**
 * 
 * @returns post feedback
 */
export const postFeedback = (feedback: any) => (dispatch: AppDispatch) => {
        
    return fetch(baseUrl + 'feedback', {
        method: "POST",
        body: JSON.stringify(feedback),
        headers: {
          "Content-Type": "application/json"
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error: any = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(response => { console.log('Feedback', response); alert('Thank you for your feedback!\n'+JSON.stringify(response)); })
    .catch(error =>  { console.log('Feedback', error.message); alert('Your feedback could not be posted\nError: '+error.message); });
};



/**
 * 
 * @returns add dish to favourite list
 */

export const postFavourite = (dishId: string) => (dispatch: AppDispatch) => {
    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'favourites/' + dishId, {
        method: "POST",
        body: JSON.stringify({"_id": dishId}),
        headers: {
          "Content-Type": "application/json",
          'Authorization': bearer
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error: any = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(favourites => { console.log('Favourite Added', favourites); dispatch(addFavourites(favourites)); })
    .catch(error => dispatch(favouritesFailed(error.message)));
}

/**
 * 
 * @returns deletes favourites dishes from list
 */

export const deleteFavourite = (dishId: string) => (dispatch: AppDispatch) => {

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'favourites/' + dishId, {
        method: "DELETE",
        headers: {
          'Authorization': bearer
        },
        credentials: "same-origin"
    })
    .then(response => {
        if (response.ok) {
          return response;
        } else {
          var error: any = new Error('Error ' + response.status + ': ' + response.statusText);
          error.response = response;
          throw error;
        }
      },
      error => {
            throw error;
      })
    .then(response => response.json())
    .then(favourites => { console.log('Favourite Deleted', favourites); dispatch(addFavourites(favourites)); })
    .catch(error => dispatch(favouritesFailed(error.message)));
};
/**
 * 
 * @returns favourites dishes
 */

export const fetchFavourites = () => (dispatch: AppDispatch) => {
    dispatch(favouritesLoading(true));

    const bearer = 'Bearer ' + localStorage.getItem('token');

    return fetch(baseUrl + 'favourites', {
        headers: {
            'Authorization': bearer
        },
    })
    .then(response => {
        if (response.ok) {
            return response;
        }
        else {
            var error: any = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(favourites => {
        dispatch(addFavourites(favourites))})
    .catch(error => dispatch(favouritesFailed(error.message)));
}

