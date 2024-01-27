import { useEffect } from "react";
import { useLocation } from "react-router-dom";
// @mui
import { Box, Drawer } from "@mui/material";
// hooks
import useResponsive from "../../hooks/useResponsive";
// components
import Logo from "../../assets/logo.png";
import Scrollbar from "../../components/scrollbar";
import NavSection from "../../components/nav-section";
//
import { navConfig, teamNavConfig } from "./config";

// ----------------------------------------------------------------------

const NAV_WIDTH = 280;
// ----------------------------------------------------------------------

export function Nav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive("up", "lg");

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          px: 2,
        }}
      >
        <Box
          component="img"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            mb: 3,
            alignItems: "center",
          }}
          alt="boschlogo"
          src={Logo}
        />
        <NavSection data={navConfig} sx={{
          width: "100%",
        }}/>
      </Box>
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

// -------------------------------------------------------------

export function TeamNav({ openNav, onCloseNav }) {
  const { pathname } = useLocation();

  const isDesktop = useResponsive("up", "lg");

  useEffect(() => {
    if (openNav) {
      onCloseNav();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 3,
          px: 2,
        }}
      >
        <Box
          component="img"
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            mb: 3,
            alignItems: "center",
          }}
          alt="boschlogo"
          src={Logo}
        />
        <NavSection
          data={teamNavConfig}
          sx={{
            width: "100%",
          }}
        />
      </Box>
    </Scrollbar>
  );

  return (
    <Box
      component="nav"
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV_WIDTH },
      }}
    >
      {isDesktop ? (
        <Drawer
          open
          variant="permanent"
          PaperProps={{
            sx: {
              width: NAV_WIDTH,
              bgcolor: "background.default",
              borderRightStyle: "dashed",
            },
          }}
        >
          {renderContent}
        </Drawer>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: NAV_WIDTH },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}
