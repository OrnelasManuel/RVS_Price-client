import Axios from "axios";
import { useState, useEffect } from "react";
import Banner_Topo from "../../components/Banner_Topo";
import Inserir_Etiqueta_Do_Mercado from "../../components/Ferramentas/Inserir_Etiqueta_Do_Mercado";
import Estrelas_Do_Produto_Teste from "../../components/Ferramentas/Estrelas_Do_Produto_Veridicacao";

import "./style.css";

export default function Remocao_Produto() {
  const [Produtos_Encontrados_Do_Mercado, setProdutos_Encontrados_Do_Mercado] =
    useState();

  useEffect(() => {
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
        setProdutos_Encontrados_Do_Mercado(Resposta.data.produtos_achados);
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
              setProdutos_Encontrados_Do_Mercado(
                Resposta.data.produtos_achados,
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
                  setProdutos_Encontrados_Do_Mercado(
                    Resposta.data.produtos_achados,
                  );
                });
              }
            });
        }
      });
  }, []);

  return (
    <>
      <Banner_Topo />

      <div>
        <h2 className="Nome_Da_Categoria_Do_Produto_Para_Correcao_De_Cor">
          Produtos no Sistema
        </h2>
        <div className="Produtos Produtos_No_Sistema_Pesquisa">
          {Produtos_Encontrados_Do_Mercado ? (
            Produtos_Encontrados_Do_Mercado.map((Categoria) => {
              console.log(Categoria);

              return (
                <div
                  className={
                    "Produto_" +
                    Categoria.Id_Produtos +
                    " Produto_Individual_Estilo_Generalizado"
                  }
                  key={Categoria.Nome}
                >
                  <div className="Div_Logo_Imagem_Nome_Preco_Avaliacao_Do_Produto">
                    {Inserir_Etiqueta_Do_Mercado(
                      Categoria.Mercado,
                      "Logo_Mercado_Produtos_Home",
                    )}
                    <div className="Div_De_Imagem_Do_Produto_Home">
                      <img
                        src={Categoria.Imagem}
                        className="Imagem_Do_Produto_Home"
                        alt={"Produto " + Categoria.Nome}
                        loading="lazy"
                      />
                    </div>
                    <p className="Nome_Do_Produto">{Categoria.Nome}</p>
                    <p className="Preco_Do_Produto">{Categoria.Preco}</p>
                    {Estrelas_Do_Produto_Teste(Math.floor(Math.random() * 6))}
                  </div>
                  <div className="Div_Do_Botao_De_Carrinho">
                    <button
                      className="Botao_De_Adicao_De_Produto_No_Carrinho"
                      onClick={() => {
                        Axios.post(
                          // "https://rvsprice-server.vercel.app/pesquisa-categoria-produto",
                          // "http://localhost:5000/pesquisa-categoria-produto",
                          "https://rvspriceserver.serveo.net/remocao-de-produto",
                          { Id_Para_Remocao: Categoria.Id_Produtos },
                          {
                            headers: {
                              "Content-Type": "application/json",
                            },
                          },
                        )
                          .then((Resposta) => {
                            if (
                              Resposta.data.produtos_achados.affectedRows > 0
                            ) {
                              alert("Produto removido");
                              window.location.reload();
                            }
                          })
                          .catch((error) => {
                            if (error.code == "ERR_NETWORK") {
                              Axios.post(
                                "https://5wz5p2ht-5000.brs.devtunnels.ms/remocao-de-produto",
                                { Id_Para_Remocao: Categoria.Id_Produtos },
                                {
                                  headers: {
                                    "Content-Type": "application/json",
                                  },
                                },
                              )
                                .then((Resposta) => {
                                  if (
                                    Resposta.data.produtos_achados
                                      .affectedRows > 0
                                  ) {
                                    alert("Produto removido");
                                    window.location.reload();
                                  }
                                })
                                .catch((secund_error) => {
                                  if (secund_error.code == "ERR_NETWORK") {
                                    Axios.post(
                                      "https://5wz5p2ht-5000.brs.devtunnels.ms/remocao-de-produto",
                                      {
                                        Id_Para_Remocao: Categoria.Id_Produtos,
                                      },
                                      {
                                        headers: {
                                          "Content-Type": "application/json",
                                        },
                                      },
                                    ).then((Resposta) => {
                                      if (
                                        Resposta.data.produtos_achados
                                          .affectedRows > 0
                                      ) {
                                        alert("Produto removido");
                                        window.location.reload();
                                      }
                                    });
                                  }
                                });
                            }
                          });
                      }}
                    >
                      Remover
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <h3>Carregando produtos...</h3>
          )}
        </div>
      </div>
    </>
  );
}
