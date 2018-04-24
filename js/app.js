// Initialize Firebase
  var config = {
    apiKey: "AIzaSyDff0I1c_o5gsyU7ybUhTjHesL3c34msSU",
    authDomain: "minha-conducao.firebaseapp.com",
    databaseURL: "https://minha-conducao.firebaseio.com",
    projectId: "minha-conducao",
    storageBucket: "minha-conducao.appspot.com",
    messagingSenderId: "114511218724"
  };
  firebase.initializeApp(config);
  
  
  function listarContatos(){
	  firebase.database().ref("contatos")
	  .on("value", function(snapshot){
		
var html ="";

snapshot.forEach(function(child){
	html += '<tr>'+
		'<td>'+child.val().nome+'</td>'+
		'<td>'+child.val().telefone+'</td>'+
		'<td class="hidden-xs" >'+child.val().email+'</td>'+
		'<td><a href="editar.html" class="btn btn-info"><i class="fas fa-edit"></i></a></td>'+
		'<td><button class="btn btn-danger"><span class="glyphicon glyphicon-trash"></span></button></td>'+
		'</tr>';
		
	
	
	
});		
		  
		$("#tblConteudo").html(html);  
		  
	  });
	  
	  
  }
  
  listarContatos(); 
  
  
  function cadastrarContato (){

	  var nome = $("#nome").val();
	  var telefone = $("#telefone").val();
	  var email = $("#email").val();
	  
	  var contato = {
		nome: nome,
telefone: telefone,
email: email		
		  
		  
	  };
	  
	  firebase.database()
	  .ref("contatos")
	  .push(contato)
	  .then(function(result){ 
		alert("Cadastro Realizado com Sucesso!"); 
		console.log(result);
		location.href="Contatos.html";
		})
	  
	  
	  .catch(function(error){
		  alert("Erro ao Cadastrar"); 
		console.log(error.message);
		
	  });
	 
	  
  }