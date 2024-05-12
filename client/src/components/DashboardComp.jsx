import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  HiAnnotation,
  HiArrowNarrowUp,
  HiDocumentText,
  HiOutlineUserGroup,
} from "react-icons/hi";
import { Button, Table, TableHead } from "flowbite-react";
import { Link } from "react-router-dom";

export default function DashboardComp() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [comments, setComments] = useState([]);
  const [posts, setPosts] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalComments, setTotalComments] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthComments, setLastMonthComments] = useState(0);
  console.log(users)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user/getusers?limit=5");
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers);
          setLastMonthUsers(data.lastMonthUsers);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchPosts = async () => {
      try {
        const res = await fetch("/api/post/getposts?limit=5");
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts);
          setTotalPosts(data.totalPosts);
          setLastMonthPosts(data.lastMonthPosts);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    const fetchComments = async () => {
      try {
        const res = await fetch("/api/comment/getcomments?limit=5");
        const data = await res.json();
        if (res.ok) {
          setComments(data.comments);
          setTotalComments(data.totalComments);
          setLastMonthComments(data.lastMonthComments);
        }
      } catch (error) {
        console.log(error.message);
      }
    };
    if (currentUser.isAdmin) {
      fetchUsers();
      fetchPosts();
      fetchComments();
    }
  }, [currentUser]);
  return (
    <div className="p-3 md:mx-auto">
      <div className="flex flex-wrap justify-center gap-5">
        <div className="flex justify-between p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex flex-col justify-center">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Total User</h3>
              <p className="text-2xl text-center">{totalUsers}</p>
            </div>
            <div className="flex gap-2 text-sm">
              <span className="text-green-500 flex items-center">
                <HiArrowNarrowUp />
                {lastMonthUsers}
              </span>
              <div className="text-gray-500">Last month</div>
            </div>
          </div>
          <HiOutlineUserGroup className=" bg-teal-500 text-white rounded-full text-5xl p-3 shadow-lg" />
        </div>
        <div className="flex justify-between p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex flex-col justify-center">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Total Posts</h3>
              <p className="text-2xl text-center">{totalPosts}</p>
            </div>
            <div className="flex gap-2 text-sm">
              <span className="text-green-500 flex items-center">
                <HiArrowNarrowUp />
                {lastMonthPosts}
              </span>
              <div className="text-gray-500">Last month</div>
            </div>
          </div>
          <HiDocumentText className="bg-lime-500 text-white rounded-full text-5xl p-3 shadow-lg" />
        </div>
        <div className="flex justify-between p-3 dark:bg-slate-800 gap-4 md:w-72 w-full rounded-md shadow-md">
          <div className="flex flex-col justify-center">
            <div className="">
              <h3 className="text-gray-500 text-md uppercase">Total Comment</h3>
              <p className="text-2xl text-center">{totalComments}</p>
            </div>
            <div className="flex gap-2 text-sm">
              <span className="text-green-500 flex items-center">
                <HiArrowNarrowUp />
                {lastMonthComments}
              </span>
              <div className="text-gray-500">Last month</div>
            </div>
          </div>
          <HiAnnotation className=" bg-teal-500 text-white rounded-full text-5xl p-3 shadow-lg" />
        </div>
      </div>
      <div className="flex flex-wrap gap-4 py-4 mx-auto justify-center">
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-500">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p2">Recent users</h1>
            <Button outline gradientDuoTone={"purpleToPink"}>
              <Link to={"/dashboard?tab=users"}>See All</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>User image</Table.HeadCell>
              <Table.HeadCell>Username</Table.HeadCell>
            </Table.Head>
            {users &&
              users.map((user) => (
                <Table.Body key={user._id} className=" divide-y">
                  <Table.Row className="bg-white dark:bg-gray-800 dark:border-gray-700">
                    <Table.Cell>
                      <img
                        src={user.profilePicture}
                        alt="user"
                        className="w-10 h-10 rounded-full bg-gray-500"
                      />
                    </Table.Cell>
                    <Table.Cell>{user.username}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-500">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p2">Recent comments</h1>
            <Button outline gradientDuoTone={"purpleToPink"}>
              <Link to={"/dashboard?tab=comments"}>See All</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Comments content</Table.HeadCell>
              <Table.HeadCell>Likes</Table.HeadCell>
            </Table.Head>
            {comments &&
              comments.map((comment) => (
                <Table.Body key={comment._id} className=" divide-y">
                  <Table.Row className="bg-white dark:bg-gray-800 dark:border-gray-700">
                    <Table.Cell className="w-96">
                      <p className=" line-clamp-2">{comment.content}</p>
                    </Table.Cell>
                    <Table.Cell>{comment.numberOfLikes}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
        <div className="flex flex-col w-full md:w-auto shadow-md p-2 rounded-md dark:bg-gray-500">
          <div className="flex justify-between p-3 text-sm font-semibold">
            <h1 className="text-center p2">Recent posts</h1>
            <Button outline gradientDuoTone={"purpleToPink"}>
              <Link to={"/dashboard?tab=users"}>See All</Link>
            </Button>
          </div>
          <Table hoverable>
            <Table.Head>
              <Table.HeadCell>Post image</Table.HeadCell>
              <Table.HeadCell>Post title</Table.HeadCell>
              <Table.HeadCell>Post category</Table.HeadCell>
            </Table.Head>
            {posts &&
              posts.map((post) => (
                <Table.Body key={post._id} className=" divide-y">
                  <Table.Row className="bg-white dark:bg-gray-800 dark:border-gray-700">
                    <Table.Cell>
                      <img
                        src={post.image}
                        alt="post"
                        className="w-20 h-10 bg-gray-500 object-cover"
                      />
                    </Table.Cell>
                    <Table.Cell>{post.title}</Table.Cell>
                    <Table.Cell>{post.category}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </div>
      </div>
    </div>
  );
}
