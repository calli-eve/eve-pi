import { AccessToken } from "./types";

export const refreshToken = async (
  character: AccessToken
): Promise<AccessToken> => {
  return fetch(`api/refresh`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "error",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(character),
  }).then((res) => res.json());
};

export const revokeToken = async (
  character: AccessToken
): Promise<Response> => {
  return fetch(`api/revoke`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "error",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(character),
  });
};

export const loginParameters = async (
  selectedScopes: string[],
  EVE_SSO_CLIENT_ID: string,
  EVE_SSO_CALLBACK_URL: string
) => {
  return new URLSearchParams({
    response_type: "code",
    redirect_uri: EVE_SSO_CALLBACK_URL,
    client_id: EVE_SSO_CLIENT_ID,
    scope: selectedScopes.join(" "),
    state: "asfe",
  }).toString();
};

export const eveSwagger = async () => {
  return fetch("https://esi.evetech.net/latest/swagger.json").then((res) =>
    res.json()
  );
};
