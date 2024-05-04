import { Button, TextInput } from "flowbite-react";
import { useSelector } from "react-redux";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="max-w-lg mx-auto w-full mt-10">
      <h1 className="text-center text-3xl font-semibold">Profile</h1>
      <form className="flex flex-col gap-4">
        <div className="w-32 h-32 rounded-full shadow-md self-center cursor-pointer overflow-hidden">
          <img
            src={currentUser.profilePicture}
            alt="profile image"
            className="w-full h-full rounded-full border-8 border-[light-gray] object-cover"
          />
        </div>
        <TextInput type="text" id="username" placeholder="Username" defaultValue={currentUser.username}/>
        <TextInput type="email" id="email" placeholder="Email" defaultValue={currentUser.email}/>
        <TextInput type="password" id="password" placeholder="passowrd"/>
        <Button type="submit" gradientDuoTone={'purpleToBlue'} outline>Update</Button>
      </form>
      <div className=" text-red-700 flex justify-between mt-5">
        <span className=" cursor-pointer text-sm hover:underline">Delete Account</span>
        <span className=" cursor-pointer text-sm hover:underline">Sign out</span>
      </div>
    </div>
  );
}
