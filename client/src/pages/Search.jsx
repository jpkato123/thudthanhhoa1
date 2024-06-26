import { Button, Select, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PostCard from "../components/PostCard";
export default function Search() {
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "",
  });
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const searchTermRef = useRef(null);
  // console.log(location);
  // console.log(sidebarData);
  console.log(posts);
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");
    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }

    const fetchPosts = async () => {
      setLoading(true);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/post/getposts?${searchQuery}`);
      if (!res.ok) {
        setLoading(false);
        return;
      } else {
        const data = await res.json();
        setPosts(data.posts);
        setLoading(false);
        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      }
    };
    fetchPosts();
  }, [location.search]);
  useEffect(() => {
    const fetchGetCategory = async () => {
      try {
        const res = await fetch("/api/category/getCategories", {
          method: "GET",
        });
        const data = await res.json();
        if (!res.ok) {
          return;
        }
        if (res.ok) {
          setCategories(data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchGetCategory();
  }, []);
  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      const searchTermValue = e.target.value;
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermValue,
      });
    }
    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSidebarData({
        ...sidebarData,
        sort: order,
      });
    }
    if (e.target.id === "category") {
      const category = e.target.value || "";
      setSidebarData({
        ...sidebarData,
        category,
      });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(location.search);
    // console.log(urlParams)
    urlParams.set(
      "searchTerm",
      sidebarData.searchTerm === ""
        ? document.getElementById("searchTerm").value
        : sidebarData.searchTerm
    );
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category);
    const searchQuery = urlParams.toString();
    // console.log(searchQuery)
    navigate(`/search?${searchQuery}`);
  };
  const handleShowMore = async () => {
    const numberOfPosts = posts.length;
    const startIndex = numberOfPosts;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/post/getposts?${searchQuery}`);
    if (!res.ok) {
      return;
    }
    if (res.ok) {
      const data = await res.json();
      setPosts([ ...posts, ...data.posts ]);
      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    }
  };
  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label className=" whitespace-normal font-semibold">
              Search Term
            </label>
            <TextInput
              type="text"
              placeholder="Search..."
              id="searchTerm"
              onChange={(e) => handleChange(e)}
              ref={searchTermRef}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className=" whitespace-normal font-semibold">Category</label>
            <Select onChange={(e) => handleChange(e)} id="category">
              <option value="">Uncategorized</option>
              {categories.map((c, index) => (
                <option key={index} value={c.category}>
                  {c.category}
                </option>
              ))}
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <label className=" whitespace-normal font-semibold">Sort</label>
            <Select
              onChange={(e) => handleChange(e)}
              value={sidebarData.sort}
              id="sort"
            >
              <option value="desc">Lastest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>

          <Button type="submit" outline gradientDuoTone={"purpleToPink"}>
            Search
          </Button>
        </form>
      </div>
      <div className="w-full">
        <h1
          className="text-3xl font-semibold sm:border-b border-gray-500 p-3
         mt-5"
        >
          Posts results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {!loading && posts.length === 0 && (
            <p className="text-xl text-gray-500">No posts found</p>
          )}
          {loading && <p className="tex-xl text-gray-500">Loading...</p>}
          {!loading &&
            posts &&
            posts.map((post) => <PostCard key={post._id} post={post} />)}
          {showMore && (
            <button
              onClick={handleShowMore}
              className="text-teal-500 text-lg hover:underline p-7 w-full"
            >
              Show More
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
