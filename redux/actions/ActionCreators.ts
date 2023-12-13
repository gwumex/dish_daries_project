import { baseUrl } from '../../shared/baseUrl';
import { addPromos, promosLoading, promosFailed } from '../reducers/promotions-slice';
import {addLeaders, leadersLoading, leadersFailed} from '../reducers/leaders-slice'
import {addFavourites, favouritesLoading, favouritesFailed} from '../reducers/favourites-slice'
import {addDishes, dishesLoading, dishesFailed, addDish, dishFailed, dishLoading} from '../reducers/dishes-slice'
import {addComments, addComment, commentsFailed, commentPostFailed, commentLoading} from '../reducers/comments-slice'
import {  loginRequest,
    loginSuccess,
    loginFailure,
    logoutRequest,
    logoutSuccess,
    setUser} from '../reducers/auth-slice'
import { setLoginModal, setSignUpModal, setToastMessage } from '../reducers/other-slice';
import { handleError } from '@/app/hooks';
import { AppDispatch } from '../store';
import { Creds, Comment, Dish, PostDish } from '@/app/type';

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
    } catch (error) {
        console.error('Error:', error);
    }
}


/***
 * @function loginUser
 * @param {Creds} creds - username and password
 * @returns {Promise<any>} - A promise that resolves with the response JSON if successful.
 */

export  const loginUser = (creds: any) => async (dispatch: AppDispatch) => {
    dispatch(loginRequest());
    try {
        const response = await fetch(baseUrl + 'users/login',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(creds)

        });
        if (!response.ok){
            return await handleError(response)
        }

        const data = await response.json()
        console.log(data);
        if (data.success) {
            localStorage.setItem('token', data.token);
            dispatch(setUser(data.user));
            dispatch(fetchFavourites());
            dispatch(loginSuccess(data.token));
            dispatch(setLoginModal());
            dispatch(setToastMessage(data.status))
        } else {
            throw new Error(data.status);
        }

    } catch (error) {
        dispatch(loginFailure(error.message));
    }
}


/***
 * @function signUpUser
 * @param {Creds} creds - userdetails
 * @returns {Promise<any>} - A promise that resolves with the response JSON if successful.
 */

export const signUpUser = (creds: Creds) => (dispatch: AppDispatch) => {
    // We dispatch requestLogin to kickoff the call to the API
        dispatch(loginRequest())

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
            // Dispatch the success action
            dispatch(loginSuccess(response));
            dispatch(setUser({"username": creds.username}));
            dispatch(setSignUpModal());
            dispatch(fetchFavourites());
            dispatch(setToastMessage(response.status))
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
    dispatch(setToastMessage("Logged Out"))

}


/**
 * @function postComment comment on dish 
 * @returns comment
 */
export const postComment = (dishId: string, rating: number, comment: string) => async (dispatch: AppDispatch) => {
    dispatch(commentLoading())
    const newComment = {
        dish: dishId,
        rating: rating,
        comment: comment
    };
    console.log('Comment ', newComment);

    const bearer = 'Bearer ' + localStorage.getItem('token');

    try {
        const response = await fetch(baseUrl + 'comments', {
            method: 'POST',
            body: JSON.stringify(newComment),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': bearer
            },
            credentials: 'same-origin'
        });

        if (!response.ok) {
            return await handleError(response);
        }

        const jsonResponse = await response.json();
        dispatch(addComment(jsonResponse));
        dispatch(setToastMessage("Comment Added"))

    } catch (error) {
        if(error.message === "Authentication failed"){
            dispatch(commentPostFailed("Please Login"))
            dispatch(setToastMessage("Please Login"))

        }
        console.error('Post comments ', error);
    }
};
export const postDish = ({dishName, dishImage, dishCategory, dishLabel, dishPrice, dishDescription}) => async (dispatch: AppDispatch) => {
    dispatch(dishLoading())
    const formData = new FormData();
    formData.append('name', dishName);
    formData.append('image', dishImage);
    formData.append('category', dishCategory);
    formData.append('label', dishLabel);
    formData.append('price', dishPrice);
    formData.append('description', dishDescription);

    const bearer = 'Bearer ' + localStorage.getItem('token');

    try {
        const response = await fetch(baseUrl + 'dishes', {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': bearer
            },
            credentials: 'same-origin'
        });

        if (!response.ok) {
            return await handleError(response);
        }

        const jsonResponse = await response.json();
        dispatch(addDish(jsonResponse))
        dispatch(setToastMessage("Dish Posted Successfully"))

    } catch (error) {
        console.log("hello");
        dispatch(dishFailed(error.message))
        if(error.message === "Authentication failed"){
            dispatch(setToastMessage("Please Login"))
        }
    }
};


/**
 * @function post dish
 */



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
    .then(favourites => { console.log('Favourite Added', favourites); dispatch(addFavourites(favourites))
    dispatch(setToastMessage("Added To Favourite"))

     })
    .catch(error => {
        console.log(error.message);
        if(error.message === "Error 401: Unauthorized"){
            dispatch(favouritesFailed("Please Login"))
            dispatch(setToastMessage("Please Login"))

        }
    }
    );
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
    .then(favourites => { 
        dispatch(setToastMessage("Favourite Deleted"))

        dispatch(addFavourites(favourites)); })
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

