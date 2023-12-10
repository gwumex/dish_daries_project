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

/**
 * 
 * @returns login user
 */
export const loginWithToken = (token: any) => (dispatch: any)=> {

     return fetch(baseUrl + 'users/checkJWTtoken', 
     {
        method: 'GET',
        headers: { 
            'Content-Type':'application/json',
            'Authorization': `Bearer ${token}`,

        },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Token validation failed');
      }
      return response.json();
    })
    .then(data => {
      dispatch(loginSuccess(token));
      dispatch(setUser(data.user));

      // Handle the response data
      console.log(data);
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

export const loginUser = (creds: any) => (dispatch: any) => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(loginRequest(creds))

    return fetch(baseUrl + 'users/login', {
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
            var error:any = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
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
            dispatch(fetchFavourites());
            dispatch(loginSuccess(response));
        }
        else {
            var error:any = new Error('Error ' + response.status);
            error.response = response;
            throw error;
        }
    })
    .catch(error => dispatch(loginFailure(error.message)))
};
export const signUpUser = (creds: any) => (dispatch: any) => {
    // We dispatch requestLogin to kickoff the call to the API
        dispatch(loginRequest(creds))
        console.log("hello");

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
            var error:any = new Error('Error ' + response.status + ': ' + response.statusText);
            error.response = response;
            throw error;
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
            dispatch(fetchFavourites());
            dispatch(loginSuccess(response));
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
 * @function post comment on dish 
 * @returns comment
 */
export const postComment = (dishId: any, rating: any, comment: any) => (dispatch: (arg0: { type: string; payload: any; }) => any) => {

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
    .then(response => dispatch(addComment(response)))
    .catch(error => { console.log('Post comments ', error.message);
        alert('Your comment could not be posted\nError: '+ error.message); })
}

/**
 * 
 * @returns dishes list
 */

export const fetchDishes = () => (dispatch : any) => {
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

export const fetchComments = () => (dispatch: (arg0: { type: string; payload: any; }) => any) => {
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
export const fetchPromos = () => (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
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
export const fetchLeaders = () => (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
    
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
export const postFeedback = (feedback: any) => (dispatch: any) => {
        
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

export const postFavourite = (dishId: string) => (dispatch: (arg0: { type: string; payload: any; }) => void) => {
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

export const deleteFavourite = (dishId: string) => (dispatch: (arg0: { type: string; payload: any; }) => void) => {

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

export const fetchFavourites = () => (dispatch: (arg0: { type: string; payload?: any; }) => void) => {
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

