// Reúne métodos para abrir e gerar o formato da HP

/*
Fluxo das transformações:

+------+ normalizar +---------+ compilar +--------+ gerarDownload.php +---------+
|      | ---------> |         | -------> |        | ----------------> |         |
| HTML |            | Objetos |          | String |                   | Arquivo |
|      | <--------- |         | <------- |        | <---------------- |         |
+------+ gerarHTML* +---------+ inflar   +--------+ abrirUpload.php   +---------+

*Existe também gerarMiniHTML para a miniatura da página

Toda string salva na estrutura é sanitizada automaticamente

Os métodos para transformar de string em link são gerarLink e abrirLink
*/
var Compilador = {}

// Interpreta o livro a partir de uma string
Compilador.inflar = function (str) {
	var obj, livro, i, pagina, elemento, temp, anexo, gerarIndice
	
	// Contrói o livro
	obj = Compilador.interpretarString(str)
	livro = new Livro
	livro.nome = obj[1]
	livro.criacao = obj[2][0]
	livro.modificacao = obj[2][1]
	livro.autoPaginacao = Boolean(obj[2][2])
	livro.autoIndexacao = Boolean(obj[2][3])
	
	// Constrói as páginas
	for (i=0; i<obj[4].length; i++) {
		pagina = new Pagina
		
		// Constróis os elementos da página
		for (j=0; j<obj[4][i].length; j++) {
			temp = obj[4][i][j]
			switch (temp[temp.length-1]) {
				case 0:
					elemento = new Texto
					elemento.alinhamento = temp[0]
					elemento.texto = temp.slice(1, temp.length-1).join("\n")
					break
				case 1:
					elemento = new Equacao
					elemento.alinhamento = temp[0]
					elemento.texto = temp[1]
					break
				case 2:
					elemento = new Imagem
					elemento.cache = temp[0]+" "+temp[1]+" "+temp[2]+" "+temp[3]
					break
				case 3:
					elemento = new Cabecalho
					elemento.alinhamento = temp[0]
					elemento.nivel = temp[1]
					elemento.texto = temp[2]
					break
				case 4:
					elemento = new Regua
					elemento.preto = Boolean(temp[0])
					elemento.altura = temp[1]
					break
			}
			pagina.elementos.push(elemento)
		}
		
		livro.paginas.push(pagina)
	}
	
	// Constrói um índice recursivamente
	gerarIndice = function (obj) {
		var indice, subindice, i
		if (obj[obj.length-1]) {
			indice = new FolhaIndice
			indice.pagina = livro.paginas[obj[1]-1]
		} else {
			indice = new SubIndice
			for (i=1; i<obj.length-1; i++)
				indice.indices.push(gerarIndice(obj[i]))
		}
		indice.nome = obj[0]
		return indice
	}
	
	// Constrói o índice
	for (i=0; i<obj[3].length; i++)
		livro.indices.push(gerarIndice(obj[3][i]))
	
	// Constrói os anexos
	for (i=0; i<obj[5].length; i++) {
		anexo = new Anexo
		anexo.nome = obj[5][i][0]
		anexo.conteudo = obj[5][i][1]
		livro.anexos.push(anexo)
	}
	
	return livro
}

// Compila um livro
Compilador.compilar = function (livro) {
}

// Gera HTML de uma página
Compilador.gerarHTML = function (pagina) {
	var i, html, el, getAlinhamento, escaparHTML
	
	getAlinhamento = function (elemento) {
		switch (elemento.alinhamento) {
			case 0: return "align='center'"
			case 1: return "align='right'"
		}
		return ""
	}
	
	escaparHTML = function (elemento) {
		return elemento.texto.replace(/&/g, "&amp;").replace(/</g, "&lt;")
	}
	
	html = ""
	for (i=0; i<pagina.elementos.length; i++) {
		el = pagina.elementos[i]
		if (el instanceof Texto)
			html += "<p "+getAlinhamento(el)+">"+escaparHTML(el).replace(/\n/g, "<br>")+"</p>"
		else if (el instanceof Equacao)
			html += "<pre "+getAlinhamento(el)+">"+escaparHTML(el)+"</pre>"
		else if (el instanceof Imagem)
			html += "<img>" // TODO
		else if (el instanceof Cabecalho)
			html += "<h"+el.nivel+" "+getAlinhamento(el)+">"+escaparHTML(el)+"</h"+el.nivel+">"
		else if (el instanceof Regua)
			html += "<hr height='"+el.altura+"' color='"+(el.preto ? "black" : "white")+"'>"
	}
	
	return html
}

// Gera HTML em miniatura de uma página
Compilador.gerarMiniHTML = function (pagina, num) {
	var i, html, el, getAlinhamento, escaparHTML, estilo
	
	getAlinhamento = function (elemento) {
		switch (elemento.alinhamento) {
			case 0: return "align='center'"
			case 1: return "align='right'"
		}
		return ""
	}
	
	escaparHTML = function (elemento) {
		return elemento.texto.replace(/&/g, "&amp;").replace(/</g, "&lt;")
	}
	
	html = "<div class='pagina-numero'>"+num+"</div>"
	for (i=0; i<pagina.elementos.length; i++) {
		el = pagina.elementos[i]
		if (el instanceof Texto)
			html += "<p "+getAlinhamento(el)+">"+escaparHTML(el).replace(/\n/g, "<br>")+"</p>"
		else if (el instanceof Equacao)
			html += "<pre "+getAlinhamento(el)+">"+escaparHTML(el)+"</pre>"
		else if (el instanceof Imagem)
			html += "<img>" // TODO
		else if (el instanceof Cabecalho) {
			switch (el.nivel) {
				case 1: estilo = "font-size:larger;font-weight:bold"; break
				case 2: estilo = "font-size:larger"; break
				case 3: estilo = "font-size:larger;text-transform:italic"; break
				case 4: estilo = "font-weight:bold"; break
				case 5: estilo = ""; break
				case 6: estilo = "text-transform:italic"; break
			}
			html += "<p "+getAlinhamento(el)+" style='"+estilo+"'>"+escaparHTML(el)+"</p>"
		} else if (el instanceof Regua)
			html += "<hr height='"+el.altura+"' color='"+(el.preto ? "black" : "white")+"'>"
	}
	
	return html
}

// Normaliza o HTML para uma página
// Recebe o nó raiz da árvore
// Retorna um vetor de elementos
Compilador.normalizar = function (raiz) {
	var lista, no, i, validos, primeiro, agrupar, elementos, elemento
	
	// Percorre a árvore enraizando elementos válidos
	validos = ["P", "PRE", "IMG", "H1", "H2", "H3", "H4", "H5", "H6", "HR"]
	lista = [raiz]
	while (lista.length) {
		no = lista.pop()
		for (i=0; i<no.childNodes.length; i++)
			lista.push(no.childNodes.item(i))
		
		if (no.nodeType == Node.ELEMENT_NODE && validos.indexOf(no.nodeName) != -1 && no.parentNode != raiz)
			// Enraiza o nó válido
			Compilador.enraizarNo(no, raiz)
	}
	
	// Agrupa nós enraizados não válidos
	no = raiz.firstChild
	primeiro = null
	agrupar = function (primeiro, ultimo) {
		var novoNo, temp
		novoNo = document.createElement("P")
		while (primeiro != ultimo) {
			temp = primeiro.nextSibling
			novoNo.appendChild(primeiro)
			primeiro = temp
		}
		raiz.insertBefore(novoNo, ultimo)
	}
	while (no) {
		if (validos.indexOf(no.nodeName) == -1 && !primeiro) {
			primeiro = no
		} else if (validos.indexOf(no.nodeName) != -1 && primeiro) {
			agrupar(primeiro, no)
			primeiro = null
		}
		no = no.nextSibling
	}
	if (primeiro)
		agrupar(primeiro, no)
	
	// Normaliza os elementos
	elementos = []
	for (i=0; i<raiz.childNodes.length; i++) {
		no = raiz.childNodes.item(i)
		if (no.textContent == "" && no.nodeName != "IMG" && no.nodeName != "HR") {
			raiz.removeChild(no)
			i--
			continue
		}
		elemento = Compilador.normalizarElemento(no)
		if (elemento)
			elementos.push(elemento)
	}
	
	return elementos
}

// Interpreta o livro a partir de um arquivo enviado pelo usuário
// Função assíncrona, executa onsucesso quando acabar (o livro vai como argumento)
Compilador.abrirUpload = function (arquivo, onsucesso) {
	var xhr, dados
	
	dados = new FormData
	dados.append("arquivo", arquivo)
	
	xhr = new XMLHttpRequest
	xhr.open("POST", "abrirUpload.php")
	xhr.send(dados)
	xhr.onload = function () {
		onsucesso(Compilador.abrirString(xhr.responseText))
	}
}

// Gera um arquivo de download
Compilador.gerarDownload = function (str) {
}

// Interpreta o livro a partir de um link
Compilador.abrirLink = function (link) {
	// TODO
}

// Gera um link para abrir o arquivo
Compilador.gerarLink = function (livro) {
	// TODO
}

// Sanitiza uma string do PC (troca os tri-graphs e remove caracteres inválidos)
Compilador.sanitizar = function (str) {
	var i, str2 = ""
	str = str.replace(/[\r\t]/g, "")
	for (i in Compilador.triGraphs)
		str = str.replace(new RegExp(i, "g"), Compilador.triGraphs[i])
	for (i=0; i<str.length; i++)
		if (str[i] in Compilador.mapaPC2HP)
			str2 += str[i]
	return str2
}

/*
Métodos para uso interno
*/

// Sobe um nó válido até a raiz
Compilador.enraizarNo = function (no, raiz) {
	var pai, esq, dir, validos
	
	validos = ["P", "PRE", "IMG", "H1", "H2", "H3", "H4", "H5", "H6", "HR"]
	pai = no.parentNode
	while (pai != raiz) {
		if (pai.firstChild != no) {
			// Tira os nós da esquerda
			esq = pai.cloneNode(false)
			while (pai.firstChild != no)
				esq.appendChild(pai.firstChild)
			pai.parentNode.insertBefore(esq, pai)
		}
		
		if (pai.lastChild != no) {
			// Tira os nós da direita
			dir = pai.cloneNode(false)
			while (pai.childNodes.length>1)
				dir.appendChild(pai.childNodes.item(1))
			pai.parentNode.insertBefore(dir, pai.nextSibling)
		}
		
		// Sobe o nó
		pai.parentNode.insertBefore(no, pai)
		pai.parentNode.removeChild(pai)
		if (no.nodeName == "P" && validos.indexOf(pai.nodeName) == -1) {
			// Troca o papel de pai-filho no nó
			while(no.childNodes.length)
				pai.appendChild(no.firstChild)
			no.appendChild(pai)
		}
		pai = no.parentNode
	}
}

// Normaliza um elemento HTML válido (P, PRE, IMG, H1, H2, H3, H4, H5, H6, HR)
Compilador.normalizarElemento = function (no) {
	var elemento, texto, alinhamento = -1, css
	
	// Pega o alinhamento
	css = getComputedStyle(no).textAlign
	if (css.indexOf("right") != -1)
		alinhamento = 1
	else if (css.indexOf("center") != -1)
		alinhamento = 0
	
	switch (no.nodeName) {
		case "P":
			no.innerHTML = no.innerHTML.replace(/<br(?=\W)[^>]*?>/gi, "\n")
			texto = Compilador.sanitizar(no.textContent.trim())
			if (texto == "")
				return null
			elemento = new Texto
			elemento.texto = texto
			elemento.alinhamento = alinhamento
			return elemento
		case "PRE":
			texto = Compilador.sanitizar(no.textContent.trim())
			if (texto == "")
				return null
			elemento = new Equacao
			elemento.texto = texto
			elemento.alinhamento = alinhamento
			return elemento
		case "IMG":
			// TODO
		case "H1":
		case "H2":
		case "H3":
		case "H4":
		case "H5":
		case "H6":
			texto = Compilador.sanitizar(no.textContent.trim())
			if (texto == "")
				return null
			elemento = new Cabecalho
			elemento.texto = texto
			elemento.nivel = Number(no.nodeName.substr(1))
			elemento.alinhamento = alinhamento
			return elemento
		case "HR":
			elemento = new Regua
			elemento.preto = no.color=="black"
			elemento.altura = Number(no.size)
			return elemento
	}
	
	// Elemento inválido
	return null
}

// Interpreta uma string com um objeto da HP, retorna uma array com ele
// Ex: "{ 1 2 { 3 .14 } }" -> [1, 2, [3, .14]]
Compilador.interpretarString = function (str) {
	var obj, objAtual, i, c, strLiteral, buffer, salvarBuffer, novo, escape
	
	obj = []
	obj.pai = null
	objAtual = obj
	strLiteral = false
	buffer = ""
	escape = false
	
	salvarBuffer = function () {
		if (buffer) {
			if (buffer.length > 1 && buffer.charAt(0) == "\"" && buffer.charAt(buffer.length-1) == "\"")
				objAtual.push(buffer.substr(1, buffer.length-2).replace(/\\"/g, "\"").replace(/\\\\/g, "\\"))
			else if (!isNaN(Number(buffer)))
				objAtual.push(Number(buffer))
			else
				objAtual.push(buffer)
			buffer = ""
		}
	}
	
	for (i=0; i<str.length; i++) {
		c = str.charAt(i)
		if (c == "{" && !strLiteral) {
			salvarBuffer()
			novo = []
			novo.pai = objAtual
			objAtual.push(novo)
			objAtual = novo
		} else if (c == "}" && !strLiteral) {
			salvarBuffer()
			novo = objAtual.pai
			delete objAtual.pai
			objAtual = novo
		} else if (c == "\"" && !escape) {
			buffer += c
			strLiteral = !strLiteral
		} else if (c == "\\" && strLiteral && !escape) {
			escape = true
			buffer += c
		} else if ((c == " " || c == "\n" || c == "\r" || c == "\t") && !strLiteral) {
			salvarBuffer()
		} else {
			buffer += c
			escape = false
		}
	}
	
	salvarBuffer()
	delete obj.pai
	
	return obj[0]
}

// Conversão HP -> PC
// Códigos vão de 0 a 255
Compilador.mapaHP2PC = [
"\x00", "\x01", "\x02", "\x03", "\x04", "\x05", "\x06", "\x07",
"\x08", "\x09", "\n", "\x0B", "\x0C", "\x0D", "\x0E", "\x0F",
"\x10", "\x11", "\x12", "\x13", "\x14", "\x15", "\x16", "\x17",
"\x18", "\x19", "\x1A", "\x1B", "\u21D0", "\u25A0", "\u2026", "\u2026",
" ", "!", "\"", "#", "$", "%", "&", "'",
"(", ")", "*", "+", ",", "-", ".", "/",
"0", "1", "2", "3", "4", "5", "6", "7",
"8", "9", ":", ";", "<", "=", ">", "?",
"@", "A", "B", "C", "D", "E", "F", "G",
"H", "I", "J", "K", "L", "M", "N", "O",
"P", "Q", "R", "S", "T", "U", "V", "W",
"X", "Y", "Z", "[", "\\", "]", "^", "_",
"`", "a", "b", "c", "d", "e", "f", "g",
"h", "i", "j", "k", "l", "m", "n", "o",
"p", "q", "r", "s", "t", "u", "v", "w",
"x", "y", "z", "{", "|", "}", "~", "\x7F",
"\u2221", "", "\u2207", "\u221A", "\u222B", "\u03A3", "\u25B6", "\u03C0",
"\u2202", "\u2264", "\u2265", "\u2260", "\u03B1", "\u2192", "\u2190", "\u2193",
"\u2191", "\u03B3", "\u03B4", "\u03B5", "\u03B7", "\u03B8", "\u03BB", "\u03C1",
"\u03C3", "\u03C4", "\u03C9", "\u0394", "\u03A0", "\u03A9", "\u25AA", "\u221E",
"\u20AC", "¡", "¢", "£", "¤", "¥", "¦", "§",
"¨", "©", "ª", "«", "¬", "­", "®", "¯",
"°", "±", "²", "³", "´", "µ", "¶", "·",
"¸", "¹", "º", "»", "¼", "½", "¾", "¿",
"À", "Á", "Â", "Ã", "Ä", "Å", "Æ", "Ç",
"È", "É", "Ê", "Ë", "Ì", "Í", "Î", "Ï",
"Ð", "Ñ", "Ò", "Ó", "Ô", "Õ", "Ö", "×",
"Ø", "Ù", "Ú", "Û", "Ü", "Ý", "Þ", "ß",
"à", "á", "â", "ã", "ä", "å", "æ", "ç",
"è", "é", "ê", "ë", "ì", "í", "î", "ï",
"ð", "ñ", "ò", "ó", "ô", "õ", "ö", "÷",
"ø", "ù", "ú", "û", "ü", "ý", "þ", "ÿ"
]

// Conversão PC -> HP
// Valores inexistentes são inválidos
Compilador.mapaPC2HP = (function () {
	var i, retorno = {
		"\u2211": 133,
		"\u2206": 155,
		"\u220F": 156,
		"\u2126": 157
	}
	for (i in Compilador.mapaHP2PC)
		retorno[Compilador.mapaHP2PC[i]] = Number(i)
	return retorno
})()

// Conversão tri-graphs
// Para sanitizar completamente a str é preciso retirar caracteres não presentes no mapaPC2HP
Compilador.triGraphs = {
	"\\\\028": "\u21D0",
	"\\\\029": "\u25A0",
	"\\\\030": "\u2026",
	"\\\\031": "\u2026",
	"\\\\<\\)": "\u2221",
	"\\\\x-": "x\u0305",
	"\\\\\\.V": "\u2207",
	"\\\\v/": "\u221A",
	"\\\\\\.S": "\u222B",
	"\\\\GS": "\u03A3",
	"\\\\\\|>": "\u25B6",
	"\\\\pi": "\u03C0",
	"\\\\\\.d": "\u2202",
	"\\\\<=": "\u2264",
	"\\\\>=": "\u2265",
	"\\\\=/": "\u2260",
	"\\\\Ga": "\u03B1",
	"\\\\->": "\u2192",
	"\\\\<-": "\u2190",
	"\\\\\\|v": "\u2193",
	"\\\\\\|\\^": "\u2191",
	"\\\\Gg": "\u03B3",
	"\\\\Gd": "\u03B4",
	"\\\\Ge": "\u03B5",
	"\\\\Gn": "\u03B7",
	"\\\\Gh": "\u03B8",
	"\\\\Gl": "\u03BB",
	"\\\\Gr": "\u03C1",
	"\\\\Gs": "\u03C3",
	"\\\\Gt": "\u03C4",
	"\\\\Gw": "\u03C9",
	"\\\\GD": "\u0394",
	"\\\\PI": "\u03A0",
	"\\\\GW": "\u03A9",
	"\\\\\\[\\]": "\u25AA",
	"\\\\oo": "\u221E",
	"\\\\160": "\u20AC",
	"\\\\<<": "«",
	"\\\\\\^o": "°",
	"\\\\Gm": "µ",
	"\\\\>>": "»",
	"\\\\\\.x": "×",
	"\\\\0/": "Ø",
	"\\\\Gb": "ß",
	"\\\\:-": "÷",
	"\\\\(\\d\\d\\d)": function (match, num) {
		return Compilador.mapaHP2PC[Number(num)]
	}
}
