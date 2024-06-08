import React, { useEffect, useRef, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { v4 as uuidv4 } from "uuid";

const Manager = () => {
  const ref = useRef();
  const passwordRef = useRef();
  const [form, setForm] = useState({ site: "", username: "", password: "" });
  const [passwordArray, setPasswordArray] = useState([]);

  const getPasswords = async () => {
    try{
    let req = await fetch("http://localhost:3000/");
    let passwords = await req.json();
    setPasswordArray(passwords);
    }
    catch(error){
      console.log("Error : ", error);
    }
  };

  useEffect(() => {
    getPasswords();
  }, []);

  const showPassword = () => {
    passwordRef.current.type = "text";
    if (ref.current.src.includes("icons/invisible.png")) {
      ref.current.src = "icons/eye.png";
      passwordRef.current.type = "password";
    } else {
      passwordRef.current.type = "text";
      ref.current.src = "icons/invisible.png";
    }
  };

  const savePassword = async () => {
    if (
      form.site.length > 3 &&
      form.username.length > 3 &&
      form.password.length > 3
    ) {
    

      // if any such if exists in the db, delete it

      await fetch("http://localhost:3000/", { method : "DELETE", headers: {"Content-Type" : "application/json"}, body: JSON.stringify({ id : form.id}) })

    setPasswordArray([...passwordArray, { ...form, id: uuidv4()}]);
     await fetch("http://localhost:3000/", { method : "POST", headers: {"Content-Type":"application/json"}, body: JSON.stringify({...form, id:uuidv4() }) })
      // localStorage.setItem(
      //   "password",
      //   JSON.stringify([...passwordArray, newPassword])
      // );
      setForm({ site: "", username: "", password: "" });
      toast("Password Saved Successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      toast("Error: Password not Saved", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const deletePassword = async (id) => {
    let Confirm = confirm("Do you really want to Delete this Password?");
    if (Confirm) {
      const updatedPasswords = passwordArray.filter((item) => item.id !== id);
      setPasswordArray(updatedPasswords);
      // localStorage.setItem("password", JSON.stringify(updatedPasswords));
    await fetch("http://localhost:3000/", { method : "DELETE", headers: {"Content-Type" : "application/json"}, body: JSON.stringify({ id}) })
      toast("Deleted Password Successfully!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const editPassword = (id) => {
    const passwordToEdit = passwordArray.find((item) => item.id === id);
    setForm(passwordToEdit);
    setPasswordArray(passwordArray.filter((item) => item.id !== id));
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const copyText = (text) => {
    toast("Copied to Clipboard!", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigator.clipboard.writeText(text);
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
      </div>
      <div className="p-3 lg:mycontainer min-h-[83.9vh] overflow-x-hidden">
        <h1 className=" text-3xl font-bold text-center">
          <span className=" text-green-500">&lt; </span>
          Pass
          <span className=" text-green-700">Man /&gt;</span>
        </h1>
        <p className=" text-green-800 text-lg text-center">
          Sabka Apna Password Manager
        </p>
        <div className="text-black flex flex-col p-4 gap-6 items-center">
          <input
            className="rounded-full border border-green-500 w-full p-4 py-1 outline-none"
            type="text"
            name="site"
            value={form.site}
            onChange={handleChange}
            placeholder="Enter Website URL"
            id="site"
          />
          <div className="flex md:flex-row flex-col w-full justify-between items-center mx-auto gap-4">
            <input
              className="rounded-full border border-green-500 w-full p-4 py-1 outline-none"
              type="text"
              name="username"
              value={form.username}
              onChange={handleChange}
              placeholder="Enter user Name"
              id="username"
            />
            <div className="relative md:w-auto w-full">
              <input
                ref={passwordRef}
                className="rounded-full border border-green-500 w-full p-4 py-1 outline-none"
                type="password"
                name="password"
                onChange={handleChange}
                value={form.password}
                placeholder="Enter Password"
                id="password"
              />
              <span
                className="absolute right-[3px] top-[4px] cursor-pointer"
                onClick={showPassword}
              >
                <img
                  ref={ref}
                  className="p-1"
                  width={25}
                  src="icons/eye.png"
                  alt=""
                />
              </span>
            </div>
          </div>
          <button
            onClick={savePassword}
            className="flex justify-center items-center bg-green-400 hover:bg-green-300 rounded-full px-5 py-1 w-fit font-bold gap-3 border border-green-800"
          >
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover"
            ></lord-icon>
            Save Password
          </button>
        </div>

        {/* Table for displaying all passwords */}
        <div className="passwords w-full overflow-x-auto">
          <h2 className="font-bold text-2xl py-4 md:text-left text-center">
            Your Passwords
          </h2>
          {passwordArray.length === 0 && <div>No Passwords to Show</div>}

          {passwordArray.length !== 0 && (
            <table className="sm:table-auto table-fixed w-full overflow-hidden rounded-lg mb-2">
              <thead className="bg-green-800 text-white">
                <tr className="md:text-[17px] sm:text-sm text-[12px] break-words">
                  <th className="px-4 py-2">Website URL</th>
                  <th className="px-4 py-2">Username</th>
                  <th className="px-4 py-2">Passwords</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-green-100 md:text-[17px] sm:text-sm text-xs">
                {passwordArray.map((item, index) => (
                  <tr key={index}>
                    <td className="py-2 border border-white text-center break-words">
                      <div className="flex sm:flex-row justify-center flex-col items-center">
                        <a
                          href={item.site}
                          target="_blank"
                          className="sm:w-auto w-full"
                        >
                          <span>{item.site}</span>
                        </a>
                        <div
                          className="lordiconcopy size-7 cursor-pointer"
                          onClick={() => {
                            copyText(item.site);
                          }}
                        >
                          <lord-icon
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "4px",
                            }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 border border-white text-center break-words">
                      <div className="flex sm:flex-row justify-center flex-col items-center">
                        <span className=" sm:w-auto w-full">
                          {item.username}
                        </span>
                        <div
                          className="lordiconcopy size-7 cursor-pointer"
                          onClick={() => {
                            copyText(item.username);
                          }}
                        >
                          <lord-icon
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "4px",
                            }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 border border-white text-center break-words">
                      <div className="flex sm:flex-row justify-center flex-col items-center">
                        <span className=" sm:w-auto w-full">
                          {item.password}
                        </span>
                        <div
                          className="lordiconcopy size-7 cursor-pointer"
                          onClick={() => {
                            copyText(item.password);
                          }}
                        >
                          <lord-icon
                            style={{
                              width: "25px",
                              height: "25px",
                              paddingTop: "3px",
                              paddingLeft: "4px",
                            }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover"
                          ></lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className="py-2 border border-white text-center break-words">
                      <span
                        className="cursor-pointer mx-1"
                        onClick={() => {
                          editPassword(item.id);
                        }}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/gwlusjdu.json"
                          trigger="hover"
                          style={{ width: "25px", height: "25px" }}
                        ></lord-icon>
                      </span>
                      <span
                        className="cursor-pointer mx-1"
                        onClick={() => {
                          deletePassword(item.id);
                        }}
                      >
                        <lord-icon
                          src="https://cdn.lordicon.com/skkahier.json"
                          trigger="hover"
                          style={{ width: "25px", height: "25px" }}
                        ></lord-icon>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
};

export default Manager;
