import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Config } from './../Authentication/Config';

type typeItem = {
  id_produit: number;
  categorie: string;
  nom: string;
  pathImg: string;
  prix: number;
  quantite_stock: number;
  region: string;
  seuil_minimal: number;
  description: string;
};

// type typeAchat = {
//    id_produit: number;
//    categorie: string;
//    nom: string;
//    pathImg: string;
//    prix: number;
//    quantite_stock: number;
//    region: string;
//    seuil_minimal: number;
//    description: string;
//    nombreAchat: number;
// };

// async function getList() {
//     return { id_produit: 1, categorie: "tech", nom: "telephone", pathImg: "./../../public/logo.png", prix: 100, quantite_stock: 1, region: "tana", seuil_minimal: 1, description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus eius nihil rem soluta, facere officiis eaque voluptatem et autem aut corporis, labore cupiditate earum eveniet praesentium, veniam maiores cum similique." }
// }

function Produit() {
  const [item, setItem] = useState<typeItem>({
    id_produit: 1,
    categorie: '',
    nom: '',
    pathImg: '',
    prix: 0,
    quantite_stock: 0,
    region: '',
    seuil_minimal: 0,
    description: '',
  });

  // const [achat, setAchat] = useState<typeAchat>({
  //    id_produit: 1,
  //    categorie: "",
  //    nom: "",
  //    pathImg: "",
  //    prix: 0,
  //    quantite_stock: 0,
  //    region: "",
  //    seuil_minimal: 0,
  //    description: "",
  //    nombreAchat: 1,
  // });

  const [rate, setRate] = useState<boolean[]>([
    true,
    false,
    false,
    false,
    false,
  ]);

  const [note, setNote] = useState<number>(1);
  const [displayPopup, setDisplayPopup] = useState<boolean>(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_APP_SERVER_URL}/api/product/${params.id}`)
      // getList()
      .then((response) => {
        // console.log("reponse produit", response.data)
        // setItem(response)
        setItem(response.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(
        `${
          import.meta.env.VITE_APP_SERVER_URL
        }/api/evaluation/${localStorage.getItem('id_user')}/${params.id}`,
        Config
      )
      .then((response) => {
        console.log('DATA', response.data);
        if (response.data.note) setNote(response.data.note);
        console.log('NOTEEE', response.data.note);
      });
  }, []);

  // const buy = () => {
  //    console.log("buy id : ", item.id_produit);
  //    //     axios.post(`${import.meta.env.VITE_APP_SERVER_URL}/api/item${params.id}`)
  //    //         .then((response) => {
  //    //             console.log("categorie", response.data)
  //    //             setCategorie(response.data)
  //    //         })
  // };

  return (
    <div className={`flex w-full items-center justify-center`}>
      <div className=" mt-[-10px] flex items-center justify-center">
        <div className="mb-10 flex w-[50vw] flex-col ">
          <img
            className="mx-auto h-80 w-100"
            src={`${import.meta.env.VITE_APP_SERVER_URL}/${item.pathImg}`}
            alt="img"
          />

          <div className="mt-8 px-8">
            <div className="flex flex-row justify-between">
              <div>
                <p>
                  Name:
                  <span className="font-semibold">{item.nom}</span>
                </p>
                <p>
                  Stock available:{' '}
                  <span className="font-semibold">{item.quantite_stock}</span>
                </p>
              </div>
              <span className="font-light">{item.categorie}</span>
            </div>
            <p className="mt-4 flex flex-row justify-end font-bold">
              Price:{' '}
              <span className="text-red-800 ml-4 text-2xl">Ar {item.prix}</span>
            </p>

            {item.description && (
              <p className="my-2 font-bold">About this article</p>
            )}
            <p className=" max-w-[40vw]">{item.description}</p>
          </div>

          <div className="mt-2">
            {/* <p className="mb-4 text-xs">
                     Arrives <span className="font-bold">2 juin </span>
                  </p> */}
            {/* <p className='text-xs mb-4'>Arrives between <span className='font-bold'>{deliveryDate(today, 'dd/mm/yy', 5)} and el {deliveryDate(today, 'dd/mm/yy', 10)}</span></p> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Produit;
