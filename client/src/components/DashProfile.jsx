import { Alert, Button, Modal, Progress, TextInput } from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import {
  updateStart,
  updateSuccess,
  updateFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signoutSuccess,
} from "../redux/user/userSlice.js";
import { useDispatch } from "react-redux";
import {HiOutlineExclamationCircle,HiMail} from 'react-icons/hi'
import { FaAddressCard, FaBirthdayCake, FaLock, FaPhone, FaUser} from 'react-icons/fa'
import {Link} from 'react-router-dom'

export default function DashProfile() {
  const { currentUser,error,loading } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageFileUrl, setImageFileUrl] = useState(null);
  const filePickerRef = useRef();
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(null);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const [updateUserSuccess, setUpdateUserSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModal,setShowModel] = useState(false)
  //   console.log(imageFileUploadProgress,imageFileUploadError)
  // console.log(new Date(currentUser.birthday).toISOString().split("T")[0]);
  // console.log(formData)
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
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError("can not upload image(must me less then 2mb)");
        setImageFileUploadProgress(null);
        setImageFile(null);
        setImageFileUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageFileUrl(downloadURL);
          setFormData({ ...formData, profilePicture: downloadURL });
          setImageFileUploading(false);
        });
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    setUpdateUserError(null);
    
    setUpdateUserSuccess(null)
    if (Object.keys(formData).length === 0) {
      setUpdateUserError("No changes made");
      return;
    }
    if (imageFileUploading) {
      setUpdateUserError("please waiting for image uploading");
      return;
    }
    try {
      dispatch(updateStart());
      setUpdateUserError(null)
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        dispatch(updateFailure(data.message));
        setUpdateUserError(data.message);
        return;
      } else {
        dispatch(updateSuccess(data));
        setUpdateUserSuccess("User profile updated successfully");
      }
    } catch (error) {
      // dispatch(updateFailure(error.message));
      setUpdateUserError(error.message);
    }
  };
  const handleDelete = async () => {
    setShowModel(false);
    try {
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method:'DELETE',
      })
      const data = await res.json()
      if(!res.ok) {
        dispatch(deleteUserFailure(data.message))
      }else{
        dispatch(deleteUserSuccess(data))
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }
  const handleSignOut = async()=>{
    try {
      const res = await fetch('/api/user/signout',{
        method:'POST',
      })
      const data = await res.json()
      if(!res.ok){
        console.log(data.message)
      }else{
        dispatch(signoutSuccess())
      }
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div className="max-w-lg mx-auto w-full mt-10">
      <h1 className="text-center text-3xl font-semibold">Profile</h1>
      <form onSubmit={handleSubmitForm} className="flex flex-col gap-4">
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
        {imageFileUploadProgress && (
          <Progress
            progress={imageFileUploadProgress}
            textLabel="Uploading"
            size="lg"
            labelProgress
            labelText
          />
        )}
        {imageFileUploadError && (
          <Alert color={"failure"}>{imageFileUploadError}</Alert>
        )}
        <TextInput
          type="text"
          id="username"
          placeholder="Username"
          icon={FaUser}
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <TextInput
          type="email"
          id="email"
          icon={HiMail}
          placeholder="Email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <TextInput
          type="password"
          id="password"
          icon={FaLock}
          placeholder="password"
          onChange={handleChange}
        />
        <TextInput
          type="text"
          id="phoneNumber"
          icon={FaPhone}
          defaultValue={currentUser.phoneNumber}
          placeholder="090123456789"
          onChange={handleChange}
        />
        <TextInput
          type="text"
          id="address"
          defaultValue={currentUser.address}
          icon={FaAddressCard}
          placeholder="address..."
          onChange={handleChange}
        />
        <TextInput
          type="date"
          id="birthday"
          placeholder="Birthday..."
          icon={FaBirthdayCake}
          defaultValue={
            new Date(currentUser.birthday).toISOString().split("T")[0]
          }
          onChange={handleChange}
        />
        <Button
          type="submit"
          gradientDuoTone={"purpleToBlue"}
          outline
          disabled={loading || imageFileUploading}
          isProcessing={loading}
        >
          {loading ? "Loading" : "Update"}
        </Button>
        {currentUser.isAdmin && (
          <Link to={"/create-post"}>
            <Button
              type="button"
              gradientDuoTone={"purpleToPink"}
              className="w-full"
              outline
            >
              Create Post
            </Button>
          </Link>
        )}
      </form>
      <div className=" text-red-700 flex justify-between mt-5">
        <span
          onClick={() => setShowModel(true)}
          className=" cursor-pointer text-sm hover:underline"
        >
          Delete Account
        </span>
        <span
          onClick={handleSignOut}
          className=" cursor-pointer text-sm hover:underline"
        >
          Sign out
        </span>
      </div>
      {updateUserSuccess && (
        <Alert color={"success"} className="mt-5">
          {updateUserSuccess}
        </Alert>
      )}
      {updateUserError && (
        <Alert color={"failure"} className="mt-5">
          {updateUserError}
        </Alert>
      )}
      {error && (
        <Alert color={"failure"} className="mt-5">
          {error}
        </Alert>
      )}
      <Modal
        show={showModal}
        onClose={() => setShowModel(false)}
        popup
        size={"md"}
      >
        <Modal.Header>Delete Account Form</Modal.Header>
        <Modal.Body>
          <div className="text-center">
            <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-300">
              Bạn có muốn xoá tài khoản không?
            </h3>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="flex gap-3 mx-auto">
            <Button color={"failure"} onClick={() => handleDelete()}>
              Xoá tài khoản
            </Button>
            <Button color={"gray"} onClick={() => setShowModel(false)}>
              Không Đồng Ý
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
