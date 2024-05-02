import {Link} from 'react-router-dom'
import {Button, Label, TextInput} from 'flowbite-react'
export default function SignUp() {
  return (
    <div className="min-h-screen mt-20">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5">
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
          <p className="text-md mt-5 text-wrap">Tự hào là trung tâm tin học ứng dụng hàng đầu tại thanh hoá. Chuyên cung cấp dịch vụ phần mềm quản lý doanh nghiệp, website, dịch vụ facebook, tiktok và đào tạo tin học trẻ em.</p>
        </div>
        {/* right side */}
        <div className="flex-1">
          <form className='flex flex-col gap-4'>
            <div className="">
              <Label value='Your Username'></Label>
              <TextInput type='text' placeholder='Username' id='username'/>
            </div>
            <div className="">
              <Label value='Your Email'></Label>
              <TextInput type='email' placeholder='name@company.com' id='email'/>
            </div>
            <div className="">
              <Label value='Your Password'></Label>
              <TextInput type='password' placeholder='Password' id='password'/>
            </div>
            <Button type='submit' gradientDuoTone={'purpleToPink'}>Sign Up</Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to={'/sign-in'} className='text-blue-500'>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
