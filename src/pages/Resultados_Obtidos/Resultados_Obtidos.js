import Axios from "axios";
import Inserir_Etiqueta_Do_Mercado from "../../components/Ferramentas/Inserir_Etiqueta_Do_Mercado";
import Estrelas_Do_Produto_Teste from "../../components/Ferramentas/Estrelas_Do_Produto_Veridicacao";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

import "./style.css";

import Banner_Topo from "../../components/Banner_Topo";

var Primeira_Adicao_Carrinho = 0;

var Boleano_De_Repeticao = true;

export default function Resultados_Obtidos() {
  const [Produtos_Catalogados_Achados, setProdutos_Catalogados_Achados] =
    useState();
  const [Pesquisa_Realizada, setPesquisa_Realizada] = useState();
  const [Pontos_De_Carregamento, setPontos_De_Carregamento] = useState(".");

  useEffect(() => {
    Enviar_Dados_De_Cadastro_Para_Servidor();

    return () => {
      Boleano_De_Repeticao = true;
    };
  }, []);

  useEffect(() => {
    console.log(Produtos_Catalogados_Achados);
    function Funcao_De_Interval() {
      setPontos_De_Carregamento((prev) => {
        console.log(prev.length);

        return prev.length == 3 ? "." : prev + ".";
      });

      if (!Boleano_De_Repeticao) {
        clearInterval(Intervalo_De_Carregamento_De_Pontos);
      }
    }

    const Intervalo_De_Carregamento_De_Pontos = setInterval(
      Funcao_De_Interval,
      500,
    );

    console.log(Produtos_Catalogados_Achados);

    if (Produtos_Catalogados_Achados) {
      console.log("Ativo");

      Boleano_De_Repeticao = false;
    }
  }, [Produtos_Catalogados_Achados]);

  if (localStorage.getItem("Produtos_No_Carrinho")) {
    var Produtos_No_Carrinho_Inicial = JSON.parse(
      localStorage.getItem("Produtos_No_Carrinho"),
    );
  }

  const [Produtos_No_Carrinho, setProdutos_No_Carrinho] = useState([]);

  //#region Adicionar itens ao carrinho
  const Adicionar_Itens_Ao_Carrinho = (Informacoes_Do_Item) => {
    //#region Notificações de carrinho
    var Div_De_Notificacao_De_Carrinho = document.querySelector(
      ".Bola_Que_Informa_Quantos_Produtos_Tem_No_Carrinho",
    );
    var Teste_De_Igualdade = 0;
    var Quantia_De_Produtos_Adicionados_No_Carrinho = Cookies.get(
      "Quantia_De_Produtos_Adicionados_No_Carrinho",
    );
    var Primeira_Execucao_Para_Aviso = true;

    if (Primeira_Adicao_Carrinho == 0) {
      Primeira_Execucao_Para_Aviso = false;

      if (
        Quantia_De_Produtos_Adicionados_No_Carrinho &&
        Quantia_De_Produtos_Adicionados_No_Carrinho !== "undefined" &&
        Quantia_De_Produtos_Adicionados_No_Carrinho !== "NaN"
      ) {
        Div_De_Notificacao_De_Carrinho.style.display = "flex";

        Primeira_Adicao_Carrinho = 1;
        Teste_De_Igualdade = 1;

        if (localStorage.getItem("Produtos_No_Carrinho")) {
          setProdutos_No_Carrinho(Produtos_No_Carrinho_Inicial);
        }

        Div_De_Notificacao_De_Carrinho.innerHTML =
          Quantia_De_Produtos_Adicionados_No_Carrinho;
      } else if (Quantia_De_Produtos_Adicionados_No_Carrinho == "NaN") {
        Cookies.remove("Quantia_De_Produtos_Adicionados_No_Carrinho");
      } else {
        Div_De_Notificacao_De_Carrinho.style.display = "flex";

        Primeira_Adicao_Carrinho = 1;

        Div_De_Notificacao_De_Carrinho.innerHTML = 1;

        Cookies.set("Quantia_De_Produtos_Adicionados_No_Carrinho", 1, {
          expires: 30,
        });
      }
    } else {
      var Itens_No_Carrinho =
        parseFloat(Div_De_Notificacao_De_Carrinho.innerHTML) + 1;

      Cookies.set(
        "Quantia_De_Produtos_Adicionados_No_Carrinho",
        Itens_No_Carrinho,
        { expires: 30 },
      );

      Div_De_Notificacao_De_Carrinho.innerHTML = Itens_No_Carrinho;
    }
    //#endregion

    //#region Itens no carrinho
    if (Produtos_No_Carrinho[0] && Teste_De_Igualdade == 0) {
      Produtos_No_Carrinho.forEach((Produto_Existente) => {
        if (Produto_Existente.Id_Produtos) {
          if (
            Produto_Existente.Id_Produtos == Informacoes_Do_Item.Id_Produtos
          ) {
            Teste_De_Igualdade = 1;
          }
        }
      });
    }

    if (Teste_De_Igualdade == 0) {
      setProdutos_No_Carrinho((prevState) => [
        ...prevState,
        Informacoes_Do_Item,
      ]);
      toast.success("Salvo no carrinho");
    }
    if (Teste_De_Igualdade !== 0 && Primeira_Execucao_Para_Aviso) {
      toast.warn("Item já está no carrinho");
    }

    //#endregion
  };
  //#endregion

  //#region useEffect
  useEffect(() => {
    Primeira_Adicao_Carrinho = 0;

    if (Cookies.get("Quantia_De_Produtos_Adicionados_No_Carrinho")) {
      Adicionar_Itens_Ao_Carrinho();
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "Produtos_No_Carrinho",
      JSON.stringify(Produtos_No_Carrinho),
    );
  }, [Produtos_No_Carrinho]);
  //#endregion

  //#region Pesquisa de produtos cadastrados
  const Enviar_Dados_De_Cadastro_Para_Servidor = () => {
    Axios.post(
      // "https://rvsprice-server.vercel.app/pesquisa-categoria-produto",
      // "http://localhost:5000/pesquisa-categoria-produto",
      "https://rvspriceserver.serveo.net/produtos-cadastrados",
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    )
      .then((Resposta) => {
        setProdutos_Catalogados_Achados(Resposta.data.produtos_achados);

        setPesquisa_Realizada(
          Cookies.get("Valor_Da_Pesquisa_Digitado").replace(/---/g, " "),
        );
      })
      .catch((error) => {
        if (error.code == "ERR_NETWORK") {
          Axios.post(
            "https://5wz5p2ht-5000.brs.devtunnels.ms/produtos-cadastrados",
            {
              headers: {
                "Content-Type": "application/json",
              },
            },
          )
            .then((Resposta) => {
              setProdutos_Catalogados_Achados(Resposta.data.produtos_achados);

              setPesquisa_Realizada(
                Cookies.get("Valor_Da_Pesquisa_Digitado").replace(/---/g, " "),
              );
            })
            .catch((secund_error) => {
              if (secund_error.code == "ERR_NETWORK") {
                Axios.post(
                  "https://5wz5p2ht-5000.brs.devtunnels.ms/produtos-cadastrados",
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  },
                ).then((Resposta) => {
                  setProdutos_Catalogados_Achados(
                    Resposta.data.produtos_achados,
                  );

                  setPesquisa_Realizada(
                    Cookies.get("Valor_Da_Pesquisa_Digitado").replace(
                      /---/g,
                      " ",
                    ),
                  );
                });
              }
            });
        }
      });
  };
  //#endregion

  return (
    <div className="Corpo_Principal_Dos_Resultados">
      <Banner_Topo />
      <div className="Corpo_Dos_Resultados">
        <div className="Titulo_Com_Quantia_De_Itens_Encontrados">
          {Pesquisa_Realizada ? <h1>{Pesquisa_Realizada}</h1> : <span></span>}
          {Pesquisa_Realizada && Produtos_Catalogados_Achados ? (
            <h4>
              Resultados encontrados:{" "}
              <strong>
                {Pesquisa_Realizada
                  ? Produtos_Catalogados_Achados.filter((item) =>
                      item.Nome.normalize("NFD")
                        .replace(/[\u0300-\u036f]/g, "")
                        .toLowerCase()
                        .includes(
                          Pesquisa_Realizada.normalize("NFD")
                            .replace(/[\u0300-\u036f]/g, "")
                            .toLowerCase(),
                        ),
                    ).length
                  : Produtos_Catalogados_Achados.length}
              </strong>
            </h4>
          ) : (
            <span></span>
          )}
        </div>
        <div className="Itens_Obtidos_Da_Busca">
          {Produtos_Catalogados_Achados ? (
            Produtos_Catalogados_Achados.map((item) => {
              if (
                item.Nome.normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .toLowerCase()
                  .includes(
                    Pesquisa_Realizada.normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .toLowerCase(),
                  )
              ) {
                return (
                  <div
                    className={
                      "Produto_" +
                      item.Id_Produtos +
                      " Produto_Individual_Estilo_Generalizado Produto_Dentro_Da_Pesquisa"
                    }
                    key={item.Nome}
                  >
                    <div className="Div_Logo_Imagem_Nome_Preco_Avaliacao_Do_Produto">
                      {Inserir_Etiqueta_Do_Mercado(
                        item.Mercado,
                        "Logo_Mercado_Produtos_Home",
                      )}
                      <div className="Div_De_Imagem_Do_Produto_Home">
                        <img
                          src={item.Imagem}
                          className="Imagem_Do_Produto_Home"
                          alt={"Produto " + item.Nome}
                          loading="lazy"
                        />
                      </div>
                      <p className="Nome_Do_Produto">{item.Nome}</p>
                      <p className="Preco_Do_Produto">{item.Preco}</p>
                      {Estrelas_Do_Produto_Teste(Math.floor(Math.random() * 6))}
                    </div>
                    <div className="Div_Do_Botao_De_Carrinho">
                      <button
                        className="Botao_De_Adicao_De_Produto_No_Carrinho"
                        onClick={() => {
                          Adicionar_Itens_Ao_Carrinho(item);
                        }}
                      >
                        Adicionar ao Carrinho
                      </button>
                    </div>
                  </div>
                );
              } else {
              }
            })
          ) : (
            <p>Carregando{Pontos_De_Carregamento}</p>
          )}
        </div>
      </div>
    </div>
  );
}
