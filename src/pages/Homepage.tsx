import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import Card from '../Card';
import { UserSearchContext } from '../context';

async function getList() {
  return [
    {
      id_produit: 1,
      categorie: 'technologie',
      nom: 'telephone',
      pathImg: './../../public/logo.png',
      prix: 10,
      quantite_stock: 2,
      region: '',
      seuil_minimal: 0,
      description: "c'est une telephone",
    },
    {
      id_produit: 2,
      categorie: 'outfit',
      nom: 'veste',
      pathImg: './../../public/logo.png',
      prix: 20,
      quantite_stock: 3,
      region: '',
      seuil_minimal: 0,
      description: "c'est une veste",
    },
    {
      id_produit: 3,
      categorie: 'outfit',
      nom: 'jupe',
      pathImg: './../../public/logo.png',
      prix: 20,
      quantite_stock: 3,
      region: '',
      seuil_minimal: 0,
      description: "c'est une jupe",
    },
  ];
}

type TypeItem = {
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

function Homepage() {
  const [item, setItem] = useState<TypeItem[]>([]);
  const userSearch = useContext(UserSearchContext);
  // useEffect(() => {
  //    getList().then((data) => {
  //       setItem(data);
  //    });
  // }, []);

  useEffect(() => {
    // if (localStorage.getItem('role_backoffice') == 'admin') {
    axios
      .get(`${import.meta.env.VITE_APP_SERVER_URL}/api/products/`)
      // getList()
      .then((response) => {
        // setItem(response)
        setItem(response.data);
      });
    // }
  }, []);

  return (
    <div className="w-full">
      {item.length > 0 ? (
        <div className="m-5 grid grid-cols-4 gap-4">
          {item
            .filter((elem) => new RegExp(userSearch.search).test(elem.nom))
            .map((el: TypeItem, id) => {
              return (
                <Card
                  key={`typeitem-${id}`}
                  id_produit={el.id_produit}
                  categorie={el.categorie}
                  nom={el.nom}
                  prix={el.prix}
                  pathImg={el.pathImg}
                />
              );
            })}
        </div>
      ) : (
        <h3 className="text-center">Aucun element</h3>
      )}
    </div>
  );
}

export default Homepage;
