       /**
    * 
    * @usage Define type for Leader object
    */
export interface Leader {
    _id: string;
    name: string;
    designation: string;
    abbr: string;
    description: string;
    image: string;
    featured: boolean
  }
export interface User {
    _id: string;
    firstName: string;
    lastName: string;
    admin: boolean;
    username: string;
  }
  
       /**
    * 
    * @usage Define type for Dish object
    */
  export interface Dish {
    author: any;
    _id: string;
    name: string;
    image: string;
    category: string;
    label: string;
    price: string;
    featured: boolean;
    description: string;
    likes: number;
    no_of_comments: number
  }

  export interface PostDish {
    name: string;
    image: string;
    category: string;
    label: string;
    price: string;
    description: string;
  }

     /**
    * 
    * @usage Define type for Promos object
    */
  export interface Promos {
    _id: string;
    name: string;
    image: string;
    label: string;
    price: number;
    featured: boolean;
    description: string;
  }
     /**
    * 
    * @usage Define type for Comment object
    */
  export interface Comment {
     dish: string | string[];
     _id: string;
     comment: string;
     rating: number;
     author: {
       firstName: string;
       lastName: string;
     };
     updatedAt: string;
   }

   /**
    * 
    * @usage Define the props type for the RenderLeader component
    */
 export interface RenderLeaderProps {
    leader: Leader;
  }

   /**
    * 
    * @usage Define the props type for the Menu component
    */
   export interface MenuProps {
     dishes: {
       isLoading: boolean;
       errMess: string | null;
       dishes: Dish[];
      };
    }
    
    /**
     * 
     * @usage Define the props type for the RenderMenuItem component
     */
  export interface RenderMenuItemProps {
    dish: Dish;
    deleteFavourite: (id: string) => void;
    dispatch: any
  }

export interface FavouritesProps {
    favourites: {
      isLoading: boolean;
      errMess: string | null;
      favourites: { dishes: Dish[] };
    };
    deleteFavourite: (id: string) => void;
  }

 export interface FavouritesState {
    isLoading: boolean;
    errMess: string | null;
    favourites: {dishes: Dish[]}
  }

  
 export interface RenderCommentsProps {
    comments: Comment[];
    postComment: (dishId: string, rating: number, comment: string) => void;
    dishId: string;
  }

  export interface CommentFormProps {
    dishId: string;
    postComment: (dishId: string, rating: number, comment: string) => void;
  }
  
  export interface RenderDishProps {
    dish: Dish;
    favourite: boolean;
    no_of_comments: number;
    postFavourite: (dishId: string) => void;
    dispatch: any
  }

export interface DishDetailProps {
    dish: Dish;
    isLoading: boolean;
    errMess: string | null;
    favourite: boolean;
    postFavourite: (dishId: string) => void;
    comments: Comment[];
    postComment: (dishId: string, rating: number, comment: string) => void;
}

export interface AuthProps {
    isAuthenticated: boolean;
    user: { username: string };
    loginUser: (creds: { username: string; password: string }) => void;
    logoutUser: () => void;
    isLoading: boolean;
    auth: boolean
  }
  

 export interface Item {
    image: string;
    name: string;
    designation?: string;
    description: string;
  }
  
 export interface RenderCardProps {
    item: Item;
    isLoading: boolean;
    errMess: string | null;
  }

export interface HomeProps {
    dish: Item;
    dishesLoading: boolean;
    dishesErrMess: string | null;
    promotion: Item;
    promosLoading: boolean;
    promosErrMess: string | null;
    leader: Item;
    leaderLoading: boolean;
    leaderErrMess: string | null;
  }

  export interface Creds {
    username: string;
    password: string;
    firstName: string;
    lastName: string
}

export interface AuthState {
    isLoading: boolean;
    isAuthenticated: boolean;
    token: string | null;
    user: any | null;
    errMess: string | null;
  }

  export interface OtherState {
    isLoginModalModalOpen: boolean;
    isSignUpModalOpen: boolean;
    toastIsOpen:boolean;
    toastMessage: string;
    fetchedPages: number[];
    currentPage: number,
    shouldScroll: boolean
}
  export interface PromotionState {
    isLoading: boolean;
    errMess: string | null;
    promotions: Promos[]
}
  export interface DishesState {
    isLoading: boolean;
    errMess: string | null,
    dishesDetails: {
      dishes: Dish[];
      total: number;
      pages: number
    } 
}
  export interface CommentsState {
    isLoading: boolean;
    errMess: string | null,
    comments: Comment[] 
}
  export interface LeadersState {
    isLoading: boolean;
    errMess: string | null,
    leaders: Leader[] 
}

export interface AboutProps {
  leaders: {
    isLoading: boolean;
    errMess: string | null;
    leaders: Leader[];
  };
}

// Define the props for the LeaderList component
export interface LeaderListProps {
  leaders: Leader[];
  isLoading: boolean;
  errMess: string | null;
}