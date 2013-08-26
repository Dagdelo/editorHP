// Arquivo de línguagem para o inglês
// Substituições para o JS
var strs = {
	erroInterno: "Internal error, please save and reload the page",
	erroAbrirImagem: "Error on open image",
	erroCarregarImagem: "Error on load image",
	erroDownload: "Error on generate download file",
	semTitulo: "Untitled",
	paginaInicial: "Initial page",
	paragrafoInicial: "Just write your text here\nMore at sitegui.com.br",
	acaoAutoPaginacao: "auto page",
	pagina: "Page",
	acaoAutoIndexacao: "auto index",
	titulo: "HP Editor - #",
	fecharJanela: "Close window",
	fecharArquivo: "Close file",
	renomear: "Rename #",
	novoNome: "New name",
	renomeacao: "book renaming",
	fecharSemSalvar: "Close without saving",
	fecharSemSalvar_conteudo: "Do you really want to close this book and lose all unsaved modifications?",
	alteracaoPagina: "change in page #",
	desfazerNada: "Nothing to be undone",
	desfazer: "Undo # (Ctrl+Z)",
	refazerNada: "Nothin to be redone",
	refazer: "Redo # (Ctrl+Shift+Z)",
	autoIndexacao: "Auto index",
	autoIndexacao_dica: "Auto indexing automatically creates the index for the pages, using headers in the text for that",
	autoIndexacao_ativar: "Turn auto index on",
	autoIndexacao_ativacao: "turning auto index on",
	autoIndexacao_desativacao: "turning auto index off",
	movimentacaoIndice: "moving index",
	remocaoIndice: "removing an index",
	criarIndice: "Create an index",
	paginaAlvo: "Target page",
	criacaoIndice: "creating an index",
	editarIndice: "Edit index",
	edicaoIndice: "altering an index",
	movimentacaoAnexo: "moving attachment",
	remocaoAnexos: ["removing one attachment", "removing # attachments"],
	novoAnexo: "New attachment",
	nome: "Name",
	anexoConteudo: "Content (must be a valid value for HP)",
	insercaoAnexo: "creating an attachment",
	colagemAnexos: ["pasting one attachment", "pasting # attachment"],
	editarAnexo: "Edit attachment",
	edicaoAnexo: "editing an attachment",
	salvarComo: "Save # as",
	salvar: "Save #",
	autoPaginacao: "Auto page",
	autoPaginacao_dica: "Auto paging divides the book automatically in pages, according to the headers in the text",
	autoPaginacao_ativar: "Activate auto page",
	autoPaginacao_ativacao: "turning auto page on",
	autoPaginacao_desativacao: "turning auto page off",
	autoPaginacao_ativada: "To do this you should first turn auto page off",
	movimentacaoPagina: "moving a page",
	remocaoPaginas: ["deleting a page", "deleting # pages"],
	insercaoPagina: "creating a page",
	colagemPaginas: ["pasting a page", "pasting # pages"],
	semArquivos: "You don't have any recently saved file",
	agoraPouco: "just now",
	horasAtras: "# hours ago",
	ontem: "yesterday",
	diasAtras: "# days ago",
	mesPassado: "last month",
	mesesAtras: "# months ago",
	erroArquivoAberto: "This file is currently opened by the editor, please close it first",
	excluirArquivo: "Delete file",
	excluirArquivo_conteudo: "Are you sure to delete permanently this file from the list?",
	inserirImagem: "Insert image",
	inserirImagem_arquivo: "Insert imagem from file",
	inserirImagem_url: "or URL",
	ou: "or",
	desenharAgora: "draw it now",
	dica0: "Welcome to the text editor for HP50g. Write whatever you want in the field above and everything happens",
	dica1: "Use headers to make navigation easier. We will split your text in pages and create indexes automatically based on them",
	dica2: "Whenever you want, click save to download the file to your calculator",
	dica3: "Save this file directly in a SD card (or use cable+software). To open it on the calculator, go to FILES > SD > yourfile > EVAL",
	dica4: "Your past files are always saved in your browser. Click on Open menu to see them",
	dica5: "You can also edit an already downloaded file, using Open > Upload",
	dica6: "If you want to turn off auto paging and auto indexing, click on &#9660; in Pages and Indexes panels",
	dica7: "You can change pages, attachments and indexes places. Just drap them around",
	dica8: "You can attach equations, formulae, tables and imagens with your file",
	dica9: "Did you like this software? Tell your friends! Help <a href='https://github.com/sitegui/editorHP/' target='_blank'>develop</a> more features",
	dica10: "To install this library in your calculator save this file in HP's HOME directory and execute <code>EditorHP :1:937 STO HOME 937 ATTACH</code>. To access this later, use the APPS menu",
	semAutoIndexar: "Book without auto index",
	semAutoIndexar_conteudo: "You're trying to save a book with auto index off.<br>Do you want to turn it on again before saving?",
	erroRenomearIndice: "You can't rename this index because it is not linked with any header",
	erroAlterarIndices: "You can't add nor remove nor alter indexes while auto index is on"
}

// Retorna a tradução correta para o texto
function _(chave, valor) {
	var str
	valor = valor || 0
	if (chave in strs) {
		str = strs[chave]
		if (typeof str != "string")
			// Seleciona a versão de plural correta
			str = valor==1 ? str[0] : str[1]
		if (valor !== undefined)
			str = str.replace("#", valor)
		return str
	} else
		return "[["+chave+"]]"
}
