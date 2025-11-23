"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import environment from "@/src/config/enviroment";
import { CardResponse } from "@/src/modules/card/type/nuvei.type";
import camelcaseKeys from "camelcase-keys";
import Script from "next/script";
import { v4 as uuidv4 } from "uuid";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare const PaymentGateway: any;

export default function ViewCard() {
  const submitButton = useRef<HTMLButtonElement>(null);
  const retryButton = useRef<HTMLButtonElement>(null);
  const addAnotherButton = useRef<HTMLButtonElement>(null);
  const [showRetry, setShowRetry] = useState(false);
  const [showAddAnother, setShowAddAnother] = useState(false);
  const [nuveiResponse, setNuveiResponse] = useState<CardResponse | null>(null);
  const [user, setUser] = useState<{ id: string; email: string }>({
    id: uuidv4(),
    email: "user@example.com",
  });

  const handleScriptReady = () => {
    const { NUVEI_ENV, NUVEI_APPLICATION_CODE, NUVEI_APPLICATION_KEY } =
      environment;
    // Limpiar el contenedor antes de generar el formulario para evitar residuos
    const container = document.getElementById("tokenize_form");
    if (container) {
      container.innerHTML = "";
    }
    const environmentMode = NUVEI_ENV;
    const applicationCode = NUVEI_APPLICATION_CODE;
    const applicationKey = NUVEI_APPLICATION_KEY;

    const getTokenizeData = () => ({
      locale: "es",
      user: {
        id: user.id,
        email: user.email,
      },
      configuration: { default_country: "ECU" },
    });

    const notCompletedFormCallback = (message: string) => {
      if (submitButton.current) {
        submitButton.current.innerText = `${message}`;
        submitButton.current.disabled = false;
      }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const responseCallback = async (response: any) => {
      const cardResponse: CardResponse = camelcaseKeys(response, {
        deep: true,
      });

      setNuveiResponse(cardResponse);

      // Éxito: mostrar mensaje y botón para agregar otra tarjeta
      setShowRetry(false);
      setShowAddAnother(true);
      if (submitButton.current) {
        submitButton.current.innerText = "Completado";
        submitButton.current.disabled = true;
        submitButton.current.style.display = "none";
      }
      if (addAnotherButton.current) {
        addAnotherButton.current.style.display = "block";
      }
    };

    const pgSdk = new PaymentGateway(
      environmentMode,
      applicationCode,
      applicationKey
    );

    pgSdk.generate_tokenize(
      getTokenizeData(),
      "#tokenize_form",
      responseCallback,
      notCompletedFormCallback
    );

    // Usar asignación onclick para evitar múltiples listeners al reiniciar el SDK
    if (submitButton.current) {
      submitButton.current.onclick = (event) => {
        if (submitButton.current) {
          submitButton.current.innerText = "Processing...";
          submitButton.current.disabled = true;
        }
        pgSdk.tokenize();
        event.preventDefault();
      };
    }

    if (retryButton.current) {
      retryButton.current.onclick = () => {
        setShowRetry(false);
        setNuveiResponse(null);
        setUser({ id: uuidv4(), email: user.email });
        if (retryButton.current && submitButton.current) {
          submitButton.current.innerText = "Registrar tarjeta";
          submitButton.current.removeAttribute("disabled");
          retryButton.current.style.display = "none";
          submitButton.current.style.display = "block";
          pgSdk.generate_tokenize(
            getTokenizeData(),
            "#tokenize_form",
            responseCallback,
            notCompletedFormCallback
          );
        }
      };
    }

    if (addAnotherButton.current) {
      addAnotherButton.current.onclick = () => {
        // Reiniciar UI y volver a generar el formulario
        setShowAddAnother(false);
        setNuveiResponse(null);
        setUser({ id: uuidv4(), email: user.email });
        if (submitButton.current) {
          submitButton.current.innerText = "Registrar tarjeta";
          submitButton.current.removeAttribute("disabled");
          submitButton.current.style.display = "block";
        }
        // Llamar a la misma función que inicializa el SDK y genera el formulario
        handleScriptReady();
      };
    }
  };

  return (
    <>
      <Script
        src="https://cdn.paymentez.com/ccapi/sdk/payment_sdk_stable.min.js"
        onReady={handleScriptReady}
      />
      <div className="flex items-center justify-center p-2 pt-10">
        <Card className="w-full max-w-lg rounded-md bg-gray-400 p-4 text-center">
          <CardHeader>
            <CardTitle className="text-2xl">NUVEI - PAYMENTS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center gap-4">
              <div className="flex h-auto w-full items-center justify-center">
                <div id="tokenize_form" className="h-full w-full" />
              </div>
              <div className="flex w-full flex-col items-center gap-2 p-2">
                <Button
                  className="w-full"
                  ref={submitButton}
                  style={{
                    display: showRetry || showAddAnother ? "none" : "block",
                  }}
                >
                  Registrar tarjeta
                </Button>
                {showRetry && (
                  <Button
                    className="w-full"
                    ref={retryButton}
                    variant="secondary"
                    // handler asignado desde handleScriptReady para evitar listeners duplicados
                  >
                    Reintentar
                  </Button>
                )}
                {showAddAnother && (
                  <Button
                    className="w-full"
                    ref={addAnotherButton}
                    style={{ display: "block" }}
                    onClick={() => {
                      // Reiniciar UI y volver a generar el formulario
                      setShowAddAnother(false);
                      setNuveiResponse(null);
                      setUser({ id: uuidv4(), email: user.email });
                      if (submitButton.current) {
                        submitButton.current.innerText = "Registrar tarjeta";
                        submitButton.current.removeAttribute("disabled");
                        submitButton.current.style.display = "block";
                      }
                      // Llamar a la misma función que inicializa el SDK y genera el formulario
                      handleScriptReady();
                    }}
                  >
                    Volver agregar otra tarjeta
                  </Button>
                )}
              </div>
              {nuveiResponse && (
                <pre className="text-left text-sm bg-white p-2 rounded-md overflow-x-auto max-h-96">
                  {JSON.stringify(
                    {
                      userParams: {
                        locale: "es",
                        user: {
                          id: user.id,
                          email: user.email,
                        },
                        configuration: { default_country: "ECU" },
                      },
                      nuveiResponse,
                    },
                    null,
                    2
                  )}
                </pre>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
