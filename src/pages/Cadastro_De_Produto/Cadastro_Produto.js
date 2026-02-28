//#region Importações de estilização
import "./style.css";
import "./Estilo_Responsivo_Geral.css";
//#endregion

//#region Importações de imagem
import Sem_Imagem from "../../img/Sem_Imagem.webp";
//#endregion

//#region Importações de bibliotecas
import Axios from "axios";
import Cookies from "js-cookie";
import React, { useState, useEffect, useRef } from "react";
//#endregion

//#region Importações de componentes
import Inserir_Etiqueta_Do_Mercado from "../../components/Ferramentas/Inserir_Etiqueta_Do_Mercado";
import Opcoes_De_Cadastro_De_Mercados from "../../components/Opcoes_De_Cadastro_De_Mercados";
//#endregion

export default function Cadastro_Produto() {
  var Dados_Cadastrados = {};

  //#region Envio de cadastro para o servidor
  function Enviar_Dados_De_Cadastro_Para_Servidor() {
    setTimeout(() => {
      console.log(Dados_Cadastrados);

      Axios.post(
        // "https://rvsprice-server.vercel.app/cadastrar",
        // "http://localhost:5000/cadastrar",
        "https://rvspriceserver.serveo.net/cadastrar",
        Dados_Cadastrados,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
        .then((Resposta) => {
          if (Resposta.data.cadastro_realizado) {
            alert("Cadastrado com sucesso");
          } else {
            alert("Falha no cadastro");
            if (Resposta.data.imagem) {
              console.error("imagem: " + Resposta.data.imagem);
            } else if (Resposta.data.nome) {
              console.error("nome: " + Resposta.data.nome);
            } else if (Resposta.data.valor) {
              console.error("valor: " + Resposta.data.valor);
            } else if (Resposta.data.mercado) {
              console.error("mercado: " + Resposta.data.mercado);
            } else if (Resposta.data.categoria) {
              console.error("categoria: " + Resposta.data.categoria);
            }
          }
        })
        .catch((error) => {
          if (error.code == "ERR_NETWORK") {
            Axios.post(
              "https://5wz5p2ht-5000.brs.devtunnels.ms/cadastrar",
              Dados_Cadastrados,
              {
                headers: {
                  "Content-Type": "application/json",
                },
              },
            )
              .then((Resposta) => {
                if (Resposta.data.cadastro_realizado) {
                  alert("Cadastrado com sucesso");
                } else {
                  alert("Falha no cadastro");
                  if (Resposta.data.imagem) {
                    console.error("imagem: " + Resposta.data.imagem);
                  } else if (Resposta.data.nome) {
                    console.error("nome: " + Resposta.data.nome);
                  } else if (Resposta.data.valor) {
                    console.error("valor: " + Resposta.data.valor);
                  } else if (Resposta.data.mercado) {
                    console.error("mercado: " + Resposta.data.mercado);
                  } else if (Resposta.data.categoria) {
                    console.error("categoria: " + Resposta.data.categoria);
                  }
                }
              })
              .catch((secund_error) => {
                if (secund_error.code == "ERR_NETWORK") {
                  Axios.post(
                    "https://5wz5p2ht-5000.brs.devtunnels.ms/cadastrar",
                    Dados_Cadastrados,
                    {
                      headers: {
                        "Content-Type": "application/json",
                      },
                    },
                  ).then((Resposta) => {
                    if (Resposta.data.cadastro_realizado) {
                      alert("Cadastrado com sucesso");
                    } else {
                      alert("Falha no cadastro");
                      if (Resposta.data.imagem) {
                        console.error("imagem: " + Resposta.data.imagem);
                      } else if (Resposta.data.nome) {
                        console.error("nome: " + Resposta.data.nome);
                      } else if (Resposta.data.valor) {
                        console.error("valor: " + Resposta.data.valor);
                      } else if (Resposta.data.mercado) {
                        console.error("mercado: " + Resposta.data.mercado);
                      } else if (Resposta.data.categoria) {
                        console.error("categoria: " + Resposta.data.categoria);
                      }
                    }
                  });
                }
              });
          }
        });
    }, 1000);
  }
  //#endregion

  //#region Referencias de Inputs
  const Input_De_Referencia_Imagem = useRef(null);
  const Input_De_Referencia_Nome_Produto = useRef(null);
  const Input_De_Referencia_Valor = useRef(null);
  const Input_De_Referencia_Mercado = useRef(null);
  const Input_De_Referencia_Categoria = useRef(null);
  const Input_De_Referencia_Informacoes = useRef(null);
  const Input_De_Referencia_Outros_Nomes = useRef(null);
  //#endregion

  //#region Obtendo valores anteriores
  var Imagem_Escolhido = localStorage.getItem("Imagem_Produto");
  var Nome_Escolhido = Cookies.get("Nome_Produto");
  var Valor_Escolhido = Cookies.get("Valor_Produto");
  var Mercado_Escolhido = Cookies.get("Nome_Mercado");
  var Categoria_Escolhido = Cookies.get("Categoria");
  var Informacoes_Escolhido = Cookies.get("Informacoes_Adicionais");
  var Outros_Nomes_Escolhido = Cookies.get("Outros_Nomes");
  //#endregion

  //#region Definindo o valor de Valor_Escolhido para R$ se for undefined
  if (Valor_Escolhido == "undefined") {
    Valor_Escolhido = "R$";
  }
  //#endregion

  //#region Criando variaveis para receber os valores dos inputs
  const [Imagem_Produto, setImagem_Produto] = useState(
    Imagem_Escolhido ? Imagem_Escolhido : Sem_Imagem,
  );
  const [Nome_Produto, setNome_Produto] = useState(
    Nome_Escolhido ? Nome_Escolhido : "",
  );
  const [Valor_Produto, setValor_Produto] = useState(
    Valor_Escolhido ? Valor_Escolhido : "R$",
  );
  const [Nome_Mercado, setNome_Mercado] = useState(
    Mercado_Escolhido ? Mercado_Escolhido : "",
  );
  const [Categoria, setCategoria] = useState(
    Categoria_Escolhido ? Categoria_Escolhido : "",
  );
  const [Informacoes_Adicionais, setInformacoes_Adicionais] = useState(
    Informacoes_Escolhido ? Informacoes_Escolhido : "",
  );
  const [Outros_Nomes, setOutros_Nomes] = useState(
    Outros_Nomes_Escolhido ? Outros_Nomes_Escolhido : "",
  );
  //#endregion

  //#region Atualização de Cookies e localStorage
  useEffect(() => {
    localStorage.setItem("Imagem_Produto", Imagem_Produto);
  }, [Imagem_Produto]);

  useEffect(() => {
    Cookies.set("Nome_Produto", Nome_Produto, { expires: 30 });
  }, [Nome_Produto]);

  useEffect(() => {
    Cookies.set("Valor_Produto", Valor_Produto, { expires: 30 });
  }, [Valor_Produto]);

  useEffect(() => {
    Cookies.set("Nome_Mercado", Nome_Mercado, { expires: 30 });
  }, [Nome_Mercado]);

  useEffect(() => {
    Cookies.set("Categoria", Categoria, { expires: 30 });
  }, [Categoria]);

  useEffect(() => {
    Cookies.set("Informacoes_Adicionais", Informacoes_Adicionais, {
      expires: 30,
    });
  }, [Informacoes_Adicionais]);

  useEffect(() => {
    Cookies.set("Outros_Nomes", Outros_Nomes, { expires: 30 });
  }, [Outros_Nomes]);
  //#endregion

  //#region Conversor de Arquivo base64 do tipo png para WebP(Recomendado pelo Google)
  function Conversor_De_Base_64_Png_Para_WebP(Base64_Recebida) {
    return new Promise((resolve, reject) => {
      var Imagem_Com_Base_64_Png = new Image();
      Imagem_Com_Base_64_Png.src = Base64_Recebida;

      Imagem_Com_Base_64_Png.onload = () => {
        var Elemento_Canva_No_Document = document.createElement("canvas");
        Elemento_Canva_No_Document.width = Imagem_Com_Base_64_Png.width;
        Elemento_Canva_No_Document.height = Imagem_Com_Base_64_Png.height;

        var Desenho_No_Canva_2d = Elemento_Canva_No_Document.getContext("2d");
        Desenho_No_Canva_2d.drawImage(Imagem_Com_Base_64_Png, 0, 0);

        var WebP_Imagem_Url =
          Elemento_Canva_No_Document.toDataURL("image/webp");
        resolve(WebP_Imagem_Url);
      };

      Imagem_Com_Base_64_Png.onerror = (error) => {
        reject(error);
      };
    });
  }
  //#endregion

  //#region Função de envio e limpeza de cadastro
  const Envio_E_Limpeza_De_Cadastro = () => {
    if (
      !Imagem_Produto ||
      Imagem_Produto == "/static/media/Sem_Imagem.60408411369fbfea2d38.webp"
    ) {
      alert("Está faltando colocar a imagem");
      Input_De_Referencia_Imagem.current.click();
      return;
    }
    if (!Nome_Produto) {
      alert("Está faltando colocar o nome");
      Input_De_Referencia_Nome_Produto.current.focus();
      return;
    }
    if (!Valor_Produto || Valor_Produto == "R$") {
      alert("Está faltando colocar o preço");
      Input_De_Referencia_Valor.current.focus();
      return;
    }
    if (!Nome_Mercado) {
      alert("Está faltando selecionar o mercado");
      Input_De_Referencia_Mercado.current.focus();
      return;
    }
    if (!Categoria) {
      alert("Está faltando selecionar a categoria");
      Input_De_Referencia_Categoria.current.focus();
      return;
    }

    var Valor_Produto_Formatado = Testador_De_Casas_Decimais(Valor_Produto);

    Conversor_De_Base_64_Png_Para_WebP(Imagem_Produto).then(
      (WebP_Imagem_Url) => {
        Dados_Cadastrados = {
          WebP_Imagem_Url,
          Nome_Produto,
          Valor_Produto_Formatado,
          Nome_Mercado,
          Categoria,
          Informacoes_Adicionais,
          Outros_Nomes,
        };
      },
    );

    Mercado_Escolhido = undefined;
    setImagem_Produto(Sem_Imagem);
    setNome_Produto("");
    setValor_Produto("R$");
    setNome_Mercado("");
    setCategoria("");
    setInformacoes_Adicionais("");
    setOutros_Nomes("");
    Produto_Cadastrado = true;

    Enviar_Dados_De_Cadastro_Para_Servidor();
  };
  //#endregion

  //#region Função que testa se existem casas decimais
  const Testador_De_Casas_Decimais = (Valores) => {
    var Valores_Sem_Texto;

    if (Valores == "R$" || Valores == "R" || Valores === undefined) {
      return;
    } else if (Valores.includes("R$")) {
      Valores_Sem_Texto = Valores.replace("R$", "");
    }

    if (Valores_Sem_Texto === NaN || Valores_Sem_Texto == "NaN") {
      return;
    }

    var Valores_Com_Ponto = Valores_Sem_Texto;

    if (Valores.includes(",")) {
      Valores_Com_Ponto = Valores_Sem_Texto.replace(",", ".");
    }

    if (Valores_Com_Ponto === NaN || Valores_Com_Ponto == "NaN") {
      return;
    }

    var Valores_Em_Formato_Numerico = parseFloat(Valores_Com_Ponto);

    var Valores_Final_Com_Decimal = Valores_Em_Formato_Numerico.toFixed(2);

    if (
      Valores_Final_Com_Decimal === NaN ||
      Valores_Final_Com_Decimal == "NaN"
    ) {
      return;
    } else {
      return "R$" + Valores_Final_Com_Decimal.replace(".", ",");
    }
  };

  //#endregion

  //#region Criando um leitor de arquivos para converter input file para imagem
  const Leitor_De_File = new FileReader();
  //#endregion

  //#region Configurações da pré vizualização de cadastro
  var Produto_Cadastrado = false;
  var Imagem_Produto_Pre_Cadastro =
    Imagem_Produto !== "/static/media/Sem_Imagem.60408411369fbfea2d38.webp"
      ? Imagem_Produto
      : "";

  //#endregion

  //#region Excluir produto pré cadastrado
  const Excluir_Pre_Cadastro = () => {
    Mercado_Escolhido = false;
    setImagem_Produto(Sem_Imagem);
    setNome_Produto("");
    setValor_Produto("R$");
    setNome_Mercado("");
    setCategoria("");
    setInformacoes_Adicionais("");
    setOutros_Nomes("");
  };
  //#endregion

  //#region Retorno em JSX
  return (
    <>
      <div className="Controle_De_Tamanho">
        <div className="Painel_Pre_Cadastro">
          <h1>Vizualização de pré cadastro</h1>
          <div
            className="Pre_Produto_Cadastrado_Informacoes"
            title={
              Informacoes_Adicionais !== ""
                ? Informacoes_Adicionais
                : "Sem informações adicionais"
            }
          >
            <img
              src={Imagem_Produto_Pre_Cadastro}
              className="Imagem_Do_Pre_Produto_Cadastrado"
              alt="Imagem do produto pre cadastrado"
              loading="lazy"
            />
            {Inserir_Etiqueta_Do_Mercado(
              Nome_Mercado,
              "Logo_Mercado_Pre_Cadastro",
            )}
            <h3 className="Nome_Do_Pre_Produto_Cadastrado">{Nome_Produto}</h3>
            <p className="Valor_Do_Pre_Produto_Cadastrado">
              {Valor_Produto !== "R$" ? Valor_Produto : ""}
            </p>
          </div>
        </div>

        <div className="Painel">
          <h1 style={{ textAlign: "center" }}>Cadastre o Produto</h1>
          <div>
            <div className="Caixa_De_Input_De_Imagem">
              <p className="Input_De_Imagem_Borda"></p>
              <input
                type="file"
                accept="image/*"
                className="Input_De_Imagem"
                id="Input_Imagem_"
                ref={Input_De_Referencia_Imagem}
                onChange={(e) => {
                  Leitor_De_File.onload = () => {
                    setImagem_Produto(Leitor_De_File.result);
                  };

                  if (e.target.files[0]) {
                    Leitor_De_File.readAsDataURL(e.target.files[0]);
                  }
                  setValor_Produto(Testador_De_Casas_Decimais(Valor_Produto));
                }}
              />
            </div>
            <div className="Div_Imagem_Do_Produto">
              <div className="Diminuidor_De_Tamanho">
                <img
                  src={Imagem_Produto}
                  className="Imagem_Do_Produto"
                  alt="Imagem do Produto a Cadastrar"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
          <br />
          <label>Nome: </label>
          <input
            type="text"
            placeholder="Nome Completo"
            value={Nome_Produto}
            ref={Input_De_Referencia_Nome_Produto}
            onChange={(e) => {
              setNome_Produto(e.target.value);
              setValor_Produto(Testador_De_Casas_Decimais(Valor_Produto));
            }}
          />
          <br />
          <label>Preço: </label>
          <input
            type="text"
            placeholder="Preço"
            value={Valor_Produto}
            ref={Input_De_Referencia_Valor}
            onChange={(e) => {
              var Valor_Do_Input_Preco = e.target.value;

              if (Valor_Do_Input_Preco.includes("R$")) {
                setValor_Produto(Valor_Do_Input_Preco);
              } else if (!Valor_Do_Input_Preco.includes("$")) {
                setValor_Produto("R$" + Valor_Do_Input_Preco.replace("R", ""));
              } else {
                setValor_Produto("R$" + Valor_Do_Input_Preco);
              }
              if (Valor_Do_Input_Preco.includes(".")) {
                setValor_Produto(Valor_Do_Input_Preco.replace(".", ","));
              }
            }}
          />
          <br />
          <label>Mercado: </label>
          <select
            value={Nome_Mercado}
            ref={Input_De_Referencia_Mercado}
            onChange={(e) => {
              setNome_Mercado(e.target.value);
              setValor_Produto(Testador_De_Casas_Decimais(Valor_Produto));
            }}
          >
            {!Mercado_Escolhido ? <option value=""></option> : ""}
            <Opcoes_De_Cadastro_De_Mercados />
          </select>
          <br />
          <label>Categoria: </label>
          <input
            type="text"
            placeholder="Categoria"
            value={Categoria}
            ref={Input_De_Referencia_Categoria}
            onChange={(e) => {
              setCategoria(e.target.value);
              setValor_Produto(Testador_De_Casas_Decimais(Valor_Produto));
            }}
          />
          <br />
          <label>Informações adicionais: </label>
          <input
            type="text"
            placeholder="Informações"
            value={Informacoes_Adicionais}
            ref={Input_De_Referencia_Informacoes}
            onChange={(e) => {
              setInformacoes_Adicionais(e.target.value);
              setValor_Produto(Testador_De_Casas_Decimais(Valor_Produto));
            }}
          />
          <br />
          <label>Outros nomes: </label>
          <input
            type="text"
            placeholder="Outros nomes"
            value={Outros_Nomes}
            ref={Input_De_Referencia_Outros_Nomes}
            onChange={(e) => {
              setOutros_Nomes(e.target.value);
              setValor_Produto(Testador_De_Casas_Decimais(Valor_Produto));
            }}
          />

          <button
            className="Botao_De_Cadastro"
            onClick={Envio_E_Limpeza_De_Cadastro}
            aria-label="Cadastrar Produto"
          >
            Cadastrar
          </button>
          <br />
          <button
            onClick={Excluir_Pre_Cadastro}
            aria-label="Excluir dados do produto salvo"
          >
            Excluir
          </button>
        </div>
        {Produto_Cadastrado && (
          <div className="Painel_Ultimo_Cadastro">
            <h1>Ultimo cadastro</h1>
            <div className="Ultimo_Produto_Cadastrado_Informacoes">
              <img
                src={Sem_Imagem}
                className="Imagem_Do_Ultimo_Produto_Cadastrado"
                alt="Imagem do ultimo produto cadastrado"
                loading="lazy"
              />
              <h3 className="Nome_Do_Ultimo_Produto_Cadastrado">
                Nome Produto
              </h3>
              <p className="Valor_Do_Ultimo_Produto_Cadastrado">R$10,00</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
  //#endregion
}
