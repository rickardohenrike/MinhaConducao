function listarContatos() {

  firebase.database().ref("contatos")
  .on("value", function(contatos){

    var html = "";

    contatos.forEach(function(contato){

    	html += '<tr>'+
              '<td>'+contato.val().nome+'</td>'+
              '<td>'+contato.val().telefone+'</td>'+
              '<td class="hidden-xs">'+contato.val().email+'</td>'+
			  '<td>'+contato.val().nomeresp+'</td>'+
              '<td>'+contato.val().telefoneresp+'</td>'+
              '<td class="hidden-xs">'+contato.val().emailresp+'</td>'+
              '<td><button onclick=\'editarContato("'+ contato.key +'")\' class="btn btn-warning" href="editar.html"><span class="glyphicon glyphicon-pencil"></span></button></td>'+
              '<td><button onclick=\'removerContato("'+ contato.key +'")\' class="btn btn-danger"><span class="glyphicon glyphicon-trash"></span></button></td>'+
            '</tr>';

    });

    $("#conteudoTabelaContatos").html(html);

  });

}

function cadastrarContato() {

	var nome = $("#nome").val();
	var telefone = $("#telefone").val();
	var email = $("#email").val();
    var nomeresp = $("#nomeresp").val();
	var telefoneresp = $("#telefoneresp").val();
	var emailresp = $("#emailresp").val();
	
	var contato = {
		nome: nome,
		telefone: telefone,
		email: email,
		nomeresp: nomeresp,
		telefoneresp: telefoneresp,
		emailresp: emailresp
	};

	firebase.database().ref("contatos").push(contato)
	.then(function(result){

		alert("Cadastrado com Sucesso!");
		location.href = "listar.html";

	})
	.catch(function(error){

		alert("Erro ao cadastrar");
		console.log(error.message);

	});

}

function removerContato(id_contato) {

  var deseja_apagar = confirm("Deseja apagar?");

  if (deseja_apagar==false) {
    return false;
  }

  firebase.database().ref("contatos/"+id_contato).remove()
  .then(function(result){

    alert("Removido com Sucesso!");

  })
  .catch(function(error){

    alert("Erro ao remover");
    console.log(error.message);

  });

}

function editarContato(id_contato) {

  localStorage.setItem("id_contato", id_contato);
  location.href = "editar.html";

}

function obterContato() {

  var id_contato = localStorage.getItem("id_contato");

  firebase.database().ref("contatos/"+id_contato)
  .once("value", function(contato){

    $("#nome").val( contato.val().nome );
    $("#email").val( contato.val().email );
    $("#telefone").val( contato.val().telefone );
	 $("#nomeresp").val( contato.val().nomeresp );
    $("#emailresp").val( contato.val().emailresp );
    $("#telefoneresp").val( contato.val().telefoneresp );

  });

}

function confirmarEditarContato() {

  var id_contato = localStorage.getItem("id_contato");

  var nome = $("#nome").val();
  var telefone = $("#telefone").val();
  var email = $("#email").val();
    var nomeresp = $("#nomeresp").val();
  var telefoneresp = $("#telefoneresp").val();
  var emailresp = $("#emailresp").val();

  var contato = {
    nome: nome,
    telefone: telefone,
    email: email,
	  nomeresp: nomeresp,
    telefoneresp: telefoneresp,
    emailresp: emailresp
  };

  firebase.database().ref("contatos/"+id_contato).update(contato)
  .then(function(result){

      alert("Atualizado com Sucesso!");
      location.href = "listar.html";

  })
  .catch(function(error){

    alert("Erro ao atualizar");
    console.log(error.message);

  });

}