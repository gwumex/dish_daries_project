import { useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { CommentFormProps, RenderCommentsProps } from "../type";
import { AppDispatch, RootState } from "@/redux/store";

export const RenderComments: React.FC<RenderCommentsProps> = ({ comments, postComment, dishId }) => (
<div className="bg-white shadow-lg rounded-lg overflow-hidden">
  <div className="p-4">
    <h4 className="text-2xl font-bold mb-2">Comments</h4>
    <ul className="space-y-2">
      {comments.map((comment) => (
        <li key={comment._id} className="p-2 hover:bg-gray-50 rounded">
          <p className="text-gray-700">{comment.comment}</p>
          <p className="text-gray-500">{comment.rating} stars</p>
          <p className="text-sm text-gray-400">
            -- {comment.author.firstName} {comment.author.lastName},
            {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit' }).format(new Date(Date.parse(comment.updatedAt)))}
          </p>
        </li>
      ))}
    </ul>
  </div>
</div>

);


  export const CommentFormModal: React.FC<CommentFormProps>= ({ dishId, postComment }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const ratingRef = useRef<HTMLSelectElement>(null);
    const commentRef = useRef<HTMLInputElement>(null);
    const dispatch: AppDispatch = useDispatch();
  
    const toggleModal = () => {
      setIsModalOpen(!isModalOpen);
    };
  
    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      if (ratingRef.current && commentRef.current) {
          dispatch(postComment(
            dishId,
            parseInt(ratingRef.current.value),
            commentRef.current.value
          ));
          toggleModal();
      }
    };
  
    return (
      <div>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={toggleModal}
        >
          <span className="fa fa-pencil fa-lg"></span> Submit Comment
        </button>
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
            <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className='flex flex-col'>
                  <label htmlFor="rating" className="text-md font-semibold text-gray-600">Rating</label>
                  <select id="rating" name="rating" ref={ratingRef} 
                    className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-orange-300">
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                  </select>
                </div>
                <div className='flex flex-col'>
                  <label htmlFor="comment" className="text-md font-semibold text-gray-600">Comment</label>
                  <input type="text" id="comment" name="comment" ref={commentRef}
                    className="mt-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-orange-300"/>
                </div>
                <button type="submit" className="w-full mt-4 bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition-colors duration-200">Submit Comment</button>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  };
  