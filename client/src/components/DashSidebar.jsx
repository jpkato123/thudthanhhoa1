import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiAnnotation, HiChartPie, HiDocumentText, HiUser, HiUserGroup } from "react-icons/hi";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

export default function DashSidebar() {
  const location = useLocation();
  const [tab, setTab] = useState("");
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get("tab");
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
    // console.log(tab);
  }, [location.search]);
  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup className="flex flex-col gap-1">
          <Link to={"/dashboard?tab=profile"}>
            <Sidebar.Item
              as={"div"}
              active={tab === "profile"}
              icon={HiUser}
              label={currentUser.isAdmin ? "Admin" : "User"}
              labelColor={"dark"}
            >
              Profile
            </Sidebar.Item>
          </Link>
          {currentUser.isAdmin && (
            <>
              <Link to={"/dashboard?tab=dashboard" || !tab}>
                <Sidebar.Item
                  as="div"
                  active={tab === "dashboard"}
                  icon={HiChartPie}
                  className="cursor-pointer"
                >
                  Dashboard
                </Sidebar.Item>
              </Link>
              <Link to={"/dashboard?tab=posts"}>
                <Sidebar.Item
                  as="div"
                  active={tab === "posts"}
                  icon={HiDocumentText}
                  className="cursor-pointer"
                >
                  Posts
                </Sidebar.Item>
              </Link>
              <Link to={"/dashboard?tab=comments"}>
                <Sidebar.Item
                  as="div"
                  active={tab === "comments"}
                  icon={HiAnnotation}
                  className="cursor-pointer"
                >
                  Comments
                </Sidebar.Item>
              </Link>
              <Link to={"/dashboard?tab=users"}>
                <Sidebar.Item
                  as="div"
                  active={tab === "users"}
                  icon={HiUserGroup}
                  className="cursor-pointer"
                >
                  Users
                </Sidebar.Item>
              </Link>
            </>
          )}
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
