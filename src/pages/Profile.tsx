import axios, { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { Config } from '../Authentication/Config';

type TypeList = {
  id_utilisateur: number;
  nom_utilisateur: string;
  prenom_utilisateur: string;
  email: string;
  role: string;
  profilePicture: any;
};

type GetUserProfil = {
  id: number;
  last_login: unknown;
  is_superuser: boolean;
  nom_utilisateur: string;
  prenom_utilisateur: string;
  email: string;
  role: 'simple_utilisateur' | 'admin';
  profilePicture: string;
  groups: [];
  user_permissions: [];
};

// async function getList() {
//    return { id_utilisateur: 1, nom_utilisateur: "Mioraaa", prenom_utilisateur: "Niaina", email: "miora@gmail", role: "simple", password: "mdp", pathImg: "./../../public/logo.png" }
// }

function Profile() {
  const [userProfile, setUserProfile] = useState<TypeList>({
    id_utilisateur: 1,
    nom_utilisateur: '',
    prenom_utilisateur: '',
    email: '',
    role: '',
    profilePicture: '',
  });

  useEffect(() => {
    // console.log("PROFILEE");
    axios
      .get<GetUserProfil>(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/user/${localStorage.getItem(
          'id_user'
        )}`,
        Config
      )
      .then((response) => {
        const result = response.data;
        console.log('ADMIN DATA', result);

        setUserProfile({
          id_utilisateur: result.id,
          nom_utilisateur: result.nom_utilisateur,
          prenom_utilisateur: result.prenom_utilisateur,
          email: result.email,
          role: result.role,
          profilePicture: result.profilePicture,
        });
      });
  }, []);

  useEffect(() => {
    // e.preventDefault();

    // const a = {
    //    // id_utilisateur: ,
    //    nom_utilisateur: "Niaina",
    //    prenom_utilisateur: "Miora",
    //    email: "miora@gmail.com",
    //    role: "simple_utilisateur",
    //    // profilePicture: ,
    // };

    console.log('userprofile', userProfile);

    const formData = new FormData();
    Object.entries(userProfile).forEach(([key, value]) => {
      formData.append(key, value);
    });

    console.log('FORMDATA PROFILE', formData);

    axios
      .put<GetUserProfil>(
        `${
          import.meta.env.VITE_APP_SERVER_URL
        }/api/updateUser/${localStorage.getItem('id_user')}`,
        formData,
        Config
      )
      .then((response: any) => {
        console.log('PROFILE PUT', response.data);
        const result = response.data;
        setUserProfile({
          id_utilisateur: result.id,
          nom_utilisateur: result.nom_utilisateur,
          prenom_utilisateur: result.prenom_utilisateur,
          email: result.email,
          role: result.role,
          profilePicture: result.profilePicture,
        });
      });
  }, [userProfile.profilePicture]);
  // const handleSubmit = (e: any) => {

  // };

  const imageProfil =
    userProfile.profilePicture instanceof File
      ? URL.createObjectURL(userProfile.profilePicture)
      : `${import.meta.env.VITE_APP_SERVER_URL}/${userProfile.profilePicture}`;

  return (
    <div className=" overflow-hidden rounded-sm border border-stroke bg-white shadow-default">
      <div className="mt-2 px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
        <div className="relative z-30 mx-auto h-30 w-full max-w-30 rounded-full bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
          <img
            src={imageProfil}
            // src={`${import.meta.env.VITE_APP_SERVER_URL}/${userProfile.profilePicture}`}
            alt="profile"
            className="relative h-[150px] w-[300px] drop-shadow-2"
          />

          {/* <form onSubmit={handleSubmit}> */}
          {/* <div> */}
          <label
            htmlFor="profile"
            className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
          >
            <svg
              className="fill-current"
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                fill=""
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                fill=""
              />
            </svg>
            <input
              type="file"
              name="profile"
              id="profile"
              className="sr-only"
              // onChange={(e) =>
              //    setList((prevList) => ({
              //       ...prevList,
              //       profilePicture: e.target?.files[0],
              //    }))
              // }
              onChange={(e: any) =>
                setUserProfile((list) => ({
                  ...list,
                  profilePicture: e.target?.files[0],
                }))
              }
            />
          </label>
          {/* <button type="submit">Envoyer</button> */}
          {/* </form> */}

          {/* <label
                  htmlFor="profile"
                  className="absolute bottom-0 right-0 flex h-8.5 w-8.5 cursor-pointer items-center justify-center rounded-full bg-primary text-white hover:bg-opacity-90 sm:bottom-2 sm:right-2"
               >
                  <svg
                     className="fill-current"
                     width="14"
                     height="14"
                     viewBox="0 0 14 14"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg"
                  >
                     <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M4.76464 1.42638C4.87283 1.2641 5.05496 1.16663 5.25 1.16663H8.75C8.94504 1.16663 9.12717 1.2641 9.23536 1.42638L10.2289 2.91663H12.25C12.7141 2.91663 13.1592 3.101 13.4874 3.42919C13.8156 3.75738 14 4.2025 14 4.66663V11.0833C14 11.5474 13.8156 11.9925 13.4874 12.3207C13.1592 12.6489 12.7141 12.8333 12.25 12.8333H1.75C1.28587 12.8333 0.840752 12.6489 0.512563 12.3207C0.184375 11.9925 0 11.5474 0 11.0833V4.66663C0 4.2025 0.184374 3.75738 0.512563 3.42919C0.840752 3.101 1.28587 2.91663 1.75 2.91663H3.77114L4.76464 1.42638ZM5.56219 2.33329L4.5687 3.82353C4.46051 3.98582 4.27837 4.08329 4.08333 4.08329H1.75C1.59529 4.08329 1.44692 4.14475 1.33752 4.25415C1.22812 4.36354 1.16667 4.51192 1.16667 4.66663V11.0833C1.16667 11.238 1.22812 11.3864 1.33752 11.4958C1.44692 11.6052 1.59529 11.6666 1.75 11.6666H12.25C12.4047 11.6666 12.5531 11.6052 12.6625 11.4958C12.7719 11.3864 12.8333 11.238 12.8333 11.0833V4.66663C12.8333 4.51192 12.7719 4.36354 12.6625 4.25415C12.5531 4.14475 12.4047 4.08329 12.25 4.08329H9.91667C9.72163 4.08329 9.53949 3.98582 9.4313 3.82353L8.43781 2.33329H5.56219Z"
                        fill=""
                     />
                     <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M7.00004 5.83329C6.03354 5.83329 5.25004 6.61679 5.25004 7.58329C5.25004 8.54979 6.03354 9.33329 7.00004 9.33329C7.96654 9.33329 8.75004 8.54979 8.75004 7.58329C8.75004 6.61679 7.96654 5.83329 7.00004 5.83329ZM4.08337 7.58329C4.08337 5.97246 5.38921 4.66663 7.00004 4.66663C8.61087 4.66663 9.91671 5.97246 9.91671 7.58329C9.91671 9.19412 8.61087 10.5 7.00004 10.5C5.38921 10.5 4.08337 9.19412 4.08337 7.58329Z"
                        fill=""
                     />
                  </svg>
                  <input
                     type="file"
                     name="profile"
                     id="profile"
                     className="sr-only"
                     onChange={(e: any) =>
                        setList((list) => ({
                           ...list,
                           profilePicture: e.target?.files[0],
                        }))
                     }
                  />
               </label>
               <button
                  onClick={() => updateProfile()}
                  className="bg-primary p-3 text-white"
               >
                  ok
               </button> */}
        </div>
        <div className="mt-4">
          <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
            {userProfile.nom_utilisateur} {userProfile.prenom_utilisateur}
          </h3>
          <h3 className="mb-1.5 text-xl text-black dark:text-white">
            {userProfile.email}
          </h3>
          {/* <input
                  type="file"
                  onChange={
                     (e: any) =>
                        setList((list) => ({
                           ...list,
                           profilePicture: e.target?.files[0],
                        }))
                     // changeProfile()
                  }
               /> */}
        </div>
      </div>
    </div>
  );
}

export default Profile;
