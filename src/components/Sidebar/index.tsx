import Image from 'next/image';
import { useRouter } from 'next/router';
import { FiHome, FiLogOut, FiPlus } from "react-icons/fi";
import { lightTheme, styled } from "../../../stitches.config";
import { useAuth } from '../../contexts/auth';
import { useTheme } from '../../contexts/theme';
import IconButton from "../IconButton";

const SidebarCenteredWrapper = styled('div', {
  display: 'grid',
  placeItems: 'center',
  width: '100%',
  gap: '28px',

  '& > button:first-child': {
    display: 'grid',
    placeItems: 'center',

    width: '100%',
    borderLeft: '2px solid',
    borderLeftColor: '$text_primary',
  }
});

const Sidebar = () => {
  const { currentTheme } = useTheme();
  const { signout } = useAuth();
  const router = useRouter();

  const Container = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',

    padding: '1rem 0',

    position: 'fixed',
    top: '0',
    bottom: '0',
    left: '0',

    width: '112px',

    background: '$bg_sidebar',
    filter: currentTheme === lightTheme ? 'drop-shadow(0px 0px 60px rgba(0, 0, 0, 0.05))' : '',
  });

  const handleSignout = async () => {
    await signout();
    router.push('/');
  }

  return (
    <Container>
        <Image
          src={`/assets/logo${currentTheme === lightTheme ? '' : '_dark'}.svg`}
          height={48}
          width={48}
        />

        <SidebarCenteredWrapper>
          <IconButton>
            <FiHome
              size={32}
              color={currentTheme.colors.text_primary}
            />
          </IconButton>

          <IconButton>
            <FiPlus
              size={32}
              color={currentTheme.colors.text_primary}
            />
          </IconButton>
        </SidebarCenteredWrapper>

        <IconButton
          onClick={handleSignout}
        >
          <FiLogOut
            size={32}
            color={currentTheme.colors.text_primary}
          />
        </IconButton>
      </Container>
  );
}

export default Sidebar;
