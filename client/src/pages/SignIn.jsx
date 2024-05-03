import { Link, useNavigate } from "react-router-dom";
import { Alert, Button, Label, TextInput } from "flowbite-react";
import { useState } from "react";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";

export default function SignIn() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  // const [loading, setLoading] = useState(false);
  // const [errorMessage, setErrorMessage] = useState(null);
  const { loading, error: errorMessage } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handlechange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };
  const handleSubmit = async (e) => {
    e.preventDefault(); // khi submit thi khong refresh lai page
    if (!formData.email === "" || !formData.password === "") {
      // return setErrorMessage("Xin hãy nhập tất cả các thông tin đăng ký .");
      return dispatch(
        signInFailure("Xin hãy nhập tất cả các thông tin đăng ký .")
      );
    }
    try {
      // setLoading(true);
      // setErrorMessage(null);
      dispatch(signInStart());
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        // return setErrorMessage(data.message);
        return dispatch(signInFailure(data.message));
      }
      if (res.ok) {
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      // setErrorMessage(error.message);
      // setLoading(false);
      dispatch(signInFailure(error.message));
    }
  };
  // console.log(formData)
  // console.log(errorMessage)
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-6">
        {/* left side */}
        <div className="flex-1">
          <Link
            to={"/"}
            className="text-4xl whitespace-nowrap font-bold dark:text-white"
          >
            <span className=" bg-gradient-to-r from-indigo-500 to-pink-500 rounded-lg py-2 px-1 text-white">
              THUD
            </span>
            <span className="">Thanh Hoá</span>
          </Link>
          <p className="text-md mt-5 text-wrap">
            Tự hào là trung tâm tin học ứng dụng hàng đầu tại thanh hoá. Chuyên
            cung cấp dịch vụ phần mềm quản lý doanh nghiệp, website, dịch vụ
            facebook, tiktok và đào tạo tin học trẻ em.
          </p>
        </div>
        {/* right side */}
        <div className="flex-1">
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <div className="">
              <Label value="Email Đăng Nhập"></Label>
              <TextInput
                type="email"
                placeholder="name@company.com"
                id="email"
                onChange={handlechange}
                required
              />
            </div>
            <div className="">
              <Label value="Mật Khẩu"></Label>
              <TextInput
                type="password"
                placeholder="*******"
                id="password"
                onChange={handlechange}
                required
              />
            </div>
            <Button
              type="submit"
              isProcessing={loading}
              gradientDuoTone={"purpleToPink"}
              disabled={loading}
            >
              Đăng Nhập
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Bạn không có tài khoản ?</span>
            <Link to={"/sign-up"} className="text-blue-500">
              Đăng Ký
            </Link>
          </div>
          {errorMessage && (
            <Alert className="mt-5" color={"failure"}>
              {errorMessage}
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
}
