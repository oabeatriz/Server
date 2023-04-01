const prompt = require('prompt-sync')();
const axios = require('./api.js');


async function cadastrarTarefa(){
var id = Number(prompt("Digite o ID da tarefa: "));
var descricao = prompt("Digite a descrição da tarefa: ");
try{

     await axios.api.post('/tarefas', {
     id: id, 
     descricao: descricao,
     status: 'Pendente'
    });
    console.log("Tarefa cadastrada com sucesso!");

    }catch(erro){
      console.log("Erro ao cadastrar a tarefa: ", erro.message);
    }
}
async function excluirTarefa(){
    var id = Number(prompt("Digite o ID da tarefa: "));
    try{
    
         await axios.api.delete(`/tarefas/${id}`, {
         id: id, 
         status: 'Pendente'
        });
        console.log("Tarefa excluida com sucesso!");
    
        }catch(erro){
          console.log("Erro ao excluir a tarefa: ", erro.message);
        }
    }
    async function alterarTarefa(){
        var id = Number(prompt("Digite o ID da tarefa: "));
        var descricao = prompt("Digite qual será a nova tarefa: ");
        try{
        
             await axios.api.put(`/tarefas/${id}`, {
             id: id, 
             status: 'Pendente'
            });
            console.log("Tarefa alterada com sucesso!");
        
            }catch(erro){
              console.log("Erro ao alterar a tarefa: ", erro.message);
            }
        }

        async function listarConcluidas(){
            var id = Number(prompt("Digite o ID da tarefa: "));

            var tarefa = await obterTarefa(id);
            try{
            
                 await axios.api.put(`/tarefas/${id}`, {
                 id: id, 
                 status: 'Concluída'
                });
                console.log("Tarefa concluída com sucesso!");
            
                }catch(erro){
                  console.log("Erro ao concluir tarefa: ", erro.message);
                }
            }
            async function obterTarefa(id){
                var response = await axios.api.get(`/tarefas/${id}`);
                var tarefa = response.data;
                return tarefa;

            }
            async function listarPendentes(){
                try{
                    var response = await axios.api.get('/tarefas');
                    var lista = response.data.filter((item) => item.status == 'Pendente');
                    console.table(lista);
                }catch(erro){
               console.log("Ocorreu um erro ao obter tarefas pendentes");
                }
            }
            async function listarConcluidas(){
                try{
                    var response = await axios.api.get('/tarefas');
                    var lista = response.data.filter((item) => item.status == 'Concluída');
                    console.table(lista);
                }catch(erro){
               console.log("Ocorreu um erro ao obter tarefas concluídas");
                }
            }
    

async function main(){
    console.log("Bem vindo ao sistema de gerenciamento de tarefas!");
    do{
        var op;
        console.log("O que você quer fazer?");

        console.log("1 - Cadastrar nova tarefa");
        console.log("2 - Alterar uma tarefa tarefa");
        console.log("3 - Marcar tarefa como concluída");
        console.log("4 - Excluir uma tarefa");
        console.log("5 - Listar tarefas pendentes");
        console.log("6 - Listar tarefas concluídas");
        console.log("0 - Sair do sistema");
op = prompt("Digite sua opção: ");
switch(op){
    case '1':
        await cadastrarTarefa();
        prompt('Enter pra continuar..');
        console.clear();
        break;
     case '2':
        await alterarTarefa();
        prompt('Enter pra continuar..');
        console.clear();
        break;
       case '3':
        await marcarTarefa();
        prompt('Enter pra continuar..');
        console.clear();
        break;
        case '4':
        await excluirTarefa();
        prompt('Enter pra continuar..');
        console.clear();
        break;
        case '5':
        await listarPendentes();
        prompt('Enter pra continuar..');
        console.clear();
        break;
        case '6':
        await listarConcluidas();
        prompt('Enter pra continuar..');
        console.clear();
        break;
        case '0':
            console.log("Obrigado por usar nosso sistema!");
            break;
            default:
                console.log("Entrada inválida.");
                prompt("Enter pra continuar..");

    



}

    }while(op !== '0');
    
}
main();

