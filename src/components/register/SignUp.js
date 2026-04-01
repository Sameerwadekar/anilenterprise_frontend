import React, { useState } from "react";
import { FaUser, FaPhone, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { CreateAccountProxy } from "../utils/proxy/AuthProxy";

function SignUp() {
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      const numericValue = value.replace(/\D/g, "");
      setFormData({ ...formData, [name]: numericValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }
    if (!formData.phone) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      newErrors.phone = "Enter valid Indian mobile number";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (
      !/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/.test(
        formData.password
      )
    ) {
      newErrors.password =
        "Min 8 chars, 1 uppercase, 1 lowercase, 1 number & 1 special char";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      setIsSubmitting(true);
      const res = await CreateAccountProxy(formData.username,formData.phone,formData.password)
      console.log("Sending data to API:", formData);
      if(res){
        alert("Form submitted successfully 🚀");
      }
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center py-6 px-4">
      <div className="max-w-[480px] w-full p-6 sm:p-8 rounded-2xl bg-white border border-gray-200 shadow-sm">
        <a href="javascript:void(0)"><img
            src="https://readymadeui.com/readymadeui.svg" alt="logo" class="w-40 mb-8 mx-auto block" />
        </a>
        <h1 className="text-slate-900 text-center text-3xl font-semibold">
          Sign In
        </h1>

        <form className="mt-12 space-y-6" onSubmit={handleSubmit}>
          {/* Username */}
          <div>
            <label className="text-slate-900 text-sm font-medium mb-2 block">
              User name
            </label>
            <div className="relative">
              <input
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className={`w-full text-slate-900 text-sm border px-4 py-3 pl-10 rounded-md outline-blue-600 ${
                  errors.username ? "border-red-500" : "border-slate-300"
                }`}
                placeholder="Enter user name"
              />
              <FaUser className="absolute left-3 top-4 text-gray-400" />
            </div>
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">{errors.username}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="text-slate-900 text-sm font-medium mb-2 block">
              Phone No:
            </label>
            <div className="relative">
              <input
                name="phone"
                type="text"
                maxLength="10"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full text-slate-900 text-sm border px-4 py-3 pl-10 rounded-md outline-blue-600 ${
                  errors.phone ? "border-red-500" : "border-slate-300"
                }`}
                placeholder="Enter Your Phone"
              />
              <FaPhone className="absolute left-3 top-4 text-gray-400" />
            </div>
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-slate-900 text-sm font-medium mb-2 block">
              Password
            </label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={handleChange}
                className={`w-full text-slate-900 text-sm border px-4 py-3 pl-10 pr-10 rounded-md outline-blue-600 ${
                  errors.password ? "border-red-500" : "border-slate-300"
                }`}
                placeholder="Enter password"
              />
              <FaLock className="absolute left-3 top-4 text-gray-400" />

              <div
                className="absolute right-3 top-4 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">{errors.password}</p>
            )}
          </div>

          <div className="!mt-12">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2 px-4 text-[15px] font-medium tracking-wide rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? "Processing..." : "Sign In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;