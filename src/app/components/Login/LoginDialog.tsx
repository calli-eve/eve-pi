import DialogTitle from "@mui/material/DialogTitle";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import { Box, DialogActions } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { eveSwagger, loginParameters } from "@/esi-sso";
import { SessionContext } from "@/app/context/Context";

export const LoginDialog = ({
  open,
  closeDialog,
}: {
  open: boolean;
  closeDialog: () => void;
}) => {
  const DEFAULT_SCOPES_TO_SELECT = ["esi-planets.manage_planets.v1"];
  const [scopes] = useState<string[]>(["esi-planets.manage_planets.v1"]);
  const [selectedScopes, setSelectedScopes] = useState<string[]>(
    DEFAULT_SCOPES_TO_SELECT
  );
  const [ssoUrl, setSsoUrl] = useState<string | undefined>(undefined);
  const [loginUrl, setLoginUrl] = useState<string | undefined>(undefined);

  const { EVE_SSO_CLIENT_ID, EVE_SSO_CALLBACK_URL } =
    useContext(SessionContext);

  useEffect(() => {
    eveSwagger().then((json) => {
      setSsoUrl(json.securityDefinitions.evesso.authorizationUrl);
    });
  }, []);

  useEffect(() => {
    if (!ssoUrl || selectedScopes.length === 0) return;
    loginParameters(
      selectedScopes,
      EVE_SSO_CLIENT_ID,
      EVE_SSO_CALLBACK_URL
    ).then((res) => setLoginUrl(ssoUrl + "?" + res));
  }, [selectedScopes, ssoUrl, EVE_SSO_CLIENT_ID, EVE_SSO_CALLBACK_URL]);

  return (
    <Dialog open={open} onClose={closeDialog}>
      <DialogTitle>Select scopes to login with</DialogTitle>
      {scopes.map((scope) => (
        <Box key={scope} padding={1}>
          <input
            type="checkbox"
            checked={selectedScopes.some((v) => v === scope)}
            onChange={() => {
              selectedScopes.some((v) => v === scope)
                ? setSelectedScopes(selectedScopes.filter((s) => s !== scope))
                : setSelectedScopes([...selectedScopes, scope]);
            }}
          />
          {scope}
        </Box>
      ))}
      <DialogActions>
        <Button
          variant="contained"
          onClick={() => {
            window.open(loginUrl, "_self");
          }}
        >
          Login
        </Button>
        <Button onClick={closeDialog}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};
