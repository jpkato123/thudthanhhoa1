import { Avatar, Button, Dropdown, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon, FaSun } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../redux/theme/themeSlice";
import { signoutSuccess } from "../redux/user/userSlice";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
export default function Header() {
  const path = useLocation().pathname;
  // console.log(path);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const navigate = useNavigate()
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get(searchTerm);// /search?searchTerm=react -->react
    if (searchTermFromUrl) {
      setSearchTerm(searchTerm);
    }
  }, [location.search]);

  const handleSignOut = async () => {
    try {
      const res = await fetch("/api/user/signout", {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signoutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };
const handleSubmit = (e)=>{
  e.preventDefault()
  const urlParams = new URLSearchParams(location.search)
  urlParams.set('searchTerm',searchTerm)
  const searchQuery = urlParams.toString()
  console.log(searchQuery)
  navigate(`/search?${searchQuery}`)
}
  return (
    <Navbar fluid rounded className="border-b-2 shadow-sm">
      <Link
        to={"/"}
        className=" self-center text-sm sm:text-sm whitespace-nowrap font-semibold dark:text-white"
      >
        <span className=" bg-gradient-to-r from-indigo-500 to-pink-500 rounded-lg py-2 px-1 text-white sm:text-sm">
          THUD
        </span>
        <span className="sm:text-sm">Thanh Hoá</span>
      </Link>
      <form onSubmit={handleSubmit}>
        <TextInput
          id="search"
          type="text"
          rightIcon={AiOutlineSearch}
          placeholder="Search..."
          className=" hidden lg:inline"
          onChange={(e)=>setSearchTerm(e.target.value)}
        />
      </form>
      <Button color={"gray"} pill className="w-10 h-10 lg:hidden">
        <AiOutlineSearch className="h-5 w-5 self-center" />
      </Button>
      <div className="flex justify-center items-center gap-1 md:order-2">
        <Button
          color={"gray"}
          pill
          className=" hidden md:inline"
          onClick={() => dispatch(toggleTheme())}
        >
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </Button>
        {currentUser ? (
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <Avatar
                alt="User setting"
                img={currentUser.profilePicture}
                rounded
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm truncate">
                @{currentUser.username}
              </span>
              <span className="block truncate text-sm">
                {currentUser.email}
              </span>
            </Dropdown.Header>
            <Link to={"/dashboard?tab=profile"}>
              <Dropdown.Item>Profile</Dropdown.Item>
            </Link>

            <Dropdown.Item onClick={handleSignOut}>Sign out</Dropdown.Item>
          </Dropdown>
        ) : (
          <Link to={"/sign-in"}>
            <Button size={"sm"} pill gradientDuoTone={"purpleToBlue"} outline>
              Đăng Nhập
            </Button>
          </Link>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to={"/"} className="dark:text-white">
            Trang Chủ
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to={"/about"} className="dark:text-white">
            Giới Thiệu
          </Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to={"/projects"} className="dark:text-white">
            Dự Án
          </Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
