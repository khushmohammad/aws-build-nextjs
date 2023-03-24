import React, { useEffect } from "react";
import Auth from "../../layouts/auth";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { profileDelete } from "../../services/profile.service";

const ConfirmDeletion = () => {
  const { data: session } = useSession();

  const router = useRouter();

  const GetSession = async () => {
    if (!session) {
      router.push("/auth/login");
    }
  };

  const cancelDeletion = async () => {
    const data = { deleteProfileStatus: false };
    const response = await profileDelete(data);
    if (response.data.success === true) {
      router.push("/");
    }
  };

  useEffect(() => {
    GetSession();
  }, [session]);

  return (
    <div>
      <Auth>
        <div className=" bg-white pt-5 pt-5 pb-lg-0 pb-5">
          <div className="sign-in-from">
            <h2 className="mb-0">Your account is scheduled for Deletion</h2>
            <p>
              If you want to cancel the deletion of your account or retrieve any
              of the content or information you've added, click Cancel Deletion.
            </p>
            <div className="d-flex w-100 justify-content-end">
              <button
                onClick={() => cancelDeletion()}
                className="btn btn-primary float-right"
              >
                Cancel Deletion
              </button>
              <button
                onClick={() => signOut()}
                className="btn btn-secondary mx-2 float-right"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </Auth>
    </div>
  );
};

export default ConfirmDeletion;
