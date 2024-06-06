import {
  Alert,
  Button,
  FileInput,
  Label,
  Modal,
  Progress,
  Select,
  TextInput,
} from "flowbite-react";
import { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import { useNavigate } from "react-router-dom";
// import { Quill } from "react-quill";

export default function CreatePost() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [categories, setCategories] = useState([]);
  // const quillRef = useRef()

  const [newCategory, setNewCategory] = useState("");
  // const [value, setValue] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchGetCategory = async () => {
      try {
        const res = await fetch("/api/category/getCategories", {
          method: "GET",
        });
        const data = await res.json();
        if (!res.ok) {
          setPublishError(data.message);
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

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("please select an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError(error);
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadError(null);
            setImageUploadProgress(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload fail");
      setImageUploadProgress(null);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
      } else {
        setPublishError(null);
        navigate(`/post/${data.slug}`);
      }
    } catch (error) {
      setPublishError("somthing went wrong !");
    }
  };
  const handleAddCategory = async () => {
    setOpenModal(false);
    try {
      const res = await fetch("/api/category/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: newCategory.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }
      if (res.ok) {
        setNewCategory("");
        setCategories([...categories, newCategory]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const showOpenModal = () => {
    setOpenModal(true);
  };
  const onCloseModal = () => {
    setOpenModal(false);
  };
  // const textCovert = (text) => {
  //   const textString = JSON.stringify(text);
  //   if (typeof textString === "string" && textString.trim() !== "") {
  //     const newText = textString.trim().toLowerCase();
  //     return newText;
  //   } else {
  //     return;
  //   }
  // };
  // const imageHandler = async () => {
  //   const input = document.createElement("input");

  //   input.setAttribute("type", "file");
  //   input.setAttribute("accept", "image/*");
  //   input.click();
  //   input.onchange = async () => {
  //     const file = input && input.files ? input.files[0] : null;
  //     const formData = new FormData();
  //     formData.append("file", file);
  //     let quillObj = quillRef.current.getEditor();
  //     await UploadService.uploadFile(formData)
  //       .then((res) => {
  //         let data = get(res, "data.data.url");
  //         const range = quillObj.getEditorSelection();
  //         quillObj.getEditor().insertEmbed(range.index, "image", data);
  //       })
  //       .catch((err) => {
  //         console.log(err)
  //         return false;
  //       });
  //   };
  // };
  // const modules = {
  //   toolbar: {
  //     container: [
  //       ["bold", "italic", "underline", "strike"],
  //       [{ header: 1 }, { header: 2 }],
  //       [{ list: "ordered" }, { list: "bullet" }],
  //       [{ script: "sub" }, { script: "super" }],
  //       [{ indent: "-1" }, { indent: "+1" }],
  //       [{ direction: "rtl" }],
  //       [{ size: ["small", false, "large", "huge"] }],
  //       [{ header: [1, 2, 3, 4, 5, 6, false] }],
  //       [{ color: [] }, { background: [] }],
  //       [{ font: [] }],
  //       [{ align: [] }],
  //       ["clean"],
  //       ["link", "image", "video"],
  //     ],
  //     handlers: {
  //       image: imageHandler,
  //     },
  //   },
  //   clipboard: {
  //     matchVisual: false,
  //   },
  //   imageResize: {
  //     parchment: Quill.import("parchment"),
  //     modules: ["Resize", "DisplaySize"],
  //   },
  // };
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Create Post</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-4 sm:flex-row justify-between">
          <TextInput
            type="text"
            placeholder="Title"
            required
            id="title"
            className="flex-1"
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <Select
            onChange={(e) =>
              setFormData({ ...formData, category: e.target.value.trim() })
            }
          >
            <option value="uncategorized">Select a category</option>
            {categories.map((c, index) => (
              <option key={index} value={c.category}>
                {c.category}
              </option>
            ))}
          </Select>
          <Button type="button" onClick={showOpenModal} outline>
            New Category
          </Button>
        </div>
        <div className="flex gap-4 items-center justify-between border-4 border-steal-500 border-dotted p-3">
          <FileInput
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files[0])}
          />
          {imageUploadProgress && (
            <Progress
              progress={imageUploadProgress}
              textLabel="Uploading..."
              size={"lg"}
              labelProgress
              labelText
            />
          )}
          <Button
            type="button"
            gradientDuoTone={"purpleToBlue"}
            size={"sm"}
            outline
            onClick={handleUploadImage}
            isProcessing={imageUploadProgress}
            disabled={imageUploadProgress}
          >
            Upload Image
          </Button>
        </div>
        {imageUploadError && (
          <Alert color={"failure"}>{imageUploadError}</Alert>
        )}
        {formData.image && (
          <img
            src={formData.image}
            alt="image upload"
            className="w-full h-72 object-cover"
          />
        )}
        <ReactQuill
          theme="snow"
          placeholder="Write somthing ..."
          className="h-72 mb-12"
          required
          // value={value}
          // onchange={setValue}
          onChange={(value) => setFormData({ ...formData, content: value })}
          // modules={modules}
        />
        <TextInput
          type="text"
          placeholder="youtube link"
          id="youtubeLink"
          onChange={(e) =>
            setFormData({ ...formData, youtubeLink: e.target.value })
          }
        />
        <Button type="submit" gradientDuoTone={"purpleToPink"}>
          Tạo Bài Viết
        </Button>
        {publishError && (
          <Alert color={"failure"} className="mt-5">
            {publishError}
          </Alert>
        )}
      </form>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6 flex flex-col">
            <div>
              <div className="mb-2 block">
                <Label htmlFor="option" value="New Category" />
              </div>
              <TextInput
                type="text"
                id="option"
                placeholder="add somthing category"
                value={newCategory}
                onChange={(event) => setNewCategory(event.target.value)}
                required
              />
            </div>

            <Button
              type="button"
              gradientDuoTone={"purpleToPink"}
              className="w-full"
              onClick={() => handleAddCategory()}
            >
              Add
            </Button>
            <div className=" text-red-500 text-sm">
              {publishError && <p>error:{publishError}</p>}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
}
