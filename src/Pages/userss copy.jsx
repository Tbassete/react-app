import { useEffect } from "react"

function Users(){
const username = 'TBASSETE'
const password = '196969'
const credentials = btoa(`${username}:${password}`)

const getUsers = async () => {
    try {
        // console.log('carregando')
        // const uri = `http://172.26.50.9:8096/rest/users?$top=10&$skip=0`
        // const response = await fetch(uri, {
        //     headers: {
        //         'Authorization': `Basic ${credentials}`
        //     }
        // })
        // const jsonresponse = await response.json() // await aqui
        // const resources = jsonresponse.resources

        // console.log('resources', resources)
    } catch (err) {
        console.log('erro de lista de usuarios', err)
    }
}

useEffect(() => {
    getUsers()
},[]) // array vazio aqui

    return(
    <div className="container-users">
        <div className="card-user">
            <h1>0001</h1>
            <p>Thiago Bassete</p>
            <button>ver detalhes</button>
        </div>
    </div>)
}

export default Users;