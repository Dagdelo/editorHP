// Arquivo de línguagem para o português brasileiro
// Substituições para o JS
var strs = {
	erroInterno: "Erro interno, por favor salve e recarregue a página",
	erroAbrirImagem: "Erro ao abrir imagem",
	erroCarregarImagem: "Erro ao carregar imagem",
	semTitulo: "Sem título",
	paginaInicial: "Página inicial",
	paragrafoInicial: "Basta escrever seu texto aqui\nMais em sitegui.com.br",
	acaoAutoPaginacao: "auto paginação",
	pagina: "Página",
	acaoAutoIndexacao: "auto indexação",
	titulo: "EditorHP - #",
	fecharJanela: "Fechar janela",
	fecharArquivo: "Fechar arquivo",
	renomear: "Renomear #",
	novoNome: "Novo nome",
	renomeacao: "renomeação do livro",
	fecharSemSalvar: "Fechar sem salvar",
	fecharSemSalvar_conteudo: "Deseja realmente fechar esse livro e perder todas as modificações não salvas?",
	alteracaoPagina: "alteração da página #",
	desfazerNada: "Nada pode ser desfeito",
	desfazer: "Desfazer # (Ctrl+Z)",
	refazerNada: "Nada pode ser refeito",
	refazer: "Refazer # (Ctrl+Shift+Z)",
	autoIndexacao: "Auto indexação",
	autoIndexacao_dica: "A função de auto indexação cria automaticamente os índices para as páginas de acordo com os cabeçalhos presentes no texto",
	autoIndexacao_ativar: "Ativar auto indexação",
	autoIndexacao_ativacao: "ativação da auto indexação",
	autoIndexacao_desativacao: "desativação da auto indexação",
	movimentacaoIndice: "movimentação do índice",
	remocaoIndice: "remoção de um índice",
	criarIndice: "Criar índice",
	paginaAlvo: "Página alvo",
	criacaoIndice: "criação de um índice",
	editarIndice: "Editar índice",
	edicaoIndice: "edição de um índice",
	movimentacaoAnexo: "movimentação do anexo",
	remocaoAnexos: ["remoção de um anexo", "remoção de # anexos"],
	novoAnexo: "Novo anexo",
	nome: "Nome",
	anexoConteudo: "Conteúdo (deve ser um valor válido pra HP)",
	insercaoAnexo: "inserção de um anexo",
	colagemAnexos: ["colagem de um anexo", "colagem de # anexos"],
	editarAnexo: "Editar anexo",
	edicaoAnexo: "edição de um anexo",
	salvarComo: "Salvar # como",
	salvar: "Salvar #",
	autoPaginacao: "Auto paginação",
	autoPaginacao_dica: "A função de auto paginação divide o livro automaticamente em páginas de acordo com os cabeçalhos presentes no texto",
	autoPaginacao_ativar: "Ativar auto paginação",
	autoPaginacao_ativacao: "ativação da auto paginação",
	autoPaginacao_desativacao: "desativação da auto paginação",
	autoPaginacao_ativada: "Para realizar essa operação você deve desativar a auto-paginação antes",
	movimentacaoPagina: "movimentação da página",
	remocaoPaginas: ["remoção de uma página", "remoção de # páginas"],
	insercaoPagina: "inserção de uma página",
	colagemPaginas: ["colagem de uma página", "colagem de # páginas"],
	semArquivos: "Você não tem nenhum arquivo salvo recentemente",
	agoraPouco: "agora pouco",
	horasAtras: "# horas atrás",
	ontem: "ontem",
	diasAtras: "# dias atrás",
	mesPassado: "mês passado",
	mesesAtras: "# meses atrás",
	erroArquivoAberto: "Esse arquivo esstá aberto no editor, feche-o antes",
	excluirArquivo: "Excluir arquivo",
	excluirArquivo_conteudo: "Tem certeza que deseja excluir de forma permanente esse arquivo da lista?",
	inserirImagem: "Inserir imagem",
	inserirImagem_arquivo: "Inserir imagem a partir de um arquivo",
	inserirImagem_url: "ou URL",
	ou: "ou",
	desenharAgora: "desenhar agora",
	dica0: "Bem-vindo ao editor de textos para a HP50g. Basta escrever o que quiser no campo acima que tudo acontece. Veja esse <a href=\"http://youtube.com/watch?v=wUA79P--I8g\" target=\"_blank\" tabindex='-1'>vídeo explicativo</a>",
	dica1: "Use cabeçalhos pra facilitar a navegação. O editor divide seu texto em páginas e cria o índice com base neles",
	dica2: "Quando quiser, clique salvar para poder baixar o arquivo para a sua calculadora",
	dica4: "Seus arquivos antigos ficam sempre salvos no seu navegador. Para vê-los clique no menu Abrir",
	dica5: "Você pode também pode editar um arquivo já baixado. Basta clicar ir no menu Abrir > Upload",
	dica6: "Se quiser desativar a criação automática de páginas e índices, clique no botão \u25BC nos paineis Páginas e Índices",
	dica7: "Você pode trocar páginas, anexos e índices de lugar. Basta arrasta-los",
	dica8: "Você pode anexar equações, fórmulas, tabelas e imagens junto com seu arquivo",
	dica9: "Gostou desse programa? Fale para seus amigos! Ajude a <a href='https://github.com/sitegui/editorHP/' target='_blank' tabindex='-1'>desenvolver</a> mais ferramentas",
	dica10: "Para instalar essa biblioteca na sua calculadora, salve esse arquivo no diretório HOME da HP e execute <code>EditorHP :1:937 STO HOME 937 ATTACH</code>. Para acessa-la depois, use o menu APPS",
	dica11: "O editor funciona mesmo sem conexão com a Internet! Basta acessa-lo normalmente",
	semAutoIndexar: "Livro sem auto indexação",
	semAutoIndexar_conteudo: "Você está salvando um livro com a opção de auto indexar desligada.<br>Deseja reativa-la antes de salvar?",
	erroRenomearIndice: "Não é possível renomear o índice pois ele não está associado a um cabeçalho",
	erroAlterarIndices: "Não é possível remover, adicionar ou alterar índices enquanto a auto indexação estiver ativa",
	erroSintaxe_fimListaVetorInesperado: "Caractere } ou ] inesperado",
	erroSintaxe_desbalanceamento: "Lista, vetor ou equação não devidamente terminado",
	erroSintaxe_fimParentesesInesperado: "Caractere fechamento de parênteses inesperado",
	erroSintaxe_desbalanceamentoEquacao: "Parênteses não devidamente terminado",
	erroSintaxe_trechoIncorreto: "Trecho da equação incorreto: #",
	erroSintaxe_itemInvalido: "Trecho não reconhecido: #",
	erroSintaxe_derivada: "Derivada fora do formato",
	erroSintaxe_operador: "Uso incorreto do operador #",
	erroSintaxe_equacao: "Equação inválida",
	erroSintaxe_vetorVazio: "Vetores não podem ser vazios",
	erroSintaxe_subMatriz: "Vetor inesperado",
	erroSintaxe_tamanhoMatriz: "Todas as linhas da matriz devem ter a mesma dimensão",
	erroSintaxe_elementoInvalido: "Elemento inválido dentro de um vetor",
	erroSintaxe_operadorIgual: "Construções do tipo A=B=C não são permitidas",
	erroSintaxe_nomeFuncao: "Nome inválido para uma função: #",
	erroSintaxe_integral: "Formato inválido para a integral",
	erroSintaxe_somatorio: "Formato inválido para o somatório",
	erroSintaxe_parenteses: "Parênteses inválido",
	alerta_tamanhoTitulo: "Título muito grande. O tamanho ideal é até 22 caracteres",
	erro_email: "Email inválido",
	erro_mensagem: "Mensagem inválida",
	feedback_enviando: "Enviando feedback...",
	feedback_enviado: "Dados enviados, obrigado",
	feedback_erroEnvio: "Erro no envio, tente novamente mais tarde",
	upload_invalido: "Arquivo selecionado é inválido"
}

// Retorna a tradução correta para o texto
function _(chave, valor) {
	var str, valor2
	valor2 = valor || 0
	if (chave in strs) {
		str = strs[chave]
		if (typeof str != "string")
			// Seleciona a versão de plural correta
			str = valor2==1 ? str[0] : str[1]
		if (valor !== undefined)
			str = str.replace("#", valor)
		return str
	} else
		return "[["+chave+"]]"
}
