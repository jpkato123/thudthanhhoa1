import { Link } from "react-router-dom";
import CallToAction from "../components/CallToAction.jsx";
import PostCard from "../components/PostCard.jsx";
import { useEffect, useState } from "react";


export default function Home() {
  const [posts,setPosts] = useState([])
  // console.log(posts)
  useEffect(()=>{
    const fetchPosts = async () => {
      const res = await fetch('/api/post/getPosts')
      const data = await res.json()
      setPosts(data.posts)
    }
    fetchPosts()
  },[])
  return (
    <div>
      <div className="flex flex-col gap-6 lg:mt-28 px-3 py-5 max-w-6xl mx-auto">
        <h1 className="text-3xl text-center font-bold lg:text-6xl">
          Chao mung ban den voi Tin Hoc Ung Dung Thanh Hoa
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm ">
          Trung tâm Tin Học Ứng Dụng Thanh Hóa là một địa điểm hàng đầu tại vùng
          này với sứ mệnh chính là cung cấp các dịch vụ và khóa học chất lượng
          cao về công nghệ thông tin và tin học ứng dụng. Với đội ngũ giáo viên
          lành nghề và kinh nghiệm, trung tâm cam kết đem lại sự học tập hiệu
          quả và ứng dụng linh hoạt cho học viên.
        </p>
      
          <Link
            to={"search"}
            className="text-xs sm:text-sm text-gray-500 font-bold hover:underline mr-3"
          >
            View All
          </Link>
          
   
      </div>
      <div className="p-3 bg-amber-100 dark:bg-slate-700 max-w-6xl mx-auto">
        <CallToAction />
      </div>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 py-7">
        {
          posts && posts.length > 0 && (
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-semibold text-center">Recent Posts</h2>
              <div className="flex flex-wrap gap-5 justify-center">
                {
                  posts.map((post)=>(
                    <PostCard key={post._id} post={post}/>
                  ))
                }
              </div>
              <Link to={'/search'} className="text-lg text-teal-500 hover:underline text-center">View All Posts</Link>
            </div>

          )
        }
      </div>
    </div>
  );
}
