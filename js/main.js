const URLAPP = 'https://dev-web-tio-compras.herokuapp.com/compras';
var vApp;
function createVueApp() {
    vApp = new Vue({
        el: '#app',
        data() {
            return {
                compras: [{}],
                projeto: 'Projeto Grupo 02'
            }
        },
        methods: {
            getCompras: function () {
                axios.get(URLAPP)
                    .then(function (response) {
                        console.log(response)
                    if(response.status == 200){
                        vApp.compras = response.data;
                    }else {
                        vApp.compras = [];
                    }
                    })
                    .catch(function (error) {
                        console.error(error)
                    })
            },
            getSelectCompras: function () {
                let busca = document.querySelector('#campo-busca').value
                let tipoBusca = document.getElementById('tipo-busca').value

                switch (tipoBusca){
                    case 'tipo-busca':
                        axios.get(`${URLAPP}/tipo-busca?search=${busca}`)
                        .then( function (response) {
                            console.log(response)
                            if (response.status == 200){
                                vApp.compras = response.data
                            }else if(response.status == 204){
                                alert('Busca não existente.');
                            }
                        })
                        .catch(function (error) {
                            console.error(error)
                        })
                    break;

                    case 'id':
                        axios.get(`${URLAPP}/${busca}`)
                        .then( function (response) {
                            console.log(response)
                            if (response.status == 200){
                                vApp.compras = [response.data]
                            }else if(response.status == 204){
                                alert('Busca não existente.');
                            }
                        })
                        .catch(function (error) {
                            console.error(error)
                        })
                    break;

                    case 'lista-limpeza':
                        axios.get(`${URLAPP}/lista-limpeza?link=${busca}`)
                        .then( function (response) {
                            console.log(response)
                            if (response.status == 200){
                                vApp.compras = [response.data]
                            }else if(response.status == 204){
                                alert('Busca não existente.');
                            }
                        })
                        .catch(function (error) {
                            console.error(error)
                        })
                    break;



                    case 'lista-alimenticia':
                        axios.get(`${URLAPP}/lista-alimenticia?link=${busca}`)
                        .then( function (response) {
                            console.log(response)
                            if (response.status == 200){
                                vApp.compras = [response.data]
                            }else if(response.status == 204){
                                alert('Busca não existente.');
                            }
                        })
                        .catch(function (error) {
                            console.error(error)
                        })
                    break;



                    case 'lista-tecnologia':
                        axios.get(`${URLAPP}/lista-tecnologia?link=${busca}`)
                        .then( function (response) {
                            console.log(response)
                            if (response.status == 200){
                                vApp.compras = [response.data]
                            }else if(response.status == 204){
                                alert('Busca não existente.');
                            }
                        })
                        .catch(function (error) {
                            console.error(error)
                        })
                    break;
                    default:
                    
                    break;
                }
               
            },


            postCompra: function () {

                var formProduto = document.querySelector('#inputProduto').value
                var formUnidadeMedida = document.querySelector('#inputMedida').value
                var formQuantidade = document.querySelector('#inputQuantidade').value
                var formCategoria = document.querySelector('#inputCategoria').value
                document.querySelector('#selectID').value = ''
   
                var body = {
                    produto: formProduto, 
                    unidadeMedida: formUnidadeMedida,
                    quantidade: formQuantidade, 
                    categoria: formCategoria
                }

                axios.post(URLAPP, body)
                    .then(function (response) {
                        console.log(response)
                        vApp.compras.push(response.data)
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
                    console.log(body);
   
            },
            
            putCompra: function (index) {

                var formProduto = document.querySelector('#inputProduto').value
                var formUnidadeMedida = document.querySelector('#inputMedida').value
                var formQuantidade = document.querySelector('#inputQuantidade').value
                var formCategoria = document.querySelector('#inputCategoria').value
                var id = document.querySelector('#selectID').value
                console.log(index);
                
   
                var body = {
                    produto: formProduto,
                    unidadeMedida: formUnidadeMedida, 
                    quantidade: formQuantidade, 
                    categoria: formCategoria
                }

                axios.put(`${URLAPP}/${id}`, body)
                    .then(function (response) {
                        console.log(response)
                        vApp.compras[index] = response.data
                        vApp.compras.push(response.data)
                        vApp.compras.splice(vApp.compras.length - 1, 1)
                    })
                    .catch(function (error) {
                        console.log(error)
                    })
                    
            },
            deleteCompra: function (obj) {
                var i = parseInt(obj.dataset.objectIndex)
                var buttonEnviar = vApp.compras[i]
                var id = buttonEnviar.id

                console.log(id)

                axios.delete(`${URLAPP}/${id}`)
                    .then(function (response) {
                        console.log(response)
                        vApp.compras.splice(i, 1)
                })
                .catch( function (error) {
                    console.log(error)
                })
            }
        }
    
        
    })
}

function enablePut(index) {


    var buttonEnviar = document.querySelector('#btnCadastrar')
    var produto = document.querySelector('#mudarProduto')



    buttonEnviar.innerText = 'Alterar'
    produto.innerText = 'Alterar produto'


    var i = parseInt(index.dataset.objectIndex)
    
    buttonEnviar.setAttribute('onclick', `vApp.putCompra(${i})`)

    var compraProduto = vApp.compras[i]

    document.querySelector('#inputProduto').value = compraProduto.produto
    document.querySelector('#inputMedida').value = compraProduto.unidadeMedida
    document.querySelector('#inputQuantidade').value = compraProduto.quantidade
    document.querySelector('#inputCategoria').value = compraProduto.categoria
    document.querySelector('#selectID').value = compraProduto.id
    console.log(compraProduto.id)

}

