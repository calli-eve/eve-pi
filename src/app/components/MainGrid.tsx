import { useContext, useEffect, useState } from "react";
import {
  Box,
  CssBaseline,
  Grid,
  ThemeProvider,
  createTheme,
  Button,
} from "@mui/material";
import { AccountCard } from "./Account/AccountCard";
import { AccessToken } from "@/types";
import { CharacterContext, SessionContext } from "../context/Context";
import ResponsiveAppBar from "./AppBar/AppBar";
import { Summary } from "./Summary/Summary";
import { DragDropContext, Droppable, Draggable, DropResult } from "@hello-pangea/dnd";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

interface Grouped {
  [key: string]: AccessToken[];
}

declare module "@mui/material/styles" {
  interface Theme {
    custom: {
      compactMode: boolean;
      smallText: string;
      cardImageSize: number;
      cardMinHeight: number;
      stoppedPosition: number;
    };
  }
  interface ThemeOptions {
    custom?: {
      compactMode?: boolean;
      smallText?: string;
      cardImageSize?: number;
      cardMinHeight?: number;
      stoppedPosition?: number;
    };
  }
}

export const MainGrid = () => {
  const { characters, updateCharacter } = useContext(CharacterContext);
  const [accountOrder, setAccountOrder] = useState<string[]>([]);
  const [allCollapsed, setAllCollapsed] = useState(false);

  // Initialize account order when characters change
  useEffect(() => {
    const currentAccounts = Object.keys(
      characters.reduce<Grouped>((group, character) => {
        const { account } = character;
        group[account ?? ""] = group[account ?? ""] ?? [];
        group[account ?? ""].push(character);
        return group;
      }, {})
    );

    const savedOrder = localStorage.getItem('accountOrder');
    if (savedOrder) {
      try {
        const parsedOrder = JSON.parse(savedOrder);
        const validOrder = parsedOrder.filter((account: string) => currentAccounts.includes(account));
        const newAccounts = currentAccounts.filter(account => !validOrder.includes(account));
        setAccountOrder([...validOrder, ...newAccounts]);
      } catch (e) {
        setAccountOrder(currentAccounts);
      }
    } else {
      setAccountOrder(currentAccounts);
    }
  }, [characters]);

  useEffect(() => {
    if (accountOrder.length > 0) {
      localStorage.setItem('accountOrder', JSON.stringify(accountOrder));
    }
  }, [accountOrder]);

  const groupByAccount = characters.reduce<Grouped>((group, character) => {
    const { account } = character;
    group[account ?? ""] = group[account ?? ""] ?? [];
    group[account ?? ""].push(character);
    return group;
  }, {});

  const { compactMode } = useContext(SessionContext);
  const [darkTheme, setDarkTheme] = useState(
    createTheme({
      palette: {
        mode: "dark",
      },
      custom: {
        compactMode,
        smallText: compactMode ? "0.6rem" : "0.8rem",
        cardImageSize: compactMode ? 80 : 120,
        cardMinHeight: compactMode ? 100 : 170,
        stoppedPosition: compactMode ? 32 : 48,
      },
    }),
  );

  useEffect(() => {
    setDarkTheme(
      createTheme({
        palette: {
          mode: "dark",
        },
        custom: {
          compactMode,
          smallText: compactMode ? "0.6rem" : "0.8rem",
          cardImageSize: compactMode ? 80 : 120,
          cardMinHeight: compactMode ? 100 : 170,
          stoppedPosition: compactMode ? 32 : 48,
        },
      }),
    );
  }, [compactMode]);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const items = Array.from(accountOrder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setAccountOrder(items);
  };

  const DragDropContextComponent = DragDropContext as any;
  const DroppableComponent = Droppable as any;
  const DraggableComponent = Draggable as any;

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Box sx={{ flexGrow: 1 }}>
        <ResponsiveAppBar />
        {compactMode ? <></> : <Summary characters={characters} />}
        <Box sx={{ display: 'flex', justifyContent: 'flex-start', padding: 1 }}>
          <Button
            startIcon={allCollapsed ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
            onClick={() => setAllCollapsed(!allCollapsed)}
            size="small"
          >
            {allCollapsed ? 'Expand All' : 'Collapse All'}
          </Button>
        </Box>
        <DragDropContextComponent onDragEnd={handleDragEnd}>
          <DroppableComponent droppableId="accounts">
            {(provided: any) => (
              <Grid
                container
                spacing={1}
                sx={{ padding: 1 }}
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {accountOrder.map((account, index) => (
                  <DraggableComponent
                    key={account}
                    draggableId={account}
                    index={index}
                  >
                    {(provided: any) => (
                      <Grid
                        item
                        xs={12}
                        sm={compactMode ? 6 : 12}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        sx={{
                          '& > *': {
                            width: '100%',
                          },
                        }}
                      >
                        {groupByAccount[account] && groupByAccount[account].length > 0 && (
                          <AccountCard 
                            characters={groupByAccount[account]} 
                            isCollapsed={allCollapsed}
                          />
                        )}
                      </Grid>
                    )}
                  </DraggableComponent>
                ))}
                {provided.placeholder}
              </Grid>
            )}
          </DroppableComponent>
        </DragDropContextComponent>
      </Box>
    </ThemeProvider>
  );
};
