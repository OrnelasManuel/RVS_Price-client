import Axios from "axios";
import Inserir_Etiqueta_Do_Mercado from "../Ferramentas/Inserir_Etiqueta_Do_Mercado";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

import Logo from "../../img/RVS_Price.webp";
import Lupa from "../../img/Lupa.webp";
import Login from "./Login";

export default function Barra_De_Pesquisa() {
  const url = useNavigate();
  const location = useLocation();

  const [Texto_Digitado_Para_Pesquisa, setTexto_Digitado_Para_Pesquisa] =
    useState("");
  const [Produtos_Catalogados_Achados, setProdutos_Catalogados_Achados] =
    useState([]);
  const [
    Visualizacao_De_Itens_Correspondentes,
    setVisualizacao_De_Itens_Correspondentes,
  ] = useState(false);

  useEffect(() => {
    Enviar_Dados_De_Cadastro_Para_Servidor();
  }, []);

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
      })
      .catch((error) => {
        if (error.code == "ERR_NETWORK") {
          Axios.post(
            "https://willing-catfish-proven.ngrok-free.app/produtos-cadastrados",
            {
              headers: {
                "Content-Type": "application/json",
              },
            },
          )
            .then((Resposta) => {
              setProdutos_Catalogados_Achados(Resposta.data.produtos_achados);
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
                });
              }
            });
        }
      });
  };
  //#endregion

  return (
    <div className="Barra_De_Pesquisa_Logo_Pesquisa">
      {Cookies.get("Pagina_De_Mercado") ? (
        <img
          src={Inserir_Etiqueta_Do_Mercado(
            Cookies.get("Pagina_De_Mercado"),
            "",
            "Site",
          )}
          className="Logo_Site"
          alt="Logo do Mercado"
          onClick={() => {
            url("/");
          }}
        />
      ) : (
        <img
          src={Logo}
          className="Logo_Site"
          onClick={() => {
            url("/");
          }}
          alt="Logo do Site"
        />
      )}
      <div className="Conjunto_Barra_De_Pesquisa_Com_Escolhas">
        <input
          type="text"
          value={Texto_Digitado_Para_Pesquisa}
          onChange={(e) => {
            setTexto_Digitado_Para_Pesquisa(e.target.value);
            Cookies.set(
              "Valor_Da_Pesquisa_Digitado",
              e.target.value.replace(/ /g, "---"),
              {
                expires: 10,
              },
            );
          }}
          autoComplete="off"
          list="Produtos_Catalogados"
          placeholder="Buscar produtos, mercados, e muito mais"
          className="Pesquisa"
          onFocus={() => {
            setVisualizacao_De_Itens_Correspondentes(true);
          }}
          onBlur={() => {
            setVisualizacao_De_Itens_Correspondentes(false);
          }}
          onKeyDown={(e) => {
            if (e.key == "Enter" && Texto_Digitado_Para_Pesquisa) {
              if (location.pathname == "/resultados-obtidos") {
                window.location.reload();
              }
              url("/resultados-obtidos");
            }
          }}
          id="Input_De_Pesquisa"
        />
        {Visualizacao_De_Itens_Correspondentes && (
          <div className="Resultados_A_Escolher_Conjunto">
            {Produtos_Catalogados_Achados.map((item, index) => {
              if (
                item.Nome.normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .toLowerCase()
                  .includes(
                    Texto_Digitado_Para_Pesquisa.normalize("NFD")
                      .replace(/[\u0300-\u036f]/g, "")
                      .toLowerCase(),
                  )
              ) {
                return (
                  <p
                    key={item + index}
                    className="Item_Do_Resultado_Da_Busca"
                    onMouseDown={() => {
                      setTexto_Digitado_Para_Pesquisa(item.Nome);
                      Cookies.set(
                        "Valor_Da_Pesquisa_Digitado",
                        item.Nome.replace(/ /g, "---"),
                        {
                          expires: 10,
                        },
                      );

                      setTimeout(() => {
                        if (location.pathname == "/resultados-obtidos") {
                          window.location.reload();
                        }
                        url("/resultados-obtidos");
                      }, 500);
                    }}
                  >
                    <span className="Controle_De_Imagem_De_Pesquisa">
                      {Inserir_Etiqueta_Do_Mercado(
                        item.Mercado,
                        "Logo_Mercado_Resultados",
                      )}
                      <img
                        src={item.Imagem}
                        className="Imagem_do_Produto_no_Resultado"
                      />
                    </span>
                    {item.Nome}
                  </p>
                );
              }
            })}
          </div>
        )}
      </div>
      <img
        src={Lupa}
        className="Img_Lupa"
        onClick={() =>
          Texto_Digitado_Para_Pesquisa
            ? location.pathname == "/resultados-obtidos"
              ? window.location.reload()
              : url("/resultados-obtidos")
            : alert("Pesquisa vazia")
        }
        alt="Lupa de pesquisa"
      />
      <Login />
    </div>
  );
}
