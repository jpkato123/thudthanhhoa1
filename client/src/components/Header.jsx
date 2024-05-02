import { Button, Navbar, TextInput } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import { AiOutlineSearch } from "react-icons/ai";
import { FaMoon } from "react-icons/fa";

export default function Header() {
  const path = useLocation().pathname;
  // console.log(path);
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
      <form>
        <TextInput
          id="search"
          type="text"
          rightIcon={AiOutlineSearch}
          placeholder="Search..."
          className=" hidden lg:inline"
        />
      </form>
      <Button color={"gray"} pill className="w-10 h-10 lg:hidden">
        <AiOutlineSearch className="h-5 w-5 self-center" />
      </Button>
      <div className="flex justify-center items-center gap-1 md:order-2">
        <Button color={"gray"} pill>
          <FaMoon />
        </Button>
        <Link to={"/sign-in"}>
          <Button pill gradientDuoTone={"purpleToBlue"} outline>Đăng Nhập</Button>
        </Link>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link active={path === "/"} as={"div"}>
          <Link to={"/"}>Trang Chủ</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/about"} as={"div"}>
          <Link to={"/about"}>Giới Thiệu</Link>
        </Navbar.Link>
        <Navbar.Link active={path === "/projects"} as={"div"}>
          <Link to={"/projects"}>Dự Án</Link>
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
