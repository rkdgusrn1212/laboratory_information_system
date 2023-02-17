import { useLocation, useNavigate } from 'react-router-dom';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddIcon from '@mui/icons-material/Add';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import TroubleshootIcon from '@mui/icons-material/Troubleshoot';
import BiotechIcon from '@mui/icons-material/Biotech';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import MuiDrawer from '@mui/material/Drawer';
import {
  Accordion as MuiAccordion,
  AccordionDetails as MuiAccordionDetails,
  AccordionProps,
  AccordionSummary as MuiAccordionSummary,
  AccordionSummaryProps,
  CSSObject,
  styled,
  Theme,
  Toolbar,
  Typography,
} from '@mui/material';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { drawerWidth } from '../../pages/Navigation';
import { Fragment, useEffect, useState } from 'react';
import { Box } from '@mui/system';

const category = [
  { name: '진료', icon: <TroubleshootIcon /> },
  { name: '채혈', icon: <VaccinesIcon /> },
  { name: '검사', icon: <BiotechIcon /> },
];
const pages = [
  [
    {
      name: '진료실',
      icon: (
        <Box>
          <TroubleshootIcon />
          <sup>
            <AddIcon
              sx={{
                position: 'relative',
                left: '15%',
                top: '-5%',
                transform: 'translate(-50%, -50%)',
                fontSize: 15,
              }}
            />
          </sup>
        </Box>
      ),
      url: '/consultation',
    },
  ],
  [
    {
      name: '채혈 접수',
      icon: (
        <Box>
          <VaccinesIcon />
          <sup>
            <AddIcon
              sx={{
                position: 'relative',
                left: '15%',
                top: '-5%',
                transform: 'translate(-50%, -50%)',
                fontSize: 15,
              }}
            />
          </sup>
        </Box>
      ),
      url: '/collection',
    },
    {
      name: '채혈 등록',
      icon: (
        <Box>
          <VaccinesIcon />
          <sup>
            <SaveAltIcon
              sx={{
                position: 'relative',
                left: '15%',
                top: '-5%',
                transform: 'translate(-50%, -50%)',
                fontSize: 15,
              }}
            />
          </sup>
        </Box>
      ),
      url: '/collection/collect',
    },
    {
      name: '부적합검체 등록',
      icon: (
        <Box>
          <VaccinesIcon />
          <sup>
            <WarningAmberIcon
              sx={{
                position: 'relative',
                left: '15%',
                top: '-5%',
                transform: 'translate(-50%, -50%)',
                fontSize: 15,
              }}
            />
          </sup>
        </Box>
      ),
      url: '/collection/inadequate/submit',
    },
  ],
  [
    {
      name: '검사 접수',
      icon: (
        <Box>
          <BiotechIcon />
          <sup>
            <AddIcon
              sx={{
                position: 'relative',
                left: '15%',
                top: '-5%',
                transform: 'translate(-50%, -50%)',
                fontSize: 15,
              }}
            />
          </sup>
        </Box>
      ),
      url: '/test',
    },
    {
      name: '검사결과 입력',
      icon: (
        <Box>
          <BiotechIcon />
          <sup>
            <SaveAltIcon
              sx={{
                position: 'relative',
                left: '15%',
                top: '-5%',
                transform: 'translate(-50%, -50%)',
                fontSize: 15,
              }}
            />
          </sup>
        </Box>
      ),
      url: '/test/input',
    },
    {
      name: '검사결과 조회',
      icon: (
        <Box sx={{ display: 'inline-block' }}>
          <BiotechIcon />
          <QueryStatsIcon
            sx={{
              position: 'relative',
              left: '15%',
              top: '-5%',
              transform: 'translate(-50%, -50%)',
              fontSize: 15,
            }}
          />
        </Box>
      ),
      url: '/test/result',
    },
  ],
];

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({}) => ({}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper': {
    '&.Mui-expanded': {
      transform: 'rotate(90deg)',
    },
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(0),
  bconsultationTop: '1px solid rgba(0, 0, 0, .125)',
}));

const SideDrawer: React.FC<{
  open: boolean;
  onCloseIconClick: React.MouseEventHandler<HTMLButtonElement>;
}> = ({ open, onCloseIconClick }) => {
  const location = useLocation();
  const [expandList, setExpandList] = useState<number | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    switch (location.pathname) {
      case '/consultation':
        setExpandList(0);
        break;
      case '/collection':
        setExpandList(1);
        break;
      case '/test':
        setExpandList(2);
        break;
      default:
        setExpandList(undefined);
    }
  }, [location, open]);

  const handleListHeaderChange =
    (num: number) =>
    (event: React.SyntheticEvent<Element, Event>, expanded: boolean) => {
      setExpandList(expanded ? num : undefined);
    };
  const handleListItemClick = (url: string) => () => {
    navigate(url);
  };

  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        variant="dense"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <IconButton onClick={onCloseIconClick}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />

      {category.map(
        ({ name: categoryName, icon: categoryIcon }, categoryIdx) => (
          <Fragment key={categoryIdx}>
            <Accordion
              TransitionProps={{ unmountOnExit: true }}
              expanded={expandList === categoryIdx}
              onChange={handleListHeaderChange(categoryIdx)}
            >
              <AccordionSummary>
                {categoryIcon}
                {open && <Typography sx={{ ml: 2 }}>{categoryName}</Typography>}
              </AccordionSummary>
              <AccordionDetails>
                <List>
                  {pages[categoryIdx].map(
                    (
                      { name: pageName, icon: pageIcon, url: pageUrl },
                      pageIdx,
                    ) => (
                      <ListItem
                        key={pageIdx}
                        disablePadding
                        sx={{ display: 'block' }}
                      >
                        <ListItemButton
                          sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                          }}
                          onClick={handleListItemClick(pageUrl)}
                        >
                          <ListItemIcon
                            sx={{
                              minWidth: 0,
                              mr: open ? 3 : 'auto',
                              justifyContent: 'center',
                            }}
                          >
                            {pageIcon}
                          </ListItemIcon>
                          <ListItemText
                            primary={pageName}
                            sx={{ opacity: open ? 1 : 0 }}
                          />
                        </ListItemButton>
                      </ListItem>
                    ),
                  )}
                </List>
              </AccordionDetails>
            </Accordion>
            <Divider />
          </Fragment>
        ),
      )}
    </Drawer>
  );
};
export default SideDrawer;
