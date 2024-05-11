import { Alert, Button, Modal, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import Comment from "./Comment";

export default function CommentSection({ postId }) {
  const { currentUser } = useSelector((state) => state.user);
  const [comment, setComment] = useState(""); //noi dung tu client de fetch du lieu di
  const [commentError, setCommentError] = useState(null);
  const [comments, setComments] = useState([]); // luu du lieu tu api gui ve
  const [showModal, setShowModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  const navigate = useNavigate();
  // console.log(comments);
  // console.log(comment);
  //   console.log(postId);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comment.length > 200) return;
    try {
      const res = await fetch(`/api/comment/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: comment,
          postId,
          userId: currentUser._id,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setComment("");
        setCommentError(null);
        setComments([data, ...comments]);
      }
    } catch (error) {
      setCommentError(error.message);
    }
  };
  useEffect(() => {
    const getComments = async () => {
      try {
        const res = await fetch(`/api/comment/getPostComments/${postId}`);
        const data = await res.json();
        if (res.ok) {
          setComments(data);
        } else {
          console.log(data.message);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    getComments();
  }, [postId]);
  const handleLike = async (commentId) => {
    try {
      if (!currentUser) {
        navigate("/sign-in");
        return;
      }
      const res = await fetch(`/api/comment/likeComment/${commentId}`, {
        method: "PUT",
      });
      if (res.ok) {
        const data = await res.json();
        setComments(
          comments.map((comment) =>
            comment._id === commentId
              ? {
                  ...comment,
                  likes: data.likes,
                  numberOfLikes: data.numberOfLikes, //data.likes.length :  dem so id nguoi like cung duoc
                }
              : comment
          )
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleEdit = async (comment, editedContent) => {
    setComments(
      comments.map((c) => {
        c._id === comment._id ? { ...c, content: editedContent } : c;
      })
    );
  };
  const handleDelete = async (commentToDelete) => {
    setShowModal(false)
    try {
      if (!currentUser) {
        return navigate("/sing-in");
      }
      const res = await fetch(`/api/comment/deleteComment/${commentToDelete}`, {
        method: "DELETE",
      });
      if (res.ok) {
        const data = await res.json();

        setComments(
          comments.filter((comment) => comment._id !== commentToDelete)
        );
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="max-w-5xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-2 text-gray-500 text-sm py-2">
          <p>Signed in as:</p>
          <img
            className="w-5 h-5 object-cover rounded-full"
            src={currentUser.profilePicture}
            alt="avata"
          />
          <Link
            to={"/dashboard?tab=profile"}
            className="text-xs text-cyan-500 hover:underline"
          >
            @{currentUser.username}
          </Link>
        </div>
      ) : (
        <div className="flex gap-1 text-sm text-teal-500 my-5">
          Bạn phải đăng nhập mới có thể comment
          <Link className="text-blue-500 hover:underline" to={"/sign-in"}>
            Sign In
          </Link>
        </div>
      )}
      {currentUser && (
        <form
          onSubmit={handleSubmit}
          className="border border-teal-500 rounded-md p-3"
        >
          <Textarea
            placeholder="add comment ..."
            rows={"3"}
            maxLength={"200"}
            onChange={(e) => setComment(e.target.value)}
            value={comment}
          />
          <div className="flex justify-between items-center mt-5">
            <p className="text-gray-500 text-xs">
              Còn lại {200 - comment.length} ký tự
            </p>
            <Button outline gradientDuoTone={"purpleToBlue"} type="submit">
              Submit
            </Button>
          </div>
          {commentError && (
            <Alert color={"failure"} className="mt-5">
              {commentError}
            </Alert>
          )}
        </form>
      )}
      {comments.length === 0 ? (
        <p className="text-sm my-5">Chưa có comments nào</p>
      ) : (
        <>
          <div className="flex items-center gap-2 text-sm my-5">
            <p>Comments</p>
            <div className="border border-gay-500 py-1 px-2 rounded-sm">
              <p>{comments.length}</p>
            </div>
          </div>
          {comments.map((comment) => (
            <Comment
              key={comment._id}
              comment={comment}
              onLike={handleLike}
              onEdit={handleEdit}
              onDelete={(commentId) => {
                setShowModal(true);
                setCommentToDelete(commentId);
              }}
            />
          ))}
        </>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size={"md"}
      >
        <Modal.Header>Delete Comment </Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-300">
              Bạn có muốn xoá comment này không?
            </h3>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex gap-3 mx-auto">
            <Button
              color={"failure"}
              onClick={() => handleDelete(commentToDelete)}
            >
              Xoá comment
            </Button>
            <Button color={"gray"} onClick={() => setShowModal(false)}>
              Không Đồng Ý
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
