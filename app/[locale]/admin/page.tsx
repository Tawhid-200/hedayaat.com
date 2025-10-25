"use client";
import React from "react";
import { authClient } from "@/lib/auth/auth-client";
import { useRouter } from "next/navigation";

const Admin = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/");
        },
      },
    });
  };
  return (
    <div>
      Admin
      <button
        type="button"
        className="w-full mt-4 bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default Admin;
