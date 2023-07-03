import { Box, Button, Tooltip } from "@mui/material";
export const CCPButton = () => {
  return (
    <Box>
      <Tooltip
        title={`
          EVE Online and the EVE logo are the registered trademarks of CCP hf. All rights are reserved worldwide. All other trademarks are the property of their respective owners. EVE Online, the EVE logo, EVE and all associated logos and designs are the intellectual property of CCP hf. All artwork, screenshots, characters, vehicles, storylines, world facts or other recognizable features of the intellectual property relating to these trademarks are likewise the intellectual property of CCP hf. CCP hf. has granted permission to EVE PI to use EVE Online and all associated logos and designs for promotional and information purposes on its website but does not endorse, and is not in any way affiliated with, EVE PI. CCP is in no way responsible for the content on or functioning of this website, nor can it be liable for any damage arising from the use of this website.
        `}
      >
        <Button
          href="https://community.eveonline.com/support/policies/eve-online-content-creation-terms-of-use-en/"
          target="_blank"
          style={{ width: "100%" }}
          sx={{ color: "white", display: "block" }}
        >
          CCP ©
        </Button>
      </Tooltip>
    </Box>
  );
};
