CREATE DATABASE conecta_talent;

USE conecta_talent;

CREATE TABLE usuario(
	id_usuario INT NOT NULL AUTO_INCREMENT, 
    email VARCHAR(254) NOT NULL UNIQUE, 
    senha VARCHAR(255) NOT NULL, 
    tipo_usuario ENUM('Candidato', 'Recrutador', 'Administrador', 'Empresa') NOT NULL,
    data_registro DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    ativo BOOLEAN NOT NULL DEFAULT TRUE,
    
    PRIMARY KEY(id_usuario)
);

SELECT * FROM usuario;

CREATE TABLE empresa(
	id_empresa INT NOT NULL AUTO_INCREMENT,
    razao_social VARCHAR(255) NOT NULL, 
    porte_empresa ENUM('MEI', 'ME', 'EPP', 'Médio Porte', 'Grande Porte') NOT NULL,
    tipo_empresa VARCHAR(100) NOT NULL, -- ramo de atuação ex: supermercado,lojista
    id_usuario INT NOT NULL UNIQUE, 
    
    PRIMARY KEY(id_empresa),
    FOREIGN KEY(id_usuario) REFERENCES usuario(id_usuario)
);

SELECT * FROM empresa;

CREATE TABLE endereco(
		id_endereco INT NOT NULL AUTO_INCREMENT, 
        logradouro VARCHAR(150) NOT NULL, 
        numero VARCHAR(10) NOT NULL, 
        complemento VARCHAR(100), 
        bairro VARCHAR(100) NOT NULL, 
        cidade VARCHAR(100) NOT NULL, 
        estado CHAR(2) NOT NULL, 
        cep CHAR(9) NOT NULL, 
        PRIMARY KEY(id_endereco)
);

SELECT * FROM endereco;


CREATE TABLE unidade(
	id_unidade INT NOT NULL AUTO_INCREMENT, 
    cnpj VARCHAR(18) NOT NULL UNIQUE, -- contando com sinais
    nome_fantasia VARCHAR(150) NOT NULL, 
    tipo_estabelecimento ENUM('Matriz', 'Filial') NOT NULL,
    id_empresa INT NOT NULL, 
    id_endereco INT NOT NULL,
    
    PRIMARY KEY(id_unidade), 
    FOREIGN KEY(id_empresa) REFERENCES empresa(id_empresa),
    FOREIGN KEY(id_endereco) REFERENCES endereco(id_endereco)
);

SELECT * FROM endereco;

CREATE TABLE recrutador(
	id_recrutador INT NOT NULL AUTO_INCREMENT, 
    nome varchar(150) NOT NULL, 
    cargo VARCHAR(100) NOT NULL, 
    id_usuario INT NOT NULL UNIQUE, 
    id_empresa INT NOT NULL, 
    
    PRIMARY KEY(id_recrutador), 
    FOREIGN KEY(id_usuario) REFERENCES usuario(id_usuario),
    FOREIGN KEY(id_empresa) REFERENCES empresa(id_empresa)
);

SELECT * FROM recrutador;

CREATE TABLE vaga(
	id_vaga INT NOT NULL AUTO_INCREMENT, 
    titulo_vaga VARCHAR(150) NOT NULL, 
    descricao VARCHAR(1000) NOT NULL, 
    tipo_contrato VARCHAR(50) NOT NULL, 
    modalidade VARCHAR(30) NOT NULL, 
    carga_horaria VARCHAR(30) NOT NULL, 
    requisito VARCHAR(1000) NOT NULL, 
    data_abertura DATE NOT NULL, 
    data_encerramento DATE NOT NULL, 
    quantidade_vagas INT NOT NULL, 
    remuneracao DECIMAL(10,2) NOT NULL,
    status_vaga VARCHAR(20) NOT NULL, 
    data_atualizacao DATETIME NOT NULL, 
    data_registro DATETIME NOT NULL,
    id_unidade INT, 
    id_recrutador INT,
    
    PRIMARY KEY(id_vaga),
    
    FOREIGN KEY (id_unidade) REFERENCES unidade(id_unidade),
    FOREIGN KEY (id_recrutador) REFERENCES recrutador(id_recrutador)
);

SELECT * FROM vaga;

CREATE TABLE administrador(
		id_administrador INT NOT NULL AUTO_INCREMENT,
        nome VARCHAR(150) NOT NULL, 
        id_usuario INT NOT NULL,
        
        PRIMARY KEY(id_administrador), 
        
        FOREIGN KEY(id_usuario) REFERENCES usuario(id_usuario)
	);
    
    SELECT * FROM administrador;
    
    CREATE TABLE telefone(
			id_telefone INT NOT NULL, 
            ddi VARCHAR(3) NOT NULL, 
            ddd VARCHAR(2) NOT NULL, 
            numero VARCHAR(9) NOT NULL, 
            
            PRIMARY KEY(id_telefone)
		);
        
        SELECT * FROM telefone;
        
        CREATE TABLE usuario_telefone(
					id_usuario INT NOT NULL,
					id_telefone INT NOT NULL,
					tipo_telefone VARCHAR(20) NOT NULL,

					PRIMARY KEY (id_usuario, id_telefone),

					FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),

					FOREIGN KEY (id_telefone) REFERENCES telefone(id_telefone)
        );
        
		SELECT * FROM usuario_telefone;
        
        CREATE TABLE candidato(
				id_candidato INT NOT NULL AUTO_INCREMENT, 
                nome VARCHAR(150) NOT NULL, 
                cpf VARCHAR(11) NOT NULL, 
                data_nascimento DATE NOT NULL, 
                linkedin VARCHAR(255), 
                url_portfolio VARCHAR(255), 
                id_usuario INT NOT NULL,
                id_endereco INT, 
                
				PRIMARY KEY(id_candidato), 
                
                FOREIGN KEY(id_usuario) REFERENCES usuario(id_usuario), 
                FOREIGN KEY(id_endereco) REFERENCES endereco(id_endereco)
        );
        
        SELECT * FROM candidato;
        
        CREATE TABLE curriculo(
				id_curriculo INT NOT NULL AUTO_INCREMENT,
                nome_curriculo VARCHAR(150) NOT NULL, 
                data_atualizacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, 
                status_salvo VARCHAR(20),
                caminho_arquivo VARCHAR(255),
                resumo_profissional TEXT, 
                data_criacao DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
                id_candidato INT NOT NULL, 
                
                 PRIMARY KEY(id_curriculo),
                 
                 FOREIGN KEY(id_candidato) REFERENCES candidato(id_candidato)
        );
        
	
        CREATE TABLE candidatura(
				id_candidatura INT NOT NULL AUTO_INCREMENT,
                data_candidatura DATETIME NOT NULL,
				status_candidatura VARCHAR(30) NOT NULL,
				pretensao_salarial DECIMAL(10,2),
				disponibilidade VARCHAR(50) NOT NULL,
                id_candidato INT NOT NULL,
				id_vaga INT NOT NULL,
				id_curriculo INT NOT NULL,
                
                PRIMARY KEY(id_candidatura),
                
                UNIQUE(id_candidato, id_vaga),
                
                FOREIGN KEY(id_candidato) REFERENCES candidato(id_candidato),
                FOREIGN KEY(id_vaga) REFERENCES vaga(id_vaga), 
                FOREIGN KEY(id_curriculo) REFERENCES curriculo(id_curriculo)

        );
        
        CREATE TABLE formacao(
				id_formacao INT NOT NULL AUTO_INCREMENT, 
                descricao_formacao VARCHAR(150) NOT NULL, 
                data_inicio DATE NOT NULL, 
                data_fim DATE, 
                curso VARCHAR(150) NOT NULL, 
                nivel VARCHAR(50) NOT NULL,
                instituicao VARCHAR(150) NOT NULL, 
                status_formacao ENUM('Em andamento', 'Concluído', 'Trancado') NOT NULL, 
                id_candidato INT NOT NULL, 
                
                PRIMARY KEY(id_formacao),
                
                FOREIGN KEY(id_candidato) REFERENCES candidato(id_candidato)
        
        );
        
        CREATE TABLE experiencia_profissional(
					id_experiencia INT NOT NULL AUTO_INCREMENT,
					id_candidato INT NOT NULL,
					descricao_experiencia TEXT,
					data_inicio DATE NOT NULL,
					data_fim DATE,
					cargo VARCHAR(100) NOT NULL,
					empresa VARCHAR(150) NOT NULL,
					emprego_atual BOOLEAN NOT NULL,

					PRIMARY KEY(id_experiencia),

					FOREIGN KEY(id_candidato)
					REFERENCES candidato(id_candidato)
);

CREATE TABLE habilidade(
			id_habilidade INT NOT NULL AUTO_INCREMENT, 
            nome_habilidade VARCHAR(100) NOT NULL,
            nivel ENUM('Básico', 'Intermediário', 'Avançado', 'Especialista') NOT NULL, 
            id_candidato INT NOT NULL,
            
            PRIMARY KEY (id_habilidade),
            FOREIGN KEY (id_candidato) REFERENCES candidato(id_candidato)
);

CREATE TABLE certificado(
    id_certificado INT NOT NULL AUTO_INCREMENT,
    carga_horaria INT NOT NULL,
    nome_certificado VARCHAR(150) NOT NULL,
    instituicao VARCHAR(150) NOT NULL,
    data_emissao DATE NOT NULL,
    codigo_validacao VARCHAR(100),
    url_validacao VARCHAR(255),
    id_candidato INT NOT NULL,

    PRIMARY KEY (id_certificado),
    FOREIGN KEY (id_candidato) REFERENCES candidato(id_candidato)
);

CREATE TABLE idioma(
    id_idioma INT NOT NULL AUTO_INCREMENT,
    id_candidato INT NOT NULL,
    nome VARCHAR(100) NOT NULL,
    proficiencia ENUM(
        'Básico',
        'Intermediário',
        'Avançado',
        'Fluente',
        'Nativo'
    ) NOT NULL,

    PRIMARY KEY (id_idioma),
    FOREIGN KEY (id_candidato) REFERENCES candidato(id_candidato)
);

        
       
        
        
        
        
        
        
    
        
        








