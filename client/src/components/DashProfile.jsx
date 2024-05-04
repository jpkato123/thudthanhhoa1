import { Alert, Button, Progress, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import {app} from "../firebase.js";

export default function DashProfile() {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const filePickerRef = useRef();
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError,setImageFileUploadError] = useState(null)
//   console.log(imageFileUploadProgress,imageFileUploadError)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageFileUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadImage();
    }
  }, [imageFile]);
  const uploadImage = async () => {
    //     service firebase.storage {
    //   match /b/{bucket}/o {
    //     match /{allPaths=**} {
    //       allow read;
    //       allow write: if
    //       request.resource.size < 2*1024*1024 &&
    //       request.resource.contentType.matches('image/.*')
    //     }
    //   }
    // }
    setImageFileUploadError(null)
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on("state_changed", (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setImageFileUploadProgress(progress.toFixed(0));
    },
    (error) => {
        setImageFileUploadError('can not upload image(must me less then 2mb)')
        setImageFileUploadProgress(null)
        setImageFile(null)
        setImageFileUrl(null)
    },
    ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>{
            setImageFileUrl(downloadURL)
        })
    }
    );
  };
  return (
    <div className="max-w-lg mx-auto w-full mt-10">
      <h1 className="text-center text-3xl font-semibold">Profile</h1>
      <form className="flex flex-col gap-4">
        <input
          className=" hidden"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={filePickerRef}
        />
        <div
          className="w-32 h-32 rounded-full shadow-md self-center cursor-pointer overflow-hidden"
          onClick={() => filePickerRef.current.click()}
        >
          <img
            src={imageFileUrl || currentUser.profilePicture}
            alt="profile image"
            className="w-full h-full rounded-full border-8 border-[light-gray] object-cover"
          />
        </div>
        {
            imageFileUploadProgress && (
                <Progress progress={imageFileUploadProgress} textLabel="Uploading" size='lg' labelProgress labelText/>
            )
        }
        {
            imageFileUploadError && (
                <Alert color={'failure'}>
                    {imageFileUploadError}
                </Alert>
            )
        }
        <TextInput
          type="text"
          id="username"
          placeholder="Username"
          defaultValue={currentUser.username}
        />
        <TextInput
          type="email"
          id="email"
          placeholder="Email"
          defaultValue={currentUser.email}
        />
        <TextInput type="password" id="password" placeholder="passowrd" />
        <Button type="submit" gradientDuoTone={"purpleToBlue"} outline>
          Update
        </Button>
      </form>
      <div className=" text-red-700 flex justify-between mt-5">
        <span className=" cursor-pointer text-sm hover:underline">
          Delete Account
        </span>
        <span className=" cursor-pointer text-sm hover:underline">
          Sign out
        </span>
      </div>
    </div>
  );
}
