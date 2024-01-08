import { useEffect, useState } from 'react';
import { AiOutlineDelete, AiOutlineEye, AiOutlineEdit } from "react-icons/ai";
import TableOne from '../components/TableOne';
import TableListUser from '../components/TableListUser';
import TableTwo from '../components/TableTwo';
import DefaultLayout from '../layout/DefaultLayout';
import axios from 'axios';
import { Config } from '../Authentication/Config';

async function getList() {
  axios
    .get('http://192.168.1.134:8000/api/createUser/')
    .then((response) => {
      console.log(response.data);
      // Traitez la réponse de l'API selon vos besoins
      return;
    })
    .catch((error) => {
      console.error(error);
    });
  // return  [
  //   {id_utilisateur:1, nom_utilisateur : "Miora", prenom_utilisateur : "Niaina", email : "miora@gmail"},
  //   {id_utilisateur:2, nom_utilisateur : "test", prenom_utilisateur : "test1", email : "test@gmail"}
  // ]
}
type TypeUser = {
  email: string;
  id: number;
  last_login: unknown;
  nom_utilisateur: string;
  prenom_utilisateur: string;
  profilePicture: File | null;
  role: string;
};

const Tables = () => {
  const [users, setUsers] = useState<TypeUser[]>([]);
  useEffect(() => {
    // axios.get('http://192.168.1.134:8000/api/createUser/')
    // .then(response => {
    //   console.log(response.data);
    //    // Traitez la réponse de l'API selon vos besoins
    //   return
    // })
    // .catch(error => {
    //   console.error(error);
    // });
    axios
      .get<TypeUser[]>(
        `${import.meta.env.VITE_APP_SERVER_URL}/api/users/`,
        Config
      )
      .then((response) => {
        console.log('USERS : ', response.data);
        // const result = response.data;
        setUsers(response.data);
        // setUsers({
        //   id_utilisateur: result.id,
        //   nom_utilisateur: result.nom_utilisateur,
        //   prenom_utilisateur: result.prenom_utilisateur,
        //   email: result.email,
        //   role: result.role,
        //   profilePicture: result.profilePicture,
        // });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <div className="flex flex-col gap-10">
        {/* <TableOne />
        <TableTwo /> */}
        <TableListUser list={users} setList={setUsers} />
      </div>
    </>
  );
};

export default Tables;
