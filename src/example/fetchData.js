const { useEffect } = require("react")
const { useState } = require("react")

async function getList() {

    return  [
        {id_utilisateur: 1, nom_utilisateur : "Miora", prenom_utilisateur : "Niaina", email : "miora@gmail"},
        {id_utilisateur: 2, nom_utilisateur : "test", prenom_utilisateur : "test1", email : "test@gmail"}
    ]
}

function Test() {

    const [list, setList] = useState()
    useEffect(() => {
        getList().then((data) => {
            setList(data)
        })
    }, [])
    
    return <>
    
    </>
}