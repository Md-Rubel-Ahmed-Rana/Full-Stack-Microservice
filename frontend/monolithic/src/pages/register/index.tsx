import Link from "next/link";
import React from "react";

const Register = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="card shrink-0 w-1/2 shadow-2xl bg-base-100">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                type="text"
                placeholder="Enter your full name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                placeholder="email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary text-white">Register</button>
            </div>
            <div>
              <p>
                <span>Already have an account? </span>
                <Link className="text-blue-600" href={"/login"}>
                  Login
                </Link>
                <span> now</span>
              </p>
            </div>
          </form>
        </div>
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Register now!</h1>
          <p className="py-6">
            Discover the allure of quality and style. Explore a world where
            finding your desires is effortless, with a curated selection that
            speaks to your taste. Immerse yourself in a collection that captures
            the essence of luxury and sophistication, ensuring every choice is a
            reflection of your unique identity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;