const resultados = document.getElementById("resultado")
var usuario;
var usuarios = [];
var xhr
window.onload = ()=>{
    document.getElementById("generarUser").addEventListener("click", generarUsuarioAleatorio)
    document.getElementById("guardarDatosXML").addEventListener("click", guardarDatosXML)
    document.getElementById("guardarDatosFetch").addEventListener("click", guardarDatosFetch)

}
function generarUsuarioAleatorio(){
    fetch("https://randomuser.me/api/?nat=es")
        .then(result=>{
            if(result.ok)return result.json()
        })
        .then(response=>{
            let persona=response.results[0];
            
            let divARellenar = document.getElementById("usuario");
            divARellenar.innerHTML = "";
            
            let img = document.createElement("img");
            img.setAttribute("src", persona.picture.large);
            divARellenar.appendChild(img);
            
            let nombre = document.createElement("h2");
            nombre.innerText = persona.name.first + " " + persona.name.last;
            divARellenar.appendChild(nombre);

            let direccion = document.createElement("p");
            direccion.innerText = persona.location.street.name + " " + persona.location.street.number;
            divARellenar.appendChild(direccion);

            let telefono = document.createElement("p");
            telefono.innerText = persona.phone;
            divARellenar.appendChild(telefono);

            let email = document.createElement("p");
            email.innerText = persona.email;
            divARellenar.appendChild(email);
            
            let boton = document.createElement("input");
            boton.setAttribute("type", "button");
            boton.setAttribute("value","Añadir a la tabla")
            boton.setAttribute("id", "botonParaTabla"
            );
            divARellenar.appendChild(boton);
            document.getElementById("botonParaTabla").addEventListener("click",meterEnTabla);
            usuario={
                name:persona.name.first + " " + persona.name.last,
                phone:persona.phone,
                street:persona.location.street.name + " " + persona.location.street.number,
                email:persona.email,
                image:persona.picture.large
            }
            let resultado = document.createElement("p")
            resultado.innerText = `Usuario ${persona.name.first} obtenido`;
            resultados.appendChild(resultado)
        });
    
}
function guardarDatosXML() {
    xhr = new XMLHttpRequest;
    xhr.open("POST", "save_users.php");
    xhr.send(JSON.stringify(usuarios));
    let resultado = document.createElement("p")
    resultado.innerText = `Usuarios almacenados (XMLHttpRequest)`;
    resultados.appendChild(resultado)
}
function guardarDatosFetch() {
    fetch("save_users.php",{
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(usuarios)
    }).then(result=>{
        if(result.ok){
            let resultado = document.createElement("p")
            resultado.innerText = `Usuarios almacenados (Fetch)`;
            resultados.appendChild(resultado)
        }
    })
}
function meterEnTabla() {
    console.log("insercion en tabla")
    let tabla = document.getElementById("tabla");
    if(!tabla.hasChildNodes()){
        let header = ["Nombre","Direccion","Telefono","Email"];
        let tr = document.createElement("tr");
        header.forEach(element => {
            let td = document.createElement("td");
            td.innerText=element;
            tr.appendChild(td);
        });
        tabla.appendChild(tr);
    }
    let tr = document.createElement("tr");
    
    [usuario.name, usuario.street, usuario.phone, usuario.email].forEach(element=>{
        let td = document.createElement("td");
        td.innerText=element;
        tr.appendChild(td);
    });
    tabla.appendChild(tr);
    usuarios.push(usuario);
    generarUsuarioAleatorio();
}