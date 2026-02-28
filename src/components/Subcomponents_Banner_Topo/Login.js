import Axios from "axios";
import React, { useState, useEffect } from "react";

export default function Login() {
  const [Input_User, setInput_User] = useState("");
  const [Input_Senha, setInput_Senha] = useState("");
  const [Visibilidade, setVisibilidade] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setVisibilidade(false);
    } else {
      setVisibilidade(true);
    }
  }, []);

  function Enviar_Dados_Para_Permissao(event) {
    event.preventDefault();

    setInput_User("");
    setInput_Senha("");

    console.log("Verificando Login");

    setTimeout(() => {
      Axios.post(
        // "https://rvsprice-server.vercel.app/validar",
        // "http://localhost:5000/validar",
        "https://rvspriceserver.serveo.net/validar",

        {
          User: Input_User,
          Senha: Input_Senha,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      )
        .then((Resposta) => {
          if (Resposta.data.token) {
            var token = Resposta.data.token;
            localStorage.setItem("token", token);
            setVisibilidade(false);
            window.location.reload();
            alert("Logado com sucesso");
          } else {
            console.log("Erro: " + Resposta);
            console.log(Resposta);
            console.log("Enviados: " + Input_User + " , " + Input_Senha);
            console.log(Resposta.data);
            console.log("Data extratida: " + Resposta.data);
            console.log("Permissão: " + Resposta.data.permitir);
            alert("Falha no login");
          }
        })
        .catch((error) => {
          if (error.code == "ERR_NETWORK") {
            Axios.post(
              "https://willing-catfish-proven.ngrok-free.app/validar",

              {
                User: Input_User,
                Senha: Input_Senha,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              },
            )
              .then((Resposta) => {
                if (Resposta.data.token) {
                  var token = Resposta.data.token;
                  localStorage.setItem("token", token);
                  setVisibilidade(false);
                  window.location.reload();
                  alert("Logado com sucesso");
                } else {
                  console.log("Erro: " + Resposta);
                  console.log(Resposta);
                  console.log("Enviados: " + Input_User + " , " + Input_Senha);
                  console.log(Resposta.data);
                  console.log("Data extratida: " + Resposta.data);
                  console.log("Permissão: " + Resposta.data.permitir);
                  alert("Falha no login");
                }
              })
              .catch((secund_error) => {
                if (secund_error.code == "ERR_NETWORK") {
                  Axios.post(
                    "https://5wz5p2ht-5000.brs.devtunnels.ms/validar",

                    {
                      User: Input_User,
                      Senha: Input_Senha,
                    },
                    {
                      headers: {
                        "Content-Type": "application/json",
                      },
                    },
                  ).then((Resposta) => {
                    if (Resposta.data.token) {
                      var token = Resposta.data.token;
                      localStorage.setItem("token", token);
                      setVisibilidade(false);
                      window.location.reload();
                      alert("Logado com sucesso");
                    } else {
                      console.log("Erro: " + Resposta);
                      console.log(Resposta);
                      console.log(
                        "Enviados: " + Input_User + " , " + Input_Senha,
                      );
                      console.log(Resposta.data);
                      console.log("Data extratida: " + Resposta.data);
                      console.log("Permissão: " + Resposta.data.permitir);
                      alert("Falha no login");
                    }
                  });
                }
              });
          }
        });
    }, 1000);
  }
  return (
    <>
      {Visibilidade && (
        <div className="Login">
          <form>
            <div>
              <label htmlFor="Input_De_Login_User">User:</label>
              <input
                type="text"
                placeholder="User"
                id="Input_De_Login_User"
                name="Input_De_Login_User"
                value={Input_User}
                onChange={(e) => {
                  setInput_User(e.target.value);
                }}
              />
            </div>
            <div>
              <label>Senha:</label>
              <input
                type="password"
                placeholder="Senha"
                current-password="true"
                autoComplete="on"
                id="Input_De_Login_Senha"
                name="Input_De_Login_Senha"
                value={Input_Senha}
                onChange={(e) => {
                  setInput_Senha(e.target.value);
                }}
              />
            </div>
            <hr />
            <button
              className="Botao_De_Logar_User_Senha"
              onClick={Enviar_Dados_Para_Permissao}
              aria-label="Botão de Login"
            >
              Logar
            </button>
          </form>
        </div>
      )}
      {!Visibilidade && (
        <button
          className="Login_Botao"
          onClick={() => {
            localStorage.removeItem("token");
            setVisibilidade(true);
            window.location.reload();
          }}
          aria-label="Botão de Loggout"
        >
          Loggout
        </button>
      )}
    </>
  );
}
