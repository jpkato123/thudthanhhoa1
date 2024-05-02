import { Footer } from "flowbite-react";
import { Link } from "react-router-dom";
import {
  BsTiktok,
  BsFacebook,
  BsGithub,
  BsInstagram,
  BsTwitter,
} from "react-icons/bs";

export default function FooterCom() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className=" w-full max-w-7xl mx-auto">
        <div className=" grid w-full justify-between sm:flex sm:gap-4 md:grid-cols-1">
          <div className="my-5">
            <Link
              to={"/"}
              className=" self-center text-lg sm:text-sm whitespace-nowrap font-semibold dark:text-white"
            >
              <span className=" bg-gradient-to-r from-indigo-500 to-pink-500 rounded-lg py-2 px-1 text-white sm:text-sm">
                THUD
              </span>
              <span className="sm:text-sm">Thanh Hoá</span>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div className="">
              <Footer.Title title="About" />
              <Footer.LinkGroup col>
                <Footer.Link href="/about">THUD Thanh Hoá</Footer.Link>
                <Footer.Link href="/about">Đánh giá của học viên</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div className="">
              <Footer.Title title="Theo Dõi" />
              <Footer.LinkGroup col>
                <Footer.Link href="/about">Githup</Footer.Link>
                <Footer.Link href="/about">Facebook</Footer.Link>
                <Footer.Link href="/Tiktok">Tiktok</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div className="">
              <Footer.Title title="Đều Khoản" />
              <Footer.LinkGroup col>
                <Footer.Link href="/about">Chính sách</Footer.Link>
                <Footer.Link href="/about">Khuyến Mãi</Footer.Link>
              </Footer.LinkGroup>
            </div>
          </div>
        </div>
        <Footer.Divider />
        <div className="sm:flex w-full sm:justify-between sm:items-center">
          <Footer.Copyright
            href="#"
            by="hieujapan@gmail.com"
            year={new Date().getFullYear()}
          />

          <div className="flex gap-6 mt-4">
            <Footer.Icon href="#" icon={BsFacebook} />
            <Footer.Icon href="#" icon={BsInstagram} />
            <Footer.Icon href="#" icon={BsTwitter} />
            <Footer.Icon href="#" icon={BsGithub} />
            <Footer.Icon href="#" icon={BsTiktok} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
