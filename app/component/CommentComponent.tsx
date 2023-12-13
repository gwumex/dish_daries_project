import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CommentFormProps, RenderCommentsProps } from "../type";
import { AppDispatch, RootState } from "@/redux/store";
import { Loading } from "./LoadingComponent";
 import { clearCommentFormError } from "@/redux/reducers/comments-slice";

export const RenderComments: React.FC<RenderCommentsProps> = ({ comments, postComment, dishId }) => (
  <div >
    <ul className="space-y-4 overflow-y-auto h-60 md:h-96 p-4 border-gray-200 border-2">{comments.map((comment) => (
      <li key={comment._id} >
        <div className="chat chat-start">
          <div className="chat-image avatar placeholder">
            <div className="bg-neutral text-neutral-content rounded-full w-12 ">
              <span>{comment.author.firstName.slice(0, 2)}</span>
            </div>
          </div>
          <div className="chat-header">
            <span className="mr-2 text-primary">
              --{comment.author.firstName}
            </span>
            <time className="text-xs opacity-70">{new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.updatedAt)))}</time>
          </div>
          <div className="chat-bubble">{comment.comment}</div>
          <div className="chat-footer opacity-80 text-secondary"><u>edit</u></div>
        </div>
        <hr className="my-2 border-gray-200 opacity-50" />
      </li>

    ))}
    </ul>
  </div>

);


export const CommentFormModal: React.FC<CommentFormProps> = ({ dishId, postComment }) => {
  const commentError = useSelector((state: RootState) => state.comments.errMess);
  const isLoading = useSelector((state: RootState) => state.comments.isLoading);
  const ratingRef = useRef<HTMLInputElement>(null);
  const commentRef = useRef<HTMLTextAreaElement>(null);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
  setTimeout(()=> {
    dispatch(clearCommentFormError())

  }, 5000)
   }, [commentError])
   
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const radios = ratingRef.current.querySelectorAll('input[type="radio"]');
    const selectedRating = Array.from(radios).find(radio => radio.checked)?.value;

    if (selectedRating && commentRef.current) {
      dispatch(postComment(
        dishId,
        parseInt(selectedRating),
        commentRef.current.value
      ));
      commentRef.current.value = ''
    }
  };

  return (
    <div>
      {/* The button to open modal */}
      <label htmlFor="my_modal_7" className="btn mt-6">Leave a comment</label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my_modal_7" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box">
          <form onSubmit={handleSubmit}>
            {/* Rating */}
            <label className="form-control">
              <div className="label">
                <span className="label-text">Rating</span>
              </div>
              <div className="rating gap-1" ref={ratingRef} >
                <input type="radio" name="rating-3" value="1" className="mask mask-heart bg-red-400" required />
                <input type="radio" name="rating-3" value="2" className="mask mask-heart bg-orange-400" />
                <input type="radio" name="rating-3" value="3" className="mask mask-heart bg-yellow-400" />
                <input type="radio" name="rating-3" value="4" className="mask mask-heart bg-lime-400" />
                <input type="radio" name="rating-3" value="5" className="mask mask-heart bg-green-400" />
              </div>
            </label>
            {/* comment */}
            <label className="form-control">
              <div className="label">
                <span className="label-text">Comment</span>
              </div>
              <textarea required ref={commentRef} className="textarea textarea-bordered h-24" placeholder="write your comment"></textarea>
            </label>
            <div>
              {commentError && (
                <span className="text-red-500 p-2 text-center">
                  {commentError} {/* Display login error */}
                </span>
              )}
            </div>
            <button className="btn mt-4" type="submit">{isLoading?<Loading/>: "Submit"}</button>
          </form>
        </div>
        <label className="modal-backdrop" htmlFor="my_modal_7">Close</label>
      </div>
    </div>
  );
};
