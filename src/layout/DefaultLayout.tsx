import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks";
import { AuthContext } from "../components/auth";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import LogoWhite from "../assets/svg/logo_white.svg";

interface DefaultLayoutProps {
  children: React.ReactNode;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  const auth = useAuth();
  const [hideMenu, setHideMenu] = useState("hidden");
  const [hideDivMenu, setHideDivMenu] = useState("hidden");

  const [profile, setProfile] = useState("hidden");

  async function onClickSignOut(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    auth.signOut();
  }

  function openProfile() {
    if (profile == "") {
      setProfile("hidden");
    } else {
      setProfile("");
    }
  }

  function menuHidden() {
    setHideMenu("hidden");
    setHideDivMenu("hidden");
  }

  function displayMenu() {
    setHideMenu("");
    setHideDivMenu("");
  }

  return (
    <AuthContext.Provider value={auth}>
      <div className="flex h-screen bg-gray-200 font-roboto">
        <div
          className={`${hideDivMenu} fixed inset-0 z-20 transition-opacity bg-black opacity-50`}
        ></div>

        <div
          className={`${hideMenu} fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform lg:translate-x-0 lg:static lg:inset-0 lg:block`}
          style={{ background: "#0F1B2D" }}
        >
          <div className="flex items-center justify-end">
            <button
              onClick={menuHidden}
              className="p-2 text-gray-500 focus:outline-none lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18 18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex items-center justify-center mt-8">
            <div className="flex items-center">
              <span className="mx-2 text-2xl font-semibold text-white">
                <img src={LogoWhite} alt="Logo de Chirra" />
              </span>
            </div>
          </div>

          <nav className="mt-10">
            {auth.isAdmin ? (
              <Link
                to="/products"
                className="flex items-center m-auto rounded w-3/5 py-2 mt-4 text-white hover:bg-blue-900"
              >
                <span className="mx-3">Productos</span>
              </Link>
            ) : null}
            {auth.isAdmin ? (
              <Link
                to="/wanted-plates"
                className="flex items-center m-auto rounded w-3/5 py-2 mt-4 text-white hover:bg-blue-900"
              >
                <span className="mx-3">Placas Buscadas</span>
              </Link>
            ) : null}
          </nav>
        </div>

        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="flex items-center justify-between px-6 py-4 bg-white border-b-2 border-inherit">
            <div className="flex items-center">
              <button
                onClick={displayMenu}
                className="text-gray-500 focus:outline-none lg:hidden"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4 6H20M4 12H20M4 18H11"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
            <div className="flex items-center">
              <div className="relative">
                <button className="flex mx-4 text-gray-600 focus:outline-none">
                  <svg
                    className="w-6 h-6"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M15 17H20L18.5951 15.5951C18.2141 15.2141 18 14.6973 18 14.1585V11C18 8.38757 16.3304 6.16509 14 5.34142V5C14 3.89543 13.1046 3 12 3C10.8954 3 10 3.89543 10 5V5.34142C7.66962 6.16509 6 8.38757 6 11V14.1585C6 14.6973 5.78595 15.2141 5.40493 15.5951L4 17H9M15 17V18C15 19.6569 13.6569 21 12 21C10.3431 21 9 19.6569 9 18V17M15 17H9"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>

              <div className="relative">
                <button
                  className="relative block w-8 h-8 overflow-hidden rounded-full shadow focus:outline-none"
                  onClick={openProfile}
                >
                  <UserCircleIcon />
                </button>

                <div
                  className={`absolute right-0 z-10 w-48 mt-2 overflow-hidden bg-white rounded-md shadow-xl
                                    ${profile}`}
                >
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
                  >
                    Perfil
                  </Link>
                  <a
                    href="#"
                    onClick={onClickSignOut}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-600 hover:text-white"
                  >
                    Cerrar sesión
                  </a>
                </div>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100">
            {children}
          </main>
        </div>
      </div>
    </AuthContext.Provider>
  );
}
