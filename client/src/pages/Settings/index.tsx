import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { Box } from '@mui/material';
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { ROUTES } from '@config/routes';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { chromeBackground, isChromeExt } from '@helpers/utility';
import { styled, ToggleButton, ToggleButtonGroup } from '@mui/material';
import ExitToAppRoundedIcon from '@mui/icons-material/ExitToAppRounded';
import LanguageIcon from '@mui/icons-material/Language';
import { MenuItem, Select } from '@mui/material';
import i18n from '@/i18n';
import PreferenceView from '@/pages/Settings/PreferenceView';
import SupportView from '@/pages/Settings/SupportView';
import LogoutView from '@/pages/Settings/LogoutView';
import { useTranslation } from 'react-i18next';

const TopBar = styled(Box)(({ theme }) => ({
  paddingTop: theme.spacing(1.5),
  paddingBottom: theme.spacing(1.5),
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme: _ }) => ({
  borderRadius: 30,
  '& .MuiToggleButtonGroup-grouped': {
    border: 'none',
    '&:not(:first-of-type)': {
      borderRadius: 30,
    },
    '&:first-of-type': {
      borderRadius: 30,
    },
  },
  justifyContent: 'center',
}));

const StyledToggleButton = styled(ToggleButton)(({ theme }) => ({
  borderRadius: 30,
  border: 'none',
  textTransform: 'none',
  width: '140px',
  padding: '15px',
  fontWeight: 600,
  color: theme.palette.text.disabled,
  '&:hover': {
    backgroundColor: 'inherit',
  },
  '&.Mui-selected': {
    border: 'none',
    boxShadow: 'inset 0px 2px 5px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#F2F2F2',
    fontWeight: 600,
    color: theme.palette.text.primary,
  },
}));

export default function Settings() {
  const [tabIndex, setTabIndex] = useState(0);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [language, setLanguage] = useState(i18n.language || 'en');

  const handleTabChange = (_: React.SyntheticEvent | null, newValue: number) => {
    if (newValue !== null) {
      setTabIndex(newValue);
    }
  };

  const handleBackClick = () => {
    navigate(ROUTES.home);
  };

  const handleLanguageChange = (event: any) => {
    const newLang = event.target.value;
    setLanguage(newLang);
    i18n.changeLanguage(newLang);
  };

  if (!open) {
    return <></>;
  }

  const background = isChromeExt ? chromeBackground : { background: 'linear-gradient(180deg, #FFFFFF 0%, rgba(255, 255, 255, 0.6) 100%)' };

  return (
    <Box
      sx={{
        flexGrow: 1,
        overflowY: 'auto',
        paddingBottom: '56px',
        position: 'relative',
        ...background,
      }}
    >
      {/* inner nav bar */}
      <Box display={'flex'} alignItems={'center'} mx={2}>
        <TopBar sx={{ width: '100%' }}>
          {/* back icon */}
          <Box
            sx={{
              borderRadius: 100,
              backgroundColor: 'white',
              display: 'flex',
              mr: 0,
            }}
          >
            <IconButton aria-label="settings" sx={{ backgroundColor: 'white' }} onClick={handleBackClick}>
              <ArrowBackIosRoundedIcon
                fontSize="small"
                sx={[
                  (theme) => ({
                    color: theme.palette.common.black,
                  }),
                ]}
              />
            </IconButton>
          </Box>

          {/* nav bar */}
          <Box
            sx={{
              bgcolor: 'white',
              py: 0.5,
              px: 0.5,
              borderRadius: 30,
            }}
          >
            <StyledToggleButtonGroup sx={{ mx: 0 }} value={tabIndex} exclusive onChange={handleTabChange} aria-label="event tabs" fullWidth={true}>
              <StyledToggleButton value={0} aria-label="new event" fullWidth={true}>
                {t('nav.preferences')}
              </StyledToggleButton>
              <StyledToggleButton value={1} aria-label="my events" fullWidth={true}>
                {t('nav.support')}
              </StyledToggleButton>
            </StyledToggleButtonGroup>
          </Box>
          {/* language + logout */}
          <Box
            sx={[
              (theme) => ({
                borderRadius: 100,
                backgroundColor: 'white',
                px: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                gap: 1,
                ml: 0,
              }),
            ]}
          >
            <LanguageIcon fontSize="small" />
            <Select
              size="small"
              value={language}
              onChange={handleLanguageChange}
              variant="standard"
              disableUnderline
              sx={{ minWidth: 60 }}
            >
              <MenuItem value="en">EN</MenuItem>
              <MenuItem value="hi">HI</MenuItem>
            </Select>
            <IconButton aria-label="settings" sx={{ mr: 0, backgroundColor: 'white' }} onClick={() => handleTabChange(null, 2)}>
              <ExitToAppRoundedIcon
                fontSize="small"
                sx={[
                  (theme) => ({
                    color: theme.palette.common.black,
                  }),
                ]}
              />
            </IconButton>
          </Box>
        </TopBar>
      </Box>
      {tabIndex === 0 && <PreferenceView />}
      {tabIndex === 1 && <SupportView />}
      {tabIndex === 2 && <LogoutView handleCancel={() => setTabIndex(0)} />}
    </Box>
  );
}
